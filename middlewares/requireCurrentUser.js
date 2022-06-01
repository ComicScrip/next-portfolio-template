import { getSession } from 'next-auth/react';
import { findByEmail } from '../models/user';

export default async function requireCurrentUser(req, res, next) {
  const session = await getSession({ req });
  req.currentUser = await findByEmail(session?.user?.email);
  if (!req.currentUser) return res.status(401).send('Unauthorized');
  return next();
}
