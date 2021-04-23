/* eslint-disable no-unused-vars */
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
    <Container className="collidable">
      <Row className="justify-content-between">
        <Col xs={6}>
          <Row className="m-0">
            <ul className="list-unstyled list-horizontal m-0">
              <li>
                <a href="https://twitter.com/AntonioMarinJim">Twitter</a>
              </li>
              <li>
                <a href="https://github.com/pikamachu/pika-pokedex-nextjs/">GitHub</a>
              </li>
            </ul>
          </Row>
          <Row className="m-0">
            <p>
              <a href="https://pikamachu.github.io/">Developed with ♥</a>
            </p>
          </Row>
        </Col>
        <Col xs={6} className="text-right">
          <div className="pb-2">
            <a href="#top">{t('back-to-top')}</a>
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
    </Container>
  );
};

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('common')(Footer);
