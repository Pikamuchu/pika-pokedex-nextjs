import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { i18n, Link, withTranslation } from '../../i18n';
import preferences from '../../preferences';

const Footer = ({ t }) => {
  const [availableLanguages, setAvailableLanguages] = useState(preferences?.availableLanguages);

  const handleSelect = (eventKey) => {
    if (eventKey !== i18n.language) {
      i18n.changeLanguage(eventKey);
    }
  };

  return (
    <Container>
      <Row className="justify-content-between">
        <Col xs={6}>
          <Row className="m-0">
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
        </Col>
        <Col xs={6} className="text-right">
          <div className="pb-2">
            <a href="#top">Back to top</a>
          </div>
          <div className="clearfix">
            <DropdownButton
              as={ButtonGroup}
              id="change-locale-drop-up"
              drop="up"
              title={t('change-locale')}
              className="pull-right"
            >
              {availableLanguages?.map((language) => (
                <Dropdown.Item
                  key={language}
                  eventKey={language}
                  onSelect={handleSelect}
                  active={language === i18n.language}
                >
                  {t(language)}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Col>
      </Row>
      <Row className="m-0">
        <p>
          Made with love by
          <a className="pl-1" href="https://pikamachu.github.com">
            Antonio Marin
          </a>
          . Code released under the
          <a className="pl-1" href="https://github.com/pikamachu/pika-pokedex-nextjs/blob/master/LICENSE">
            MIT License
          </a>
          .
        </p>
        <p>
          Build with
          <a className="pl-1" href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>
          ,
          <a className="pl-1" href="https://getbootstrap.com" rel="nofollow">
            Bootstrap
          </a>
          ,
          <a className="pl-1" href="https://animejs.com" rel="nofollow">
            Anime.js
          </a>
          . Theme from
          <a className="pl-1" href="https://bootswatch.com/" rel="nofollow">
            Bootswatch
          </a>
          .
        </p>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Footer);
