import Head from 'next/head';
import Link from 'next/link';
import styles from '@styles/AdminLayout.module.css';

export default function AdminLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>
        <nav>
          <Link href='/admin'>
            <a>Back-Office</a>
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
