/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../src/i18n';
import HomeHello from '../src/components/home/HomeHello';
import HomeCarousel from '../src/components/home/HomeCarousel';

const HomePage = ({ initialData, t }) => {
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
  t: PropTypes.func.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string)
};

HomePage.defaultProps = {
  i18nNamespaces: ['common', 'home', 'pokemon']
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      initialData: {
        query
      }
    }
  };
};

export default withTranslation('home')(HomePage);
