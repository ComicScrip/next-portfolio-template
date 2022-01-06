import Layout from '../components/Layout';
import CurrentUserContext from '../contexts/currentUserContext';
import { signIn, signOut, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useContext } from 'react';

export default function LoginPage({ csrfToken }) {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const { query } = useRouter();

  return (
    <Layout pageTitle='login'>
      <div className='m-6'>
        {currentUserProfile ? (
          <div className='flex flex-col items-center'>
            connecté en tant que {currentUserProfile.email} <br />
            <button className='mt-6' onClick={() => signOut()}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <h1 className='pageTitle text-center'>Se connecter</h1>

            <div className='max-w-xl m-auto flex flex-col items-center'>
              <button className='' onClick={() => signIn('github')}>
                Avec Github
              </button>

              <p className='text-2xl mt-8 mb-8 text-center'>OU</p>

              <form
                method='post'
                className='bg-slate-700 p-12 rounded-2xl shadow-black/30 shadow-lg min-w-[320px]'
                action='/api/auth/callback/credentials'
              >
                <input
                  name='csrfToken'
                  type='hidden'
                  defaultValue={csrfToken}
                />
                <label>
                  Nom d{"'"}utilisateur
                  <input
                    name='username'
                    type='text'
                    className='block w-full'
                    placeholder='me@something.com'
                  />
                </label>
                <label>
                  Mot de passe
                  <input
                    className='block w-full'
                    name='password'
                    type='password'
                  />
                </label>
                <button className='bg-amber-500 mt-6 w-full' type='submit'>
                  Tenter ces identifients
                </button>
                {query.error === 'CredentialsSignin' && (
                  <p className='p-6 bg-slate-700 text-red-400 font-bold text-center'>
                    Ces identifiants ne corresspondent à aucun utilisateur
                    actif. Si vous n{"'"}avez pas encore vérifié votre e-mail,
                    rendez-vous dans votre boite de reception pour cliquez sur
                    le lien d{"'"}activation et rééssayez la connexion avec ces
                    identifiants.
                  </p>
                )}
                <Link href='/signup'>
                  <a className='mt-6 text-sky-300 hover:text-sky-400 text-center w-full block'>
                    Pas encore de compte ?
                  </a>
                </Link>
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
