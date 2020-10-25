import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, withTranslation } from '../../i18n';
import PokemonTypes from './PokemonTypes';
import PokemonCaptureButton from './PokemonCaptureButton';

const PokemonTile = ({ pokemon, size, t }) => {
  return (
    <Col className="pokemon-card p-3">
      <Row className="pokemon-image justify-content-center">
        <Link href={`/pokemon/${pokemon.id}`}>
          <Image src={pokemon.image} label={pokemon.slug} alt={pokemon.slug} thumbnail />
        </Link>
        <PokemonCaptureButton pokemon={pokemon} size={size} />
      </Row>
      <Row className="justify-content-center flex-nowrap">
        <h5>{`${pokemon.code} - ${pokemon.name}`}</h5>
      </Row>
      <Row className="justify-content-center">
        <PokemonTypes types={pokemon.types} />
      </Row>
    </Col>
  );
};

PokemonTile.propTypes = {
  pokemon: PropTypes.shape({
    code: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  size: PropTypes.string,
};

PokemonTile.defaultProps = {
  size: '',
};

export default withTranslation('pokemon')(PokemonTile);
