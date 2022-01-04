const db = require('../db');
const Joi = require('joi');

module.exports.validateProject = (data, forUpdate = false) =>
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

const projectPropsToShow = {
  title: true,
  id: true,
  description: true,
  mainPictureUrl: true,
};

module.exports.getProjects = async () => {
  return db.project.findMany({
    select: projectPropsToShow,
  });
};

module.exports.getOneProject = (id) => {
  return db.project.findUnique({
    where: { id: parseInt(id, 10) },
    select: projectPropsToShow,
  });
};

module.exports.deleteOneProject = (id) => {
  return db.project
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

module.exports.createProject = ({ title, description, mainPictureUrl }) => {
  return db.project.create({ data: { title, description, mainPictureUrl } });
};

module.exports.updateProject = (id, data) => {
  return db.project
    .update({ where: { id: parseInt(id, 10) }, data })
    .catch((_) => false);
};

module.exports.deleteMany = db.project.deleteMany;
