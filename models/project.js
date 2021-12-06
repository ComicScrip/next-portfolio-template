const db = require('../db');

export const getProjects = async () => {
  return db.project.findMany();
};

export const getOneProject = (id) => {
  return db.project.findUnique({ where: { id: parseInt(id, 10) } });
};

export const deleteOneProject = (id) => {
  return db.project
    .delete({ where: { id: parseInt(id, 10) } })
    .catch((_) => false);
};

export const createProject = ({ title, description, mainPictureUrl }) => {
  return db.project.create({ data: { title, description, mainPictureUrl } });
};

export const updateProject = (id, data) => {
  return db.project.update({ where: { id: parseInt(id, 10) }, data });
};
