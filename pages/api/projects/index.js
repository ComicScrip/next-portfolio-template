import base from '@middlewares/common';
import { createProject, getProjects, validateProject } from '@models/project';

async function handlePost(req, res) {
  const validationErrors = validateProject(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  res.status(201).send(await createProject(req.body));
}

async function handleGet(req, res) {
  res.send(await getProjects());
}

export default base().post(handlePost).get(handleGet);
