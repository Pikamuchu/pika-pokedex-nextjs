/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Error = ({ statusCode }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('error-500-title')}`}</title>
      </Head>
      <Container className="error-page-container">
        <h3>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</h3>
        <div className="homepage-btn">
          <Link href="/">
            {t('back-to-homepage')}
          </Link>
        </div>
      </Container>
    </>
  );
};

Error.propTypes = {
  statusCode: PropTypes.string,
};

export const getServerSideProps = async ({ res, err, locale }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    props: {
      statusCode,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Error;
