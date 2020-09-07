import { Badge, Col, Image, Row, Spinner } from 'react-bootstrap';
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
    <Col className="pokemon-card pb-3">
      <Link href={`/pokemon/${pokemon.id}`}>
        <Row>
          <Image
            className="border"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.code}.png`}
            label={pokemon.name}
            alt={pokemon.name}
          />
          <div className="pokemon-info">
            <h5>
              {pokemon.code} - {pokemon.name}
            </h5>
            <PokemonTypes types={pokemon.types} />
          </div>
        </Row>
      </Link>
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

export default withTranslation('pokemon')(PokemonList);
