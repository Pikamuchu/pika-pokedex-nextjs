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

const CaptureListPage = ({ t }) => {
  const initialPageIndex = 1;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { data: ids } = useCapture();
  const { data: pokemons } = usePokemon({ ids }, []);

  const pokemonListLoaded = [];
  for (let i = initialPageIndex + 1; i < pageIndex; i++) {
    pokemonListLoaded.push(<PokemonListLoad key={i} index={i} query={{}} />);
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
  t: PropTypes.func.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
};

CaptureListPage.defaultProps = {
  i18nNamespaces: ['common', 'pokemon'],
};

export default withTranslation(['common', 'pokemon'])(CaptureListPage);
