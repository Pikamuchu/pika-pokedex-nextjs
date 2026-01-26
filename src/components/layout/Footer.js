/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, Col, Row, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import preferences from '../../preferences';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [availableLanguages, setAvailableLanguages] = useState(preferences?.availableLanguages);

  const handleSelect = (eventKey) => {
    if (eventKey !== router.locale) {
      router.push(router.pathname, router.asPath, { locale: eventKey });
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
                <a href="https://github.com/pikamuchu/pika-pokedex-nextjs/">GitHub</a>
              </li>
            </ul>
          </Row>
          <Row className="m-0">
            <p>
              <a href="https://pikamuchu.github.io/">Developed with ♥</a>
            </p>
          </Row>
        </Col>
        <Col xs={6} className="text-end">
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
                  active={language === router.locale}
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

export default Footer;
