/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../src/i18n';

const CapturePokemonList = dynamic(() => import('../../src/components/capture/CapturePokemonList'), { ssr: false });

const CaptureListPage = ({ t }) => {
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

CaptureListPage.propTypes = {
  t: PropTypes.func.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string)
};

CaptureListPage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon', 'capture']
};

export default withTranslation('capture')(CaptureListPage);
