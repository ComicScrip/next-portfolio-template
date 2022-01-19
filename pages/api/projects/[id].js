import {
  deleteOneProject,
  getOneProject,
  updateProject,
  validateProject,
} from '../../../models/project';
import base from '../../../middlewares/common';
import requireAdmin from '../../../middlewares/requireAdmin';

async function handlePatch({ query: { id }, body }, res) {
  const validationErrors = validateProject(body, true);
  if (validationErrors) return res.status(422).send(validationErrors);
  const updated = await updateProject(id, body);
  if (updated) res.status(200).send(updated);
  else res.status(404).send();
}

async function handleGet({ query: { id } }, res) {
  const project = await getOneProject(id);
  if (project) res.send(project);
  else res.status(404).send();
}

async function handleDelete({ query: { id } }, res) {
  if (await deleteOneProject(id)) res.status(204).send();
  else res.status(404).send();
}

export default base()
  .use(requireAdmin)
  .get(handleGet)
  .patch(handlePatch)
  .delete(handleDelete);
