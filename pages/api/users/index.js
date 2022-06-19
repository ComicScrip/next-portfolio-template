import base from "../../../middlewares/common";
import requireAdmin from "../../../middlewares/requireAdmin";
import mailer from "../../../mailer";
import {
  count,
  createUser,
  emailAlreadyExists,
  findMany,
  validateUser,
} from "../../../models/user";
import crypto from "crypto";

async function handleGet(req, res) {
  let {
    perPage = "10",
    pageNumber = "1",
    nameOrEmailContains = "",
    active = "",
    sortBy = "",
  } = req.query;
  const [propToSortBy, sortByDirection] = sortBy.split(".");
  perPage = parseInt(perPage, 10);
  pageNumber = parseInt(pageNumber, 10);
  const skip = (pageNumber - 1) * perPage;
  const where = {
    OR: [
      { name: { contains: nameOrEmailContains } },
      { email: { contains: nameOrEmailContains } },
    ],
    active: active === "true" ? true : active === "false" ? false : undefined,
  };

  const [users, total] = await Promise.all([
    findMany({
      take: perPage,
      skip,
      where,
      orderBy: propToSortBy
        ? [
            { [propToSortBy]: sortByDirection === "asc" ? "asc" : "desc" },
            { createdAt: "desc" },
          ]
        : [{ createdAt: "desc" }],
    }),
    count({ where }),
  ]);
  res.setHeader("x-total-count", total);
  res.send(users);
}

async function handlePost(req, res) {
  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  const alreadyExists = await emailAlreadyExists(req.body.email);
  if (alreadyExists) return res.status(409).send("email already taken");
  const emailVerificationCode = crypto.randomBytes(50).toString("hex");
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

export default base().get(requireAdmin, handleGet).post(handlePost);
