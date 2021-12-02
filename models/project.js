const db = require('../db');

export const getProjects = async () => {
  return db
    .promise()
    .query('SELECT * FROM projects')
    .then(([res]) => res);
};

export const getOneProject = (id) => {
  return db
    .promise()
    .query('SELECT * FROM projects WHERE id = ?', [id])
    .then(([[res]]) => res);
};
