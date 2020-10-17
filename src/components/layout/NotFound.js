import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const NotFound = ({ t, message }) => {
  return (
    <Jumbotron fluid className="not-found">
      <h1>{t('not-found')}</h1>
      <p>{message}</p>
    </Jumbotron>
  );
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(NotFound);
