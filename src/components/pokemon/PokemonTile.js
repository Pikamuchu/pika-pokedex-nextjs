import { Badge, Col, Image, Row } from 'react-bootstrap';
import { Link, withTranslation } from '../../i18n';

const PokemonTile = ({ pokemon }) => {
  return (
    <Col lg={3} md={4} sm={6} xs={6} className="pokemon-card p-3">
      <Row className="pokemon-image justify-content-center">
        <Link href={`/pokemon/${pokemon.id}`}>
          <Image src={pokemon.image} label={pokemon.slug} alt={pokemon.slug} thumbnail />
        </Link>
      </Row>
      <Row className="justify-content-center">
        <h5>
          {pokemon.code}
          {' '}
          -
          {pokemon.name}
        </h5>
      </Row>
      <Row className="justify-content-center">
        <PokemonTypes types={pokemon.types} />
      </Row>
    </Col>
  );
};

const PokemonTypes = ({ types }) => {
  return (
    <div className="pokemon-abilities">
      {types?.map((type) => (
        <Badge key={type.id} className={`background-color-${type.id}`} pill>
          {type.name}
        </Badge>
      ))}
    </div>
  );
};

export default withTranslation('pokemon')(PokemonTile);
