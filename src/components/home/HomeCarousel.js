/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

import { withTranslation } from '../../i18n';
import PokemonCarousel from '../../components/pokemon/PokemonCarousel';
import usePokemon from '../../hooks/usePokemon';

const HomeCarousel = ({ t }) => {
  const { data: randomPokemons } = usePokemon({ listType: 'random' }, initialData.randomPokemons);
  return (
    <>
      <h2>{t('pokemons-you-may-like')}</h2>
      <PokemonCarousel pokemons={randomPokemons} />
    </>
  );
};

HomeCarousel.propTypes = {
  t: PropTypes.func.isRequired,
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string)
};

HomeCarousel.defaultProps = {
  i18nNamespaces: ['common', 'home', 'pokemon']
};

export default withTranslation('home')(HomeCarousel);
