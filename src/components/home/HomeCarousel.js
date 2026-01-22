/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PokemonCarousel from '../../components/pokemon/PokemonCarousel';
import usePokemon from '../../hooks/usePokemon';

const HomeCarousel = () => {
  const { t } = useTranslation('home');
  const [mounted, setMounted] = useState(false);
  const { data: randomPokemons } = usePokemon({ listType: 'random' });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <h2>{t('pokemons-you-may-like')}</h2>
      <PokemonCarousel pokemons={randomPokemons} />
    </>
  );
};

export default HomeCarousel;
