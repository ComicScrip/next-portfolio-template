import base from '@middlewares/common';
import requireAdmin from '@middlewares/requireAdmin';
import { createUser, emailAlreadyExists, validateUser } from '@models/user';

async function handlePost(req, res) {
  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  const alreadyExists = await emailAlreadyExists(req.body.email);
  if (alreadyExists) return res.status(409).send('email already taken');
  const { id, email, name } = await createUser(req.body);
  res.status(201).send({ id, email, name });
}

export default base().use(requireAdmin).post(handlePost);
