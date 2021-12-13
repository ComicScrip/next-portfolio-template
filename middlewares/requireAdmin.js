import { isAdmin } from '@models/user';
import { getSession } from 'next-auth/react';

const requireAdmin = async (req, res, next) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session) return res.status(401).send('Unauthorized');
  console.log('id', session.user?.email);
  console.log('isadmin', await isAdmin(session.user.email));
  if (await isAdmin(session.user.email)) {
    next();
  } else res.status(403).send('Forbidden');
};

export default requireAdmin;
