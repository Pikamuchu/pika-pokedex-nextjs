import Document, { Head, Main, NextScript } from 'next/document';

const APP_NAME = 'Pokedex PWA';
const APP_DESCRIPTION = 'Pokedex Progressive Web Application using Next.js';
const APP_COLOR = '#c40012';
const APP_ICON = '/favicon.ico';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          {/* Must */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/x-icon" href={APP_ICON} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="keywords" content="pokedex, web app, example, react, pwa" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href={APP_ICON} />

          {/* Android */}
          <meta name="theme-color" content={APP_COLOR} />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="apple-touch-icon" href={APP_ICON} />

          {/* Windows */}
          <meta name="msapplication-navbutton-color" content={APP_COLOR} />
          <meta name="msapplication-TileColor" content={APP_COLOR} />
          <meta name="msapplication-TileImage" content={APP_ICON} />

          <style>
            {`
              html, body, #__next {
                height: 100%;
              }
              #__next {
                margin: 0 auto;
              }
              h1 {
                text-align: center;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
