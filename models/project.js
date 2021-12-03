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

export const deleteOneProject = (id) => {
  return db
    .promise()
    .query('DELETE FROM projects WHERE id = ?', [id])
    .then(([res]) => {
      console.log(res);
      return !!res.affectedRows;
    });
};

export const createProject = ({ title, description, mainPictureUrl }) => {
  return db
    .promise()
    .query(
      'INSERT INTO projects (title, description, mainPictureUrl) VALUES (?, ?, ?)',
      [title, description, mainPictureUrl]
    )
    .then(([res]) => ({
      id: res.insertId,
      title,
      description,
      mainPictureUrl,
    }));
};

export const updateProject = (id, newAttributes) => {
  return db
    .promise()
    .query('UPDATE projects SET ? WHERE id = ?', [newAttributes, id])
    .then(() => getOneProject(id));
};
