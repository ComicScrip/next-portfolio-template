import base from '../../middlewares/common';
import requireCurrentUser from '../../middlewares/requireCurrentUser';
import { getSafeAttributes, updateUser, validateUser } from '../../models/user';
import handleImageUpload from '../../middlewares/handleImageUpload';
import sharp from 'sharp';
import _ from 'lodash';
import FormData from 'form-data';
import axios from 'axios';

async function handleGet(req, res) {
  res.send(getSafeAttributes(req.currentUser));
}

async function handlePatch(req, res) {
  const data = _.omit(req.body, 'image');
  const validationErrors = validateUser(data, true);
  if (validationErrors) res.status(422).send(validationErrors);

  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250, 'contain')
      .webp({ quality: 85 })
      .toBuffer();
    const form = new FormData();
    form.append('files', buffer, { filename: req.file.originalname });
    const res = await axios.post(process.env.UPLOAD_API_URL, form, {
      headers: form.getHeaders(),
    });
    data.image = res.data[0].url;
  }

  res.send(getSafeAttributes(await updateUser(req.currentUser.id, data)));
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .patch(handleImageUpload.single('image'), handlePatch);
