const db = require("../db");
const Joi = require("joi");

module.exports.validateProject = (data, forUpdate = false) => {
  const titleValidator = Joi.string()
    .max(255)
    .presence(forUpdate ? "optional" : "required");

  const descriptionValidator = Joi.string()
    .max(65000)
    .presence(forUpdate ? "optional" : "required");

  return Joi.object({
    titleFR: titleValidator,
    titleEN: titleValidator,
    descriptionFR: descriptionValidator,
    descriptionEN: descriptionValidator,
    mainPictureUrl: Joi.string()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
  })
    .or("titleFR", "titleEN")
    .or("descriptionFR", "descriptionEN")
    .validate(data, { abortEarly: false }).error;
};

const projectPropsToShow = {
  titleFR: true,
  titleEN: true,
  id: true,
  descriptionFR: true,
  descriptionEN: true,
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
    .catch(() => false);
};

module.exports.createProject = ({
  descriptionFR,
  descriptionEN,
  titleFR,
  titleEN,
  mainPictureUrl,
}) => {
  return db.project.create({
    data: { descriptionFR, descriptionEN, titleFR, titleEN, mainPictureUrl },
  });
};

module.exports.getTranslation = (
  { id, titleFR, titleEN, descriptionFR, descriptionEN, mainPictureUrl },
  lang
) => {
  const isFR = lang.toUpperCase() === "FR";
  return {
    id,
    mainPictureUrl,
    title: isFR ? titleFR : titleEN,
    description: isFR ? descriptionFR : descriptionEN,
  };
};

module.exports.updateProject = (id, data) => {
  return db.project
    .update({ where: { id: parseInt(id, 10) }, data })
    .catch(() => false);
};

module.exports.deleteMany = db.project.deleteMany;
