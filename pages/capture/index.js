/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { withTranslation } from '../../src/i18n';
import PokemonList from '../../src/components/pokemon/PokemonList';
import PokemonListLoad from '../../src/components/pokemon/PokemonListLoad';
import usePokemon from '../../src/hooks/usePokemon';
import useCapture from '../../src/hooks/useCapture';

const CaptureListPage = ({ initialData, t }) => {
  const initialPageIndex = initialData.query?.pageIndex || 1;
  const [query, setQuery] = useState(initialData.query);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { data: ids } = useCapture(query);
  const { data: pokemons } = usePokemon({ ...query, ids }, []);

  const pokemonListLoaded = [];
  for (let i = initialPageIndex + 1; i < pageIndex; i++) {
    pokemonListLoaded.push(<PokemonListLoad key={i} index={i} query={query} />);
  }

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('capture-list-title')}`}</title>
      </Head>
      <Container className="pokemon-list-page-container">
        <PokemonList pokemons={pokemons} t={t} />
        {pokemonListLoaded}
        <Row className="justify-content-center">
          <Button onClick={() => setPageIndex(pageIndex + 1)}>Load More</Button>
        </Row>
      </Container>
    </>
  );
};

CaptureListPage.propTypes = {
  initialData: PropTypes.shape({
    query: PropTypes.shape({
      pageIndex: PropTypes.number,
    }),
    pokemons: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  t: PropTypes.func.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
};

CaptureListPage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon'],
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      initialData: {
        query,
      },
    },
  };
};

export default withTranslation(['common', 'pokemon'])(CaptureListPage);
