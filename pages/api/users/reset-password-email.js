import base from '../../../middlewares/common';
import mailer from '../../../mailer';
import { findByEmail, hashPassword, updateUser } from '../../../models/user';
import crypto from 'crypto';

async function handlePost(req, res) {}

export default base().post(handlePost);
