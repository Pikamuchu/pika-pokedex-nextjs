/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { Link, withTranslation } from '../src/i18n';

const Custom404Page = ({ t }) => (
  <>
    <Head>
      <title>{`Pikadex - ${t('error-404-title')}`}</title>
    </Head>
    <Container className="error-page-container">
      <h3>{t('error-404-title')}</h3>
      <div className="homepage-btn">
        <Link as="/" href="/">
          <a>{t('back-to-homepage')}</a>
        </Link>
      </div>
    </Container>
  </>
);

Custom404Page.propTypes = {
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

Custom404Page.defaultProps = {
  i18nNamespaces: ['common'],
};

export default withTranslation('common')(Custom404Page);
