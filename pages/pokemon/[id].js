/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPokemonDetails } from '../../src/models/pokemonModel';
import PokemonDetails from '../../src/components/pokemon/PokemonDetails';
import usePokemon from '../../src/hooks/usePokemon';

const PokemonDetailsPage = ({ initialData }) => {
  const { t } = useTranslation('pokemon');
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
};

export const getServerSideProps = async ({ query, locale }) => {
  const pokemon = await getPokemonDetails(query);
  return {
    props: {
      initialData: {
        query,
        pokemon
      },
      ...(await serverSideTranslations(locale, ['common', 'pokemon'])),
    }
  };
};

export default PokemonDetailsPage;
