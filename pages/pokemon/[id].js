/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../src/i18n';
import { getPokemonDetails } from '../../src/models/pokemonModel';
import PokemonDetails from '../../src/components/pokemon/PokemonDetails';
import usePokemon from '../../src/hooks/usePokemon';

const PokemonDetailsPage = ({ initialData, t }) => {
  const { data: pokemon } = usePokemon({ id: initialData?.query?.id }, initialData?.pokemon);
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('pokemon-details-title')} - ${pokemon?.id}`}</title>
      </Head>
      <Container className="pokemon-details-page-container">
        <PokemonDetails pokemon={pokemon} />
      </Container>
    </>
  );
};

PokemonDetailsPage.propTypes = {
  initialData: PropTypes.shape({
    pokemon: PropTypes.object,
    query: PropTypes.object
  }).isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired
};

PokemonDetailsPage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon']
};

export const getServerSideProps = async ({ query }) => {
  const pokemon = await getPokemonDetails(query);
  return {
    props: {
      initialData: {
        query,
        pokemon
      }
    }
  };
};

export default withTranslation('pokemon')(PokemonDetailsPage);
