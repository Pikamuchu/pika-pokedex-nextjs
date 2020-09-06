import { Col, Row, Spinner } from 'react-bootstrap';
import { Link, withTranslation } from '../i18n';

const PokemonList = ({ pokemons }) => {
  return (
    <Row className="pokemons-container">
      {pokemons ? (
        pokemons.map((pokemon) => <Pokemon key={pokemon.id} pokemon={pokemon} />)
      ) : (
        <Spinner animation="border" />
      )}
    </Row>
  );
};

const Pokemon = ({ pokemon }) => {
  return (
    <Col>
      <Link href={`/pokemon/${pokemon.id}`}>
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
      </Link>
    </Col>
  );
};

const PokemonType = ({ type }) => {
  return (
    <div className="abilities">
      <span className="pill background-color-{type.id}">{type.name}</span>
    </div>
  );
};

export default withTranslation('pokemon')(PokemonList);
