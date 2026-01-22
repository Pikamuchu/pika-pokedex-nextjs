import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

const NotFound = ({ message }) => {
  const { t } = useTranslation('common');
  return (
    <div className="not-found py-5 px-3">
      <h1>{t('not-found')}</h1>
      <p>{message}</p>
    </div>
  );
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotFound;
