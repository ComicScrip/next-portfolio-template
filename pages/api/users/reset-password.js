import base from '../../../middlewares/common';
import {
  findByEmail,
  hashPassword,
  updateUser,
  verifyPassword,
} from '../../../models/user';

async function handlePost(req, res) {
  const { newPassword, newPasswordConfirmation, resetPasswordToken, email } =
    req.body;
  if (newPassword !== newPasswordConfirmation)
    return res.status(400).send('passwords dont match');
  const user = await findByEmail(email);
  if (!user) return res.status(404).send();
  if (!(await verifyPassword(resetPasswordToken, user.resetPasswordToken)))
    return res.status(400).send('invalid token');

  await updateUser(user.id, {
    hashedPassword: await hashPassword(newPassword),
  });
  res.send('password has been reset');
}

export default base().post(handlePost);
