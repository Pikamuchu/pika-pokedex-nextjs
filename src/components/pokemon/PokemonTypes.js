import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const PokemonTypes = ({ t, types }) => {
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

PokemonTypes.propTypes = {
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('pokemon')(PokemonTypes);
