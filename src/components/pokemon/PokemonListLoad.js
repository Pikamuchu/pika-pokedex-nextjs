import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Spinner, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonList from './PokemonList';
import usePokemon from '../../hooks/usePokemon';

const PokemonListPage = ({ index, query, onResults, t }) => {
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
  t: PropTypes.func.isRequired
};

export default withTranslation('pokemon')(PokemonListPage);
