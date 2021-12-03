import { handleMethods } from '../../../helpers/handleMethods';
import { createProject, getProjects } from '../../../models/project';

export default handleMethods({
  GET: async (req, res) => {
    res.send(await getProjects());
  },
  POST: async (req, res) => {
    res.status(201).send(await createProject(req.body));
  },
});
