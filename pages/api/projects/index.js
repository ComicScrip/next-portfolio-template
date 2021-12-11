import base from '@middlewares/common';
import requireAdmin from '@middlewares/requireAdmin';
import { createProject, getProjects, validateProject } from '@models/project';

const handleGet = async (req, res) => {
  res.send(await getProjects());
};

const handlePost = async (req, res) => {
  const validationErrors = validateProject(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  res.status(201).send(await createProject(req.body));
};

export default base().use(requireAdmin).post(handlePost).get(handleGet);
