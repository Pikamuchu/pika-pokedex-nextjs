// import React, { useState, useCallback, useEffect } from 'react'
// import useSWR from 'swr'
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { withTranslation } from '../../src/i18n';
import { getPokemons } from '../../src/models/pokemonModel';
import PokemonList from '../../src/components/pokemon/PokemonList';
import usePokemon from '../../src/hooks/usePokemon';

const PokemonListPage = ({ initialData, t }) => {
  const { data: pokemons } = usePokemon({}, initialData.pokemons);
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('pokemon-list-title')}`}</title>
      </Head>
      <Container>
        <PokemonList pokemons={pokemons} />
      </Container>
    </>
  );
};

PokemonListPage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon'],
};

export const getServerSideProps = async ({ query }) => {
  const pokemons = await getPokemons(query);
  return {
    props: {
      initialData: {
        query,
        pokemons,
      },
    },
  };
};

export default withTranslation(['common', 'pokemon'])(PokemonListPage);
