import base from "../../middlewares/common";
import mailer from "../../mailer";
import { verify } from "hcaptcha";

async function handlePost({ body: { email, message, hcaptchaToken } }, res) {
  const { success: validCaptcha } = await verify(
    process.env.HCAPTCHA_SECRET,
    hcaptchaToken
  );
  if (validCaptcha) {
    const mailBody = `${email} a laissé un message sur le portfolio : ${message}`;
    await mailer.sendMail({
      from: process.env.MAILER_FROM,
      to: process.env.CONTACT_FORM_RECIPIENT,
      subject: `Message de la part de ${email} sur ton portefolio`,
      text: mailBody,
      html: mailBody,
      replyTo: email,
    });
    res.status(201).send("OK");
  } else {
    res.status(422).send("invalid hCaptcha token");
  }
}

export default base().post(handlePost);
