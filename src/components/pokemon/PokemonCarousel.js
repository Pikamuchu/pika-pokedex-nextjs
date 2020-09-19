import PropTypes from "prop-types";
import { Carousel, Row, Spinner } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import { arrayChunk } from '../../libs/utils';
import PokemonTile from './PokemonTile';

const PokemonCarousel = ({ pokemons }) => {
  return (
    <Carousel>
      {pokemons ? (
        arrayChunk(pokemons, 4).map((pokemonChunk) => (
          <Carousel.Item key={pokemonChunk[0].id} className="pl-3 pr-3">
            <Row className="pokemons-container justify-content-around">
              {pokemonChunk.map((pokemon) => (
                <PokemonTile key={pokemon.id} pokemon={pokemon} />
              ))}
            </Row>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <Spinner animation="border" />
        </Carousel.Item>
      )}
    </Carousel>
  );
};

PokemonCarousel.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTranslation('pokemon')(PokemonCarousel);
