import Layout from '@components/Layout';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <Layout pageTitle='login'>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </Layout>
  );
}
