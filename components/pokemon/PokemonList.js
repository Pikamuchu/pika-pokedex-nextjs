import { Badge, Col, Image, Row, Spinner } from 'react-bootstrap';
import { Link, withTranslation } from '../../i18n';

const PokemonList = ({ pokemons }) => {
  return (
    <Row className="pokemons-container justify-content-around">
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
    <Col lg={3} md={4} sm={6} xs={10} className="pokemon-card p-3">
      <Row className="pokemon-image justify-content-center">
        <Link href={`/pokemon/${pokemon.id}`}>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.code}.png`}
            label={pokemon.name}
            alt={pokemon.name}
            thumbnail
          />
        </Link>
      </Row>
      <Row className="justify-content-center">
        <h5>
          {pokemon.code} - {pokemon.name}
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

export default withTranslation('pokemon')(PokemonList);
