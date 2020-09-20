import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonTile from './PokemonTile';
import NotFound from '../layout/NotFound';

const PokemonList = ({ t, pokemons }) => {
  return (
    <Row className="pokemons-container justify-content-around">
      {pokemons && pokemons.length ? (
        pokemons.map((pokemon) => (
          <Col key={pokemon.id} lg={3} md={4} sm={6} xs={6}>
            <PokemonTile key={pokemon.id} pokemon={pokemon} />
          </Col>
        ))
      ) : (
        <NotFound message="{ t('pokemon-not-found')}" />
      )}
    </Row>
  );
};

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('pokemon')(PokemonList);
