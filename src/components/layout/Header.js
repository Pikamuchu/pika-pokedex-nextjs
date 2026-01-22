/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import useCapture from '../../hooks/useCapture';
import Search from './Search';

const Header = () => {
  const { t } = useTranslation('common');
  return (
  <Navbar collapseOnSelect bg="light" expand="lg" fixed="top" className="menu-pokeball-shape collidable">
    <Container>
      <Navbar.Toggle aria-controls="collapsible-nav-dropdown" className="border-0" />
      <Link href="/">
        <Navbar.Brand className="font-weight-bold">{t('menu-title')}</Navbar.Brand>
      </Link>
      <Navbar.Collapse id="collapsible-nav-dropdown">
        <Nav className="me-auto">
          <Link href="/">
            <Nav.Link>{t('menu-option-home')}</Nav.Link>
          </Link>
          <Link href="/pokemon">
            <Nav.Link>{t('menu-option-pokemon')}</Nav.Link>
          </Link>
          <Link href="/capture">
            <Nav.Link>{t('menu-option-capture')}</Nav.Link>
          </Link>
          <Link href="/about">
            <Nav.Link>{t('menu-option-about')}</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
      <div className="menu-searchbox collidable">
        <Search />
      </div>
      <div className="menu-pokebox collidable">
        <PokeballButton />
      </div>
    </Container>
  </Navbar>
  );
};

const PokeballButton = () => {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: captures } = useCapture();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setActive(captures && captures.length > 0);
    }
  }, [captures, mounted]);

  return (
    <Link href="/capture">
      <div className={`pokeball-button ${mounted && active ? 'active' : ''}`} />
    </Link>
  );
};

export default Header;
