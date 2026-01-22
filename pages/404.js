/* eslint-disable react/no-unused-prop-types */
import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Custom404Page = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('error-404-title')}`}</title>
      </Head>
      <Container className="error-page-container">
        <h3>{t('error-404-title')}</h3>
        <div className="homepage-btn">
          <Link href="/">
            {t('back-to-homepage')}
          </Link>
        </div>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Custom404Page;
