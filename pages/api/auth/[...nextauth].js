import { findByEmail, verifyPassword } from '@models/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const userInDb = await findByEmail(credentials.email);
        if (
          userInDb &&
          (await verifyPassword(credentials.password, userInDb.hashedPassword))
        )
          return userInDb;

        return null;
      },
    }),
  ],
});
