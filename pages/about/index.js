// import React, { useState, useCallback, useEffect } from 'react'
// import useSWR from 'swr'
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../i18n';
import Layout from '../../components/Layout';

const About = ({ t }) => {
  return (
    <Layout>
      <Head>
        <title>{t('title-about')}</title>
      </Head>
      <Container>
        {t('title-about')}
      </Container>
    </Layout>
  );
};

About.defaultProps = {
  i18nNamespaces: ['common', 'about']
}

export async function getServerSideProps() {
  return {
    props: {
    },
  };
}

export default withTranslation(['common', 'about'])(About);
