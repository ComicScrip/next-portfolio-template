import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import db from '@db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findByEmail, findById, verifyPassword } from '@models/user';

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
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token }) {
      console.log(token);
      if (token && !token.role) {
        const user = await findByEmail(token.email);
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log({ session, user, token });
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
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
