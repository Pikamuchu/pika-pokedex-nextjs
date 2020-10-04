import PropTypes from 'prop-types';
import { Spinner, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonList from './PokemonList';
import usePokemon from '../../hooks/usePokemon';

const PokemonListPage = ({ query, index, t }) => {
  const { data: pokemons } = usePokemon({ ...query, pageIndex: index });
  return pokemons?.length ? (
    <PokemonList pokemons={pokemons} t={t} />
  ) : (
    <Row className="justify-content-center p-3">
      <Spinner animation="grow" />
    </Row>
  );
};

PokemonListPage.propTypes = {
  index: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation(['pokemon'])(PokemonListPage);
