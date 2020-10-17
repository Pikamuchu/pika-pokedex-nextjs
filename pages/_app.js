/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import App from 'next/app';
import { useEffect } from 'react';
import { enableSpanner, disableSpanner } from '../src/libs/spanner';
import * as gtag from '../src/libs/gtag';
import Layout from '../src/components/layout/Layout';
import { appWithTranslation, Router } from '../src/i18n';
import '../src/styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  const router = Router;
  useEffect(() => {
    const handleRouteChangeStart = () => {
      enableSpanner();
    };
    const handleRouteChangeComplete = (url) => {
      gtag.pageview(url);
      disableSpanner();
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const defaultProps = appContext?.Component?.defaultProps;
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [...(appProps.pageProps.namespacesRequired || []), ...(defaultProps?.i18nNamespaces || [])],
    },
  };
};

export default appWithTranslation(MyApp);
