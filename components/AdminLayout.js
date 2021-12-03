import Head from 'next/head';
import Link from 'next/link';

export default function AdminLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <header
        style={{
          display: 'flex',
          padding: 15,
          justifyContent: 'space-between',
          backgroundColor: 'rgb(39, 39, 39)',
        }}
      >
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
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </main>
      <footer style={{ backgroundColor: 'rgb(39, 39, 39)' }}>
        <nav>
          <Link href='/'>Go back to website</Link>
        </nav>
      </footer>
    </>
  );
}
