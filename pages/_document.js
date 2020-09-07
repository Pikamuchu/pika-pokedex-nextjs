import Document, { Html, Head, Main, NextScript } from 'next/document';

const APP_NAME = 'Pokedex PWA';
const APP_DESCRIPTION = 'Pokedex Progressive Web Application using Next.js';
const APP_COLOR = '#ffc40d';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* Must */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="keywords" content="pokedex, web app, example, react, pwa" />
          <link rel="icon" type="image/png" href="/static/icons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/static/icons/favicon-32x32.png" sizes="32x32" />
          <link rel="manifest" href="/manifest.json" />

          {/* Android */}
          <meta name="theme-color" content={APP_COLOR} />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="apple-touch-icon" href="/static/icons/apple-touch-icon-180x180.png" sizes="180x180" />

          {/* Windows */}
          <meta name="msapplication-navbutton-color" content={APP_COLOR} />
          <meta name="msapplication-TileColor" content={APP_COLOR} />
          <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />

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
      </Html>
    );
  }
}

export default MyDocument;
