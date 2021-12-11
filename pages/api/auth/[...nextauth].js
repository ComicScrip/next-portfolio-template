import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findByEmail, verifyPassword } from '@models/user';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('lol', credentials);
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
    // ...add more providers here
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
