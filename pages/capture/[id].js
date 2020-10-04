/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container, Jumbotron } from 'react-bootstrap';

import { withTranslation } from '../../src/i18n';
import { getPokemonDetails } from '../../src/models/pokemonModel';
import usePokemon from '../../src/hooks/usePokemon';

const CapturePokemon = dynamic(() => import('../../src/components/capture/CapturePokemon'), { ssr: false });

const CapturePage = ({ initialData, t }) => {
  const { data: pokemon } = usePokemon({ id: initialData?.query?.id }, initialData?.pokemon);
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('capture-pokemon-title')} - ${pokemon?.id}`}</title>
      </Head>
      <Container className="capture-pokemon-page-container">
        <h1>{`${t('capture-pokemon')} ${pokemon.name}`}</h1>
        <CapturePokemon pokemon={pokemon} />
      </Container>
    </>
  );
};

CapturePage.propTypes = {
  initialData: PropTypes.shape({
    pokemon: PropTypes.object,
    query: PropTypes.object,
  }).isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

CapturePage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon'],
};

export const getServerSideProps = async ({ query }) => {
  const pokemon = await getPokemonDetails(query);
  return {
    props: {
      initialData: {
        query,
        pokemon,
      },
    },
  };
};

export default withTranslation(['common', 'pokemon'])(CapturePage);
