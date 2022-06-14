import base from '../../../middlewares/common';
import mailer from '../../../mailer';
import { findByEmail, hashPassword, updateUser } from '../../../models/user';
import crypto from 'crypto';

async function handlePost(req, res) {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (!user) return res.status(404).send();

  const resetPasswordToken = crypto.randomBytes(50).toString('hex');
  await updateUser(user.id, {
    resetPasswordToken: await hashPassword(resetPasswordToken),
  });

  const mailBody = `Rendez-vous sur ce lien pour changer votre mot de passe : ${process.env.HOST}/reset-password?resetPasswordToken=${resetPasswordToken}&email=${email}`;
  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: `Réinitialisez votre mot de passe`,
    text: mailBody,
    html: mailBody,
  });
  res.send('Reset password email sent');
}

export default base().post(handlePost);
