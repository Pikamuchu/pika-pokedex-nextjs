/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../../i18n';
import useCapture from '../../hooks/useCapture';
import Search from './Search';

const Header = ({ t }) => (
  <Navbar collapseOnSelect bg="light" expand="lg" fixed="top" className="menu-pokeball-shape">
    <Container>
      <Link href="/" passHref>
        <Navbar.Brand>{t('menu-title')}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="collapsible-nav-dropdown" />
      <Navbar.Collapse id="collapsible-nav-dropdown">
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>{t('menu-option-home')}</Nav.Link>
          </Link>
          <Link href="/pokemon" passHref>
            <Nav.Link>{t('menu-option-pokemon')}</Nav.Link>
          </Link>
          <Link href="/capture" passHref>
            <Nav.Link>{t('menu-option-capture')}</Nav.Link>
          </Link>
          <Link href="/about" passHref>
            <Nav.Link>{t('menu-option-about')}</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
      <div className="menu-searchbox">
        <Search />
      </div>
      <div className="menu-pokebox">
        <PokeballButton />
      </div>
    </Container>
  </Navbar>
);

const PokeballButton = () => {
  const [active, setActive] = useState(false);
  const { data: captures } = useCapture();

  useEffect(() => {
    setActive(captures && captures.length > 0);
  }, [captures]);

  return (
    <div className={`pokeball-button ${active ? 'active' : ''}`}>
      <Link href="/capture">
        <a></a>
      </Link>
    </div>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Header);
