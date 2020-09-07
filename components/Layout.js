import Head from 'next/head';
import { Nav, Navbar } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../i18n';

const Layout = ({ children, t }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, viewport-fit=cover"
      />
    </Head>

    <Navbar bg="light" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>{t('menu-title')}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>{t('menu-option-home')}</Nav.Link>
          </Link>
          <Link href="/pokemon" passHref>
            <Nav.Link>{t('menu-option-pokemon')}</Nav.Link>
          </Link>
          <Link href="/about" passHref>
            <Nav.Link>{t('menu-option-about')}</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <main>{children}</main>

    <footer>
      {t('Footer')}
      <button type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}>
        {t('change-locale')}
      </button>
    </footer>
  </>
);

export default withTranslation('common')(Layout);
