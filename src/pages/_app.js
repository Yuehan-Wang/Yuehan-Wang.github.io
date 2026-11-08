import '../styles/globals.css';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Yuehan Wang</title>
        <meta name="description" content="Yuehan Wang's personal site: projects, writing and notes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
