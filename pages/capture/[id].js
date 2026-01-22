/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPokemonDetails } from '../../src/models/pokemonModel';
import usePokemon from '../../src/hooks/usePokemon';

const CapturePokemon = dynamic(() => import('../../src/components/capture/CapturePokemon'), { ssr: false });

const CapturePage = ({ initialData }) => {
  const { t } = useTranslation('capture');
  const { data: pokemon } = usePokemon({ id: initialData?.query?.id }, initialData?.pokemon);

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('capture-pokemon-title')} - ${pokemon?.id}`}</title>
      </Head>
      <Container className="capture-pokemon-page-container">
        <CapturePokemon pokemon={pokemon} />
      </Container>
    </>
  );
};

CapturePage.propTypes = {
  initialData: PropTypes.shape({
    pokemon: PropTypes.object,
    query: PropTypes.object
  }).isRequired,
};

export const getServerSideProps = async ({ query, locale }) => {
  const pokemon = await getPokemonDetails(query);
  return {
    props: {
      initialData: {
        query,
        pokemon
      },
      ...(await serverSideTranslations(locale, ['common', 'pokemon', 'capture'])),
    }
  };
};

export default CapturePage;
