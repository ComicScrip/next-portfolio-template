const db = require('@db');
const Joi = require('joi');
const argon2 = require('argon2');

export const emailAlreadyExists = (email) =>
  db.user.findFirst({ where: { email } }).then((user) => !!user);

export const findByEmail = (email) => db.user.findFirst({ where: { email } });
export const findById = (id) => db.user.findFirst({ where: { id } });

export const validateUser = (data, forUpdate = false) =>
  Joi.object({
    email: Joi.string()
      .email()
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    password: Joi.string()
      .min(8)
      .max(100)
      .presence(forUpdate ? 'optional' : 'required'),
    name: Joi.string()
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    image: Joi.string().max(255).allow(null, ''),
  }).validate(data, { abortEarly: false }).error;

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

export const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

export const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

export const createUser = async ({ email, password, name, image }) => {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: { email, hashedPassword, name, image },
  });
};
