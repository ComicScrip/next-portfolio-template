import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import CurrentUserMenu from './CurrentUserMenu';

export default function AdminLayout({ children, pageTitle }) {
  const { data, status } = useSession();

  if (status === 'unauthenticated')
    return (
      <div className='flex flex-col justify-center items-center bg-slate-900 text-white h-full text-xl text-center'>
        <p>You have to log in with an admin user to access the back office </p>

        <button className='mt-6' onClick={() => signIn()}>
          Log in
        </button>
      </div>
    );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <header className='bg-slate-700 flex text-white justify-between p-6'>
        <nav>
          <Link href='/'>
            <a className='font-semibold text-xl mr-6 '>DaveLopper.pro</a>
          </Link>
          <Link href='/admin'>
            <a className='mr-6 hover:bg-slate-500 p-3 rounded-2xl'>Dashboard</a>
          </Link>
          <Link href='/admin/projects'>
            <a className='hover:bg-slate-500 p-3 rounded-2xl'>Projects</a>
          </Link>
        </nav>
        {data && <CurrentUserMenu currentUser={data.user} />}
      </header>
      <main className='p-6 pb-12'>
        {
          {
            loading: 'loading...',
            authenticated: children,
          }[status]
        }
      </main>
    </>
  );
}
