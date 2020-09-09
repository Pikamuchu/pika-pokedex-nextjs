// import React, { useState, useCallback, useEffect } from 'react'
// import useSWR from 'swr'
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../i18n';

const About = ({ t }) => {
  return (
    <>
      <Head>
        <title>{t('title-about')}</title>
      </Head>
      <Container>{t('title-about')}</Container>
    </>
  );
};

About.defaultProps = {
  i18nNamespaces: ['common', 'about'],
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default withTranslation(['common', 'about'])(About);
