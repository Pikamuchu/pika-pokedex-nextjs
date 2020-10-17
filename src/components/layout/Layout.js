import PropTypes from 'prop-types';
import Head from 'next/head';
import { withTranslation } from '../../i18n';
import Header from './Header';
import Footer from './Footer';
import Spanner from './Spanner';

const Layout = ({ children, t }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, viewport-fit=cover"
      />
    </Head>

    <header>
      <Header />
    </header>

    <main>{children}</main>

    <footer>
      <Footer />
    </footer>

    <Spanner />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Layout);
