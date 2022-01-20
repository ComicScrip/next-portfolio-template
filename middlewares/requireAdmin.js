import { isAdmin } from '../models/user';
import { getSession } from 'next-auth/react';

const requireAdmin = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).send('Unauthorized');
  if (await isAdmin(session.user.email)) {
    next();
  } else res.status(403).send('Forbidden');
};

export default requireAdmin;
