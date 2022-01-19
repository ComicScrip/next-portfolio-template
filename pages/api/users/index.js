import base from '../../../middlewares/common';
import mailer from '../../../mailer';
import {
  createUser,
  emailAlreadyExists,
  validateUser,
} from '../../../models/user';
import crypto from 'crypto';

async function handlePost(req, res) {
  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  const alreadyExists = await emailAlreadyExists(req.body.email);
  if (alreadyExists) return res.status(409).send('email already taken');
  const emailVerificationCode = crypto.randomBytes(50).toString('hex');
  const { id, email, name } = await createUser({
    ...req.body,
    emailVerificationCode,
  });
  const mailBody = `Rendez-vous sur ce lien pour vérifier votre email : ${process.env.HOST}/confirm-email?emailVerificationCode=${emailVerificationCode}`;
  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: `Vérifier votre email`,
    text: mailBody,
    html: mailBody,
  });
  res.status(201).send({ id, email, name });
}

export default base().post(handlePost);
