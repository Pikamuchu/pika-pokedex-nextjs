import Head from 'next/head';
import { Container, Col, ul, Nav, Navbar, Row } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../i18n';

const Layout = ({ children, t }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, viewport-fit=cover"
      />
    </Head>

    <header>
      <Container>
        <Navbar bg="light" expand="lg" fixed="top">
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
      </Container>
    </header>

    <main>{children}</main>

    <footer>
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} sm={4} className="text-sm-right order-sm-12">
            <ul className="list-unstyled">
              <li>
                <a href="#top">Back to top</a>
              </li>
              <li>
                <button type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}>
                  {t('change-locale')}
                </button>
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
              <ul className="list-unstyled list-horizontal">
                <li>
                  <a href="https://twitter.com/AntonioMarinJim">Twitter</a>
                </li>
                <li>
                  <a href="https://github.com/pikamachu/pika-pokedex-nextjs/">GitHub</a>
                </li>
                <li>
                  <a href="https://github.com/pikamachu/pika-pokedex-nextjs/">LinkedIn</a>
                </li>
              </ul>
            </Row>
            <Row>
              <p>
                Made by <a href="https://pikamachu.github.com">Antonio Marin</a>.
              </p>
              <p>
                Code released under the
                <a href="https://github.com/pikamachu/pika-pokedex-nextjs/blob/master/LICENSE">MIT License</a>.
              </p>
              <p>
                Build with
                <a href="https://nextjs.org/" rel="nofollow">
                  Next.js
                </a>
                <a href="https://getbootstrap.com" rel="nofollow">
                  Bootstrap
                </a>
              </p>
              <p>
                Theme from
                <a href="https://bootswatch.com/" rel="nofollow">
                  Bootstrap
                </a>
                .
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
);

export default withTranslation('common')(Layout);
