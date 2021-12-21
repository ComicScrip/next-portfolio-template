import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import OfflineBanner from './OfflineBanner';

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <OfflineBanner />
      <main className='bg-slate-800 text-white pb-14'>{children}</main>
      <Footer />
    </>
  );
}
