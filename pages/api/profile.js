import base from "../../middlewares/common";
import requireCurrentUser from "../../middlewares/requireCurrentUser";
import { getSafeAttributes } from "../../models/user";

async function handleGet(req, res) {
  res.send(getSafeAttributes(req.currentUser));
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default base().use(requireCurrentUser).get(handleGet);
