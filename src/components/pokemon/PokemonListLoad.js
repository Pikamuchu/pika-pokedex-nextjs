import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Spinner, Row } from 'react-bootstrap';
import PokemonList from './PokemonList';
import usePokemon from '../../hooks/usePokemon';

const PokemonListPage = ({ index, query, onResults }) => {
  const { data: pokemons } = usePokemon({ ...query, pageIndex: index });

  useEffect(() => {
    if (onResults) {
      onResults(pokemons?.length);
    }
  }, [pokemons, onResults]);

  return pokemons?.length ? (
    <PokemonList pokemons={pokemons} />
  ) : (
    <Row className="justify-content-center p-3">
      <Spinner animation="grow" />
    </Row>
  );
};

PokemonListPage.propTypes = {
  index: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired,
  onResults: PropTypes.func
};

export default PokemonListPage;
