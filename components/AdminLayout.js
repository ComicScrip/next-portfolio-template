import Head from 'next/head';

export default function AdminLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <header>Espace admin</header>
      <main>{children}</main>
    </>
  );
}
