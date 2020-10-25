/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonList from '../pokemon/PokemonList';
import PokemonListLoad from '../pokemon/PokemonListLoad';
import usePokemon from '../../hooks/usePokemon';
import useCapture from '../../hooks/useCapture';

const CapturePokemonList = ({ t }) => {
  const initialPageIndex = 1;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { data: ids } = useCapture();
  const { data: pokemons } = usePokemon({ ids });

  const pokemonListLoaded = [];
  for (let i = initialPageIndex + 1; i < pageIndex; i++) {
    pokemonListLoaded.push(<PokemonListLoad key={i} index={i} query={{}} />);
  }

  return (
    <>
      <PokemonList pokemons={pokemons} showNotFound={false} />
      {pokemonListLoaded}
      <Row className="justify-content-center invisible">
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Load More</Button>
      </Row>
    </>
  );
};

CapturePokemonList.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('capture')(CapturePokemonList);
