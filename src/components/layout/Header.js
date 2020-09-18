import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../../i18n';
import PokeballButton from '../pokeball/PokeballButton';
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

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Header);
