/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPokemons } from '../../src/models/pokemonModel';
import PokemonList from '../../src/components/pokemon/PokemonList';
import PokemonListLoad from '../../src/components/pokemon/PokemonListLoad';
import usePokemon from '../../src/hooks/usePokemon';

const POKEMON_PAGE_SIZE = 20;

const PokemonListPage = ({ initialData }) => {
  const { t } = useTranslation('pokemon');
  const initialPageIndex = initialData.query?.pageIndex || 1;
  const initialQuery = initialData.query || {};
  const searchTerm = initialQuery.q || initialQuery.searchTerm || '';
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [isMoreResults, setMoreResults] = useState(true);
  const { data: pokemons } = usePokemon(initialQuery, initialData.pokemons);

  const pokemonListLoaded = [];
  for (let i = initialPageIndex + 1; i < pageIndex + 1; i++) {
    pokemonListLoaded.push(
      <PokemonListLoad
        key={i}
        index={i}
        query={initialQuery}
        onResults={(numResults) => setMoreResults(numResults >= POKEMON_PAGE_SIZE)}
      />
    );
  }

  useEffect(() => {
    setPageIndex(1);
    setMoreResults(true);
  }, [initialQuery]);

  const showLoadMoreButton = pokemons?.length >= POKEMON_PAGE_SIZE && isMoreResults;
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('pokemon-list-title')}`}</title>
      </Head>
      <Container className="pokemon-list-page-container">
        <h3>{`${t('pokemon-list-title')} ${searchTerm ? ' - ' + searchTerm : ''}`}</h3>
        <PokemonList pokemons={pokemons} showNotFound={false} />
        {pokemonListLoaded}
        {showLoadMoreButton ? (
          <Row className="justify-content-center">
            <Button onClick={() => setPageIndex(pageIndex + 1)}>{t('load-more')}</Button>
          </Row>
        ) : (
          ''
        )}
      </Container>
    </>
  );
};

PokemonListPage.propTypes = {
  initialData: PropTypes.shape({
    query: PropTypes.shape({
      pageIndex: PropTypes.number
    }),
    pokemons: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
};

export const getServerSideProps = async ({ query, locale }) => {
  const pokemons = await getPokemons(query);
  return {
    props: {
      initialData: {
        query,
        pokemons
      },
      ...(await serverSideTranslations(locale, ['common', 'pokemon'])),
    }
  };
};

export default PokemonListPage;
