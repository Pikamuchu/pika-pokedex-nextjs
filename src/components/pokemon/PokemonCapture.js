import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withTranslation } from '../../i18n';
import useCapture, { routeCapture } from '../../hooks/useCapture';

const PokemonCapture = ({ t, pokemon }) => {
  const [active, setActive] = useState(false);
  const { data: captures } = useCapture(null, []);

  const openCaptureModal = (event) => {
    setActive(true);
    routeCapture(pokemon);
  };

  useEffect(() => {
    setActive(false);
  }, [captures]);

  return (
    <button
      type="button"
      title={t('capture-pokemon')}
      className={`pokemon-capture-button ${active ? 'active' : ''}`}
      onClick={openCaptureModal}
    />
  );
};

PokemonCapture.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};

export default withTranslation('pokemon')(PokemonCapture);
