import base from '../../../middlewares/common';
import mailer from '../../../mailer';
import { findByEmail, hashPassword, updateUser } from '../../../models/user';
import crypto from 'crypto';

async function handlePost(req, res) {
  const { email } = req.body;
  const resetPasswordToken = crypto.randomBytes(50).toString('hex');
  console.log(email, resetPasswordToken);

  const user = await findByEmail(email);
  if (!user) return res.status(404).send();

  await updateUser(user.id, {
    resetPasswordToken: await hashPassword(resetPasswordToken),
  });

  const mailBody = `Rendez-vous sur ce lien pour réinitialiser votre mot de passe : ${process.env.HOST}/reset-password?email=${email}&resetPasswordToken=${resetPasswordToken}`;

  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: 'Réinitialisez votre mot de passe',
    text: mailBody,
    html: mailBody,
  });

  res.send('reset password email sent');
}

export default base().post(handlePost);
