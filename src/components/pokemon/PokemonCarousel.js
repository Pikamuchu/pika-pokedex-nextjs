import PropTypes from 'prop-types';
import { Carousel, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonTile from './PokemonTile';

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
        <Carousel.Item />
      )}
    </Carousel>
  );
};

PokemonCarousel.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object)
};

PokemonCarousel.defaultProps = {
  pokemons: null
};

export default withTranslation('pokemon')(PokemonCarousel);
