import PropTypes from 'prop-types';
import { Row, Spinner } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonTile from './PokemonTile';

const PokemonList = ({ t, pokemons }) => {
  return (
    <Row className="pokemons-container justify-content-around">
      {pokemons && pokemons.length ? (
        pokemons.map((pokemon) => <PokemonTile key={pokemon.id} pokemon={pokemon} />)
      ) : (
        <Spinner animation="border" />
      )}
    </Row>
  );
};

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTranslation('pokemon')(PokemonList);
