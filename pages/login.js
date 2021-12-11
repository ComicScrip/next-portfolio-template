import Layout from '@components/Layout';
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import styles from '@styles/Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function LoginPage({ csrfToken }) {
  const { data: session } = useSession();
  const { query } = useRouter();
  console.log(query);

  return (
    <Layout pageTitle='login'>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <h1>Se connecter</h1>

          <button onClick={() => signIn('github')}>Avec Github</button>

          <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <label>
              Username
              <input name='username' type='text' />
            </label>
            <label>
              Password
              <input name='password' type='password' />
            </label>
            <button type='submit'>Sign in</button>
            {query.error === 'CredentialsSignin' && <p>wrong credentials</p>}
          </form>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
