import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../src/i18n';

const About = ({ t }) => {
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('about-title')}`}</title>
      </Head>
      <Container>
        <h3>{t('about-title')}</h3>
      </Container>
    </>
  );
};

About.propTypes = {
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

About.defaultProps = {
  i18nNamespaces: ['common', 'about'],
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      initialData: {
        query,
      },
    },
  };
};

export default withTranslation(['common', 'about'])(About);
