import { Row, Col } from 'react-bootstrap';
import { Link, withTranslation } from '../../i18n';

const PokemonDetails = ({ pokemon }) => {
  return (
    <Col>
      <Row className="pokemon-card">
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.code}.png`}
          label={pokemon.name}
          alt={pokemon.name}
        />
        <div className="pokemon-info">
          <h5>{pokemon.name}</h5>
          <p>{pokemon.code}</p>
          {pokemon.types.map((type) => (
            <PokemonType key={type.id} type={type} />
          ))}
        </div>
      </Row>
    </Col>
  );
};

const PokemonType = ({ type }) => {
  return (
    <div className="p-1">
      <span className="pill background-color-{type.id}">{type.name}</span>
    </div>
  );
};

export default withTranslation('pokemon')(PokemonDetails);
