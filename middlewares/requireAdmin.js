import { findByEmail } from '@models/user';
import { getSession } from 'next-auth/react';

export async function requireAdmin(req, res, next) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send();
  const userInDb = await findByEmail(session?.user?.email);
  if (userInDb.role !== 'admin') return res.status(403).send();
  next();
}
