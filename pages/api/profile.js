import base from '@middlewares/common';
import requireCurrentUser from '@middlewares/requireCurrentUser';
import { getSafeAttributes, updateUser, validateUser } from '@models/user';
import handleImageUpload from '@middlewares/handleImageUpload';
import sharp from 'sharp';
import _ from 'lodash';
import path from 'path';

async function handleGet(req, res) {
  res.send(getSafeAttributes(req.currentUser));
}

async function handlePatch(req, res) {
  const data = _.omit(req.body, 'image');
  const validationErrors = validateUser(data, true);
  if (validationErrors) res.status(422).send(validationErrors);

  if (req.file && req.file.path) {
    const ext = path.extname(req.file.path);
    const outputFilePath = `${req.file.path.replace(ext, '')}_thumb.webp`;

    await sharp(req.file.path)
      .resize(250, 250, 'contain')
      .webp({ quality: 85 })
      .toFile(outputFilePath);

    data.image = outputFilePath.replace('public/', '/');
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
