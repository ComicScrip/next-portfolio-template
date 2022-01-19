import Layout from '../components/Layout';
import { confirmEmail } from '../models/user';
import Link from 'next/link';

export default function ConfirmEmailPage({ verified }) {
  return (
    <Layout pageTitle={'Confirmation e-mail'}>
      <div className='text-center flex flex-col justify-center items-center'>
        {verified ? (
          <div>Merci d{"'"}avoir confirmé votre e-mail.</div>
        ) : (
          <div>Code de vérification invalide ou déjà utilisé...</div>
        )}

        <div>
          <Link href='/login'>
            <a className='mt-6 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-slate-800 hover:bg-white'>
              Se connecter
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const verified = await confirmEmail(query?.emailVerificationCode);
  return {
    props: {
      verified,
    },
  };
}
