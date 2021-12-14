import Layout from '@components/Layout';
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';

export default function LoginPage({ csrfToken }) {
  const { data: session } = useSession();
  const { query } = useRouter();

  return (
    <Layout pageTitle='login'>
      <div className='m-6'>
        {session ? (
          <div className='flex flex-col items-center'>
            connecté en tant que {session.user.email} <br />
            <button className='mt-6' onClick={() => signOut()}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <h1 className='pageTitle text-center'>Se connecter</h1>

            <div className='max-w-3xl m-auto flex flex-col items-center'>
              <button className='' onClick={() => signIn('github')}>
                Avec Github
              </button>

              <p className='text-2xl mt-8 mb-8 text-center'>OU</p>

              <form
                method='post'
                className='bg-slate-700 p-12 rounded-2xl shadow-black/30 shadow-lg'
                action='/api/auth/callback/credentials'
              >
                <input
                  name='csrfToken'
                  type='hidden'
                  defaultValue={csrfToken}
                />
                <label>
                  Username
                  <input name='username' type='text' className='block' />
                </label>
                <label>
                  Password
                  <input className='block' name='password' type='password' />
                </label>
                <button className='bg-amber-500 mt-6' type='submit'>
                  Tenter ces identifients
                </button>
                {query.error === 'CredentialsSignin' && (
                  <p className='p-6 bg-slate-700 text-red-400 font-bold'>
                    wrong credentials
                  </p>
                )}
              </form>
            </div>
          </>
        )}
      </div>
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
