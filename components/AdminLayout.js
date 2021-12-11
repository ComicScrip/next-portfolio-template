import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/AdminLayout.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminLayout({ children, pageTitle }) {
  const { data, status } = useSession();

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && data?.user?.role !== 'admin')
    ) {
      signIn();
    }
  }, [status, data]);

  if (status === 'unauthenticated')
    return 'Please log in to access the back office';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>
        <nav>
          <Link href='/admin'>
            <a>Dashboard</a>
          </Link>
        </nav>

        <nav>
          <Link href='/admin/projects'>
            <a>Projects</a>
          </Link>
        </nav>
        {data?.user?.image && (
          <img
            className={styles.avatar}
            src={data.user.image}
            alt='user avatar'
          />
        )}
        {status === 'authenticated' && (
          <nav>
            <button onClick={() => signOut()}>Sign out</button>
          </nav>
        )}
      </header>
      <main className={styles.main}>
        {
          {
            loading: 'loading...',
            authenticated: children,
          }[status]
        }
      </main>
      <footer className={styles.footer}>
        <nav>
          <Link href='/'>Go back to website</Link>
        </nav>
      </footer>
    </>
  );
}
