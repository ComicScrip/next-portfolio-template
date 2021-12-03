import {
  deleteOneProject,
  getOneProject,
  updateProject,
} from '../../../models/project';
import { handleMethods } from '../../../helpers/handleMethods';

export default handleMethods({
  GET: async ({ query: { id } }, res) => {
    const project = await getOneProject(id);
    if (project) res.send(project);
    else res.status(404).send();
  },
  DELETE: async ({ query: { id } }, res) => {
    if (await deleteOneProject(id)) res.status(204).send();
    else res.status(404).send();
  },
  PATCH: async ({ query: { id }, body }, res) => {
    res.status(200).send(await updateProject(id, body));
  },
});
