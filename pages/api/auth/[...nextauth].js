import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findByEmail, verifyPassword } from '@models/user';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await findByEmail(credentials.email);
        if (
          user &&
          user.hashedPassword &&
          (await verifyPassword(credentials.password, user.hashedPassword))
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
