import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import useCapture, { routeCapture } from '../../hooks/useCapture';

const PokemonCaptureButton = ({ pokemon, size = '' }) => {
  const { t } = useTranslation('pokemon');
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: captures } = useCapture();

  const openCapturePage = (event) => {
    routeCapture(pokemon);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setActive(captures && captures.includes(pokemon.id));
    }
  }, [captures, mounted, pokemon.id]);

  return (
    <button
      type="button"
      title={t('capture-pokemon')}
      className={`pokemon-capture-button ${mounted && active ? 'active' : ''} ${size}`}
      onClick={openCapturePage}
    />
  );
};

PokemonCaptureButton.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  size: PropTypes.string,
};

export default PokemonCaptureButton;
