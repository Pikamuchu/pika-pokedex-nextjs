/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import Layout from '../components/layout/Layout';
import { appWithTranslation } from '../i18n';
import '../styles/main.scss';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

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