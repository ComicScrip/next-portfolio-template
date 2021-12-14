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
  callbacks: {
    async session({ session, user, token }) {
      console.log('in session', { session, user, token });

      if (token) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token && !token.role) {
        const user = await findByEmail(token.email);
        token.role = user.role;
      }

      console.log('in jwt', { token, user, account, profile, isNewUser });

      return token;
    },
  },
});
