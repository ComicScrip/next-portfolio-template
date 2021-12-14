import base from '@middlewares/common';
import requireCurrentUser from '@middlewares/requireCurrentUser';
import { getSafeAttributes, updateUser, validateUser } from '@models/user';

async function handleGet(req, res) {
  res.send(getSafeAttributes(req.currentUser));
}

async function handlePatch(req, res) {
  const validationErrors = validateUser(req.body, true);
  if (validationErrors) res.status(422).send(validationErrors);
  const { image, name } = req.body;
  res.send(await updateUser({ image, name }));
}

export default base().use(requireCurrentUser).get(handleGet).patch(handlePatch);
