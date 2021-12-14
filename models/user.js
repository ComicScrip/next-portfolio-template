const db = require('@db');
const Joi = require('joi');
const argon2 = require('argon2');

export const isAdmin = async (email) => {
  try {
    const currentUser = await db.user.findUnique({
      where: { email },
    });
    return currentUser && currentUser.active && currentUser.role === 'admin';
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const emailAlreadyExists = (email) =>
  db.user.findFirst({ where: { email } }).then((user) => !!user);

export const findByEmail = (email = '') =>
  db.user.findUnique({ where: { email } });
export const findById = (id) =>
  db.user.findFirst({ where: { id: parseInt(id, 10) } });

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

export const createUser = async ({ email, password, name, role, image }) => {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: { email, hashedPassword, name, role, image },
  });
};

export const getSafeAttributes = (user) => ({
  ...user,
  hashedPassword: undefined,
});

export const updateUser = async (id, data) =>
  db.user.update({
    where: { id: parseInt(id, 10) },
    data,
  });
