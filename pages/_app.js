/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import App from 'next/app';
import { useEffect } from 'react';
import * as gtag from '../src/libs/gtag';
import Layout from '../src/components/layout/Layout';
import { appWithTranslation, Router } from '../src/i18n';
import '../src/styles/main.scss';

const MyApp = ({ Component, pageProps }) => {
  const routerEvents = Router.events;
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    routerEvents.on('routeChangeComplete', handleRouteChange);
    return () => {
      routerEvents.off('routeChangeComplete', handleRouteChange);
    };
  }, [routerEvents]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const defaultProps = appContext?.Component?.defaultProps;
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [...(appProps.pageProps.namespacesRequired || []), ...(defaultProps?.i18nNamespaces || [])]
    }
  };
};

export default appWithTranslation(MyApp);
