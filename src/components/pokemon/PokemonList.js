/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonTile from './PokemonTile';
import NotFound from '../layout/NotFound';

const PokemonList = ({ pokemons, showNotFound, t }) => {
  const notFoundMessage = showNotFound ? <NotFound message={t('pokemon-not-found')} /> : '';
  return (
    <Row className="pokemons-container justify-content-around">
      {pokemons && pokemons.length
        ? pokemons.map((pokemon) => <PokemonItem pokemon={pokemon} key={pokemon.id} t={t} />)
        : notFoundMessage}
    </Row>
  );
};

const PokemonItem = ({ pokemon, t }) => {
  return (
    <>
      {pokemon?.id ? (
        <Col key={pokemon.id} lg={3} md={4} sm={6} xs={6}>
          <PokemonTile key={pokemon.id} pokemon={pokemon} />
        </Col>
      ) : (
        ''
      )}
    </>
  );
};

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object),
  showNotFound: PropTypes.bool,
  t: PropTypes.func.isRequired
};

PokemonList.defaultProps = {
  pokemons: null,
  showNotFound: true
};

export default withTranslation('pokemon')(PokemonList);
