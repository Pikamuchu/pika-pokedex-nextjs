import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const Spanner = ({ t }) => {
  return (
    <div className="spanner d-flex flex-row-reverse">
      <div className="spinner-box">
      <Spinner animation="grow" />
      <p>{t('spinner-loading')}</p>
      </div>
    </div>
  );
};

Spanner.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('pokemon')(Spanner);
