import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import crypto from 'crypto';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createUser, findByEmail, verifyPassword } from '../../../models/user';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await findByEmail(credentials.username);
        if (
          user &&
          user.emailVerificationCode === null && // can only login via credentials if email confirmed after signup
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
    async jwt({ token, profile, account }) {
      if (account && account.provider === 'github' && profile) {
        const matchingUser = await findByEmail(profile.email);
        if (!matchingUser)
          await createUser({
            email: profile.email,
            password: crypto.randomBytes(20).toString('hex'),
            name: profile.login,
            image: profile.avatar_url,
          });
      }

      if (token && !token.role) {
        const user = await findByEmail(token.email);
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, user, token }) {
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
