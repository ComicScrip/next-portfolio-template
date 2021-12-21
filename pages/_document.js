import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='fr'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='icon' href='/images/icon-192.png' />
          <link rel='apple-touch-icon' href='/images/icon-192.png' />
          <meta name='theme-color' content='#FFFFFF' />
          <meta name='description' content='Put your description here.' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
