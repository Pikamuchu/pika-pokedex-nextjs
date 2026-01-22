import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Spanner from './Spanner';

const Layout = ({ children }) => (
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
};

export default Layout;
