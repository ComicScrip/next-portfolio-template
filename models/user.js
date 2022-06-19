const db = require("../db");
const Joi = require("joi");
const argon2 = require("argon2");

module.exports.isAdmin = async (email) => {
  try {
    const currentUser = await db.user.findUnique({
      where: { email },
    });
    return currentUser && currentUser.active && currentUser.role === "admin";
  } catch (err) {
    console.error(err);
  }
  return false;
};

module.exports.emailAlreadyExists = (email) =>
  db.user.findFirst({ where: { email } }).then((user) => !!user);

module.exports.findByEmail = (email = "") =>
  db.user.findUnique({ where: { email } }).catch(() => false);

module.exports.findById = (id) =>
  db.user.findFirst({ where: { id: parseInt(id, 10) } });

module.exports.validateUser = (data, forUpdate = false) =>
  Joi.object({
    email: Joi.string()
      .email()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
    password: Joi.string()
      .min(8)
      .max(100)
      .presence(forUpdate ? "optional" : "required"),
    name: Joi.string()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
    image: Joi.string().max(255).allow(null, ""),
  }).validate(data, { abortEarly: false }).error;

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

module.exports.hashPassword = hashPassword;

const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

module.exports.verifyPassword = verifyPassword;

module.exports.createUser = async ({
  email,
  password,
  name,
  role,
  image,
  emailVerificationCode,
  resetPasswordToken,
  active = true,
}) => {
  console.log({ active });
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role,
      image,
      emailVerificationCode,
      resetPasswordToken,
      active,
    },
  });
};

module.exports.getSafeAttributes = (user) => ({
  ...user,
  hashedPassword: undefined,
});

module.exports.confirmEmail = async (emailVerificationCode) => {
  try {
    if (await db.user.findUnique({ where: { emailVerificationCode } })) {
      await db.user.update({
        where: { emailVerificationCode },
        data: { emailVerificationCode: null },
      });
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

module.exports.updateUser = async (id, data) =>
  db.user.update({
    where: { id: parseInt(id, 10) },
    data,
  });

module.exports.deleteMany = db.user.deleteMany;
module.exports.deleteByEmail = async (email) =>
  db.user.delete({ where: { email } }).catch(() => false);

module.exports.findMany = db.user.findMany;
module.exports.count = db.user.count;
