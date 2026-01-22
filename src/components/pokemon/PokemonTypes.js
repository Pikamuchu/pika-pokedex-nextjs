import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

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

PokemonTypes.propTypes = {
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PokemonTypes;
