/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CapturePokemonList = dynamic(() => import('../../src/components/capture/CapturePokemonList'), { ssr: false });

const CaptureListPage = () => {
  const { t } = useTranslation('capture');

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('capture-list-title')}`}</title>
      </Head>
      <Container className="pokemon-list-page-container">
        <h3>{t('capture-list-title')}</h3>
        <CapturePokemonList />
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'pokemon', 'capture'])),
    }
  };
};

export default CaptureListPage;
