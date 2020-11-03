import PropTypes from 'prop-types';
import { withTranslation } from '../../i18n';

const Spanner = ({ t }) => {
  return (
    <div className="spanner d-flex flex-row-reverse">
      <div className="spinner-box">
        <svg className="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="spinner-path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
        <p className="spinner-text">{t('spinner-loading')}</p>
      </div>
    </div>
  );
};

Spanner.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Spanner);
