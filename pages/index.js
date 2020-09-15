// import React, { useState, useCallback, useEffect } from 'react'
// import useSWR from 'swr'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { withTranslation } from '../src/i18n';
import { getPokemons } from '../src/models/pokemonModel';
import HomeHello from '../src/components/home/HomeHello';
import PokemonCarousel from '../src/components/pokemon/PokemonCarousel';
import usePokemon from '../src/hooks/usePokemon';

const HomePage = ({ initialData, t }) => {
  const { data: popularPokemons } = usePokemon({}, initialData.popularPokemons);
  return (
    <>
      <Head>
        <title>
          Pokedex -
          {t('home-title')}
        </title>
      </Head>
      <Container>
        <HomeHello className="border-0" />
      </Container>
      <Container>
        <PokemonCarousel pokemons={popularPokemons} />
      </Container>
    </>
  );
};

HomePage.propTypes = {
  initialData: PropTypes.shape({
    popularPokemons: PropTypes.object,
    query: PropTypes.object,
  }).isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  i18nNamespaces: ['common', 'home', 'pokemon'],
};

export const getServerSideProps = async ({ query }) => {
  const popularPokemons = await getPokemons(query);
  return {
    props: {
      initialData: {
        popularPokemons,
      },
    },
  };
};

export default withTranslation(['common', 'home', 'pokemon'])(HomePage);
