/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { Link, withTranslation } from '../src/i18n';

const Error = ({ statusCode, t }) => (
  <>
    <Head>
      <title>{`Pikadex - ${t('error-500-title')}`}</title>
    </Head>
    <Container className="error-page-container">
      <h3>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</h3>
      <div className="homepage-btn">
        <Link as="/" href="/">
          <a>{t('back-to-homepage')}</a>
        </Link>
      </div>
    </Container>
  </>
);

Error.propTypes = {
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  statusCode: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

Error.defaultProps = {
  i18nNamespaces: ['common'],
};

export const getServerSideProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    props: {
      statusCode,
    },
  };
};

export default withTranslation('common')(Error);
