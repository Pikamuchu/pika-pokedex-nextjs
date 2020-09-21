/* eslint-disable react/forbid-prop-types */
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
  const { data: randomPokemons } = usePokemon({}, initialData.randomPokemons);
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('home-title')}`}</title>
      </Head>
      <Container className="home-page-container">
        <HomeHello />
        <h2>{t('pokemons-you-may-like')}</h2>
        <PokemonCarousel pokemons={randomPokemons} />
      </Container>
    </>
  );
};

HomePage.propTypes = {
  initialData: PropTypes.shape({
    randomPokemons: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.object,
  }).isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  i18nNamespaces: ['common', 'home', 'pokemon'],
};

export const getServerSideProps = async ({ query }) => {
  const randomPokemons = await getPokemons({ type: 'random', ...query });
  return {
    props: {
      initialData: {
        randomPokemons,
      },
    },
  };
};

export default withTranslation(['common', 'home', 'pokemon'])(HomePage);
