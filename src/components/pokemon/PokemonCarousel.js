import PropTypes from 'prop-types';
import { Carousel, Row, Spinner } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import { arrayChunk } from '../../libs/utils';
import PokemonTile from './PokemonTile';
import NotFound from '../layout/NotFound';

const PokemonCarousel = ({ t, pokemons }) => {
  return (
    <Carousel>
      {pokemons ? (
        pokemons.map((pokemon) => (
          <Carousel.Item key={pokemon.id} className="col-sm-6 col-md-4 col-lg-3">
            <Row className="pokemons-container justify-content-around">
              <PokemonTile key={pokemon.id} pokemon={pokemon} size="large" />
            </Row>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <NotFound message="" />
        </Carousel.Item>
      )}
    </Carousel>
  );
};

/*
        arrayChunk(pokemons, 4).map((pokemonChunk) => (
          <Carousel.Item key={pokemonChunk[0].id} className="pl-3 pr-3">
            <Row className="pokemons-container justify-content-around">
              {pokemonChunk.map((pokemon) => (
                <PokemonTile key={pokemon.id} pokemon={pokemon} />
              ))}
            </Row>
          </Carousel.Item>
        ))
*/

PokemonCarousel.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('pokemon')(PokemonCarousel);
