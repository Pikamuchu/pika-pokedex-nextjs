import PropTypes from "prop-types";
import Head from 'next/head';
import { Container, Col, Row } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../../i18n';
import Header from './Header';
import Footer from './Footer';

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

    <main className="main-pokeball-shape pt-5 mt-5">{children}</main>

    <footer className="footer-pokeball-shape">
      <Footer />
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired
}

export default withTranslation('common')(Layout);
