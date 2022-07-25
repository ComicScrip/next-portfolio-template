import base from "../../../middlewares/common";
import requireAdmin from "../../../middlewares/requireAdmin";
import {
  createProject,
  getProjects,
  validateProject,
} from "../../../models/project";

const handleGet = async (req, res) => {
  const lang = req.headers["accept-language"]?.substring(0, 2);
  const projects = await getProjects();
  res.send(
    projects.map(
      ({
        id,
        descriptionFR,
        descriptionEN,
        titleFR,
        titleEN,
        mainPictireUrl,
      }) => ({
        id,
        mainPictireUrl,
        title: lang === "fr" ? titleFR : titleEN,
        description: lang === "fr" ? descriptionFR : descriptionEN,
      })
    )
  );
};

const handlePost = async (req, res) => {
  const validationErrors = validateProject(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  res.status(201).send(await createProject(req.body));
};

export default base().post(requireAdmin, handlePost).get(handleGet);
