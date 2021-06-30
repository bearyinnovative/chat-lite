import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="http://cdn.jsdelivr.net/npm/eruda"></script>
          <script>eruda.init();</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
