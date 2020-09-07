/* eslint-disable react/jsx-props-no-spreading */
// import App from 'next/app';
import { appWithTranslation } from '../i18n';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

// MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
