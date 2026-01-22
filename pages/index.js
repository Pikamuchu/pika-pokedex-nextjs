/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeHello from '../src/components/home/HomeHello';
import HomeCarousel from '../src/components/home/HomeCarousel';

const HomePage = ({ initialData }) => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('home-title')}`}</title>
      </Head>
      <Container className="home-page-container">
        <HomeHello />
        <HomeCarousel />
      </Container>
    </>
  );
};

HomePage.propTypes = {
  initialData: PropTypes.shape({
    query: PropTypes.object
  }).isRequired,
};

export const getServerSideProps = async ({ query, locale }) => {
  return {
    props: {
      initialData: {
        query
      },
      ...(await serverSideTranslations(locale, ['common', 'home', 'pokemon'])),
    }
  };
};

export default HomePage;
