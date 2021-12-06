import base from '@middlewares/common';
import mailer from '@mailer';

async function handlePost({ body: { email, message } }, res) {
  const mailBody = `${email} a laissé un message sur le portfolio : ${message}`;
  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: process.env.CONTACT_FORM_RECIPIENT,
    subject: `Message de la part de ${email} sur ton portefolio`,
    text: mailBody,
    html: mailBody,
    replyTo: email,
  });
  res.status(201).send(req.body);
}

export default base().post(handlePost);
