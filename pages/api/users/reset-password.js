import base from '../../../middlewares/common';
import {
  findByEmail,
  hashPassword,
  updateUser,
  verifyPassword,
} from '../../../models/user';

async function handlePost(req, res) {}

export default base().post(handlePost);
