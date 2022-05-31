import { getSession } from 'next-auth/react';
import { findByEmail, getSafeAttributes } from '../../models/user';

async function handleGet(req, res) {
  const session = await getSession({ req });
  const currentUser = await findByEmail(session?.user?.email);
  if (!currentUser) return res.status(401).send('Unauthorized');
  res.send(getSafeAttributes(currentUser));
}

export default function handler(req, res) {
  if (req.method === 'GET') return handleGet(req, res);
  else return res.status(405).send('Method not allowed');
}
