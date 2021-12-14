import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/AdminLayout.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminLayout({ children, pageTitle }) {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status, data);
    if (status !== 'loading' && data?.user?.role !== 'admin') {
      router.push('/login');
    }
  }, [status, data, router]);

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
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <nav>
          <Link href='/'>Go back to website</Link>
        </nav>
      </footer>
    </>
  );
}
