const db = require('../db');
const Joi = require('joi');
const { ObjectId } = require('mongodb');

export const validateProject = (data, forUpdate = false) =>
  Joi.object({
    title: Joi.string()
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    description: Joi.string()
      .max(65000)
      .presence(forUpdate ? 'optional' : 'required'),
    mainPictureUrl: Joi.string()
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
  }).validate(data, { abortEarly: false }).error;

const collection = db.collection('projects');

export const getProjects = async () => {
  return collection.find().toArray();
};

export const getOneProject = (id) => {
  return collection.find(ObjectId(id)).next();
};

export const deleteOneProject = (id) => {
  return collection
    .deleteOne({ _id: ObjectId(id) })
    .then(({ deletedCount }) => !!deletedCount);
};

export const createProject = ({ title, description, mainPictureUrl }) => {
  return collection
    .insertOne({ title, description, mainPictureUrl })
    .then(({ insertedId }) => ({
      _id: insertedId,
      title,
      description,
      mainPictureUrl,
    }));
};

export const updateProject = (id, data) => {
  return collection
    .updateOne({ _id: ObjectId(id) }, { $set: data })
    .then(({ matchedCount }) => !!matchedCount);
};
