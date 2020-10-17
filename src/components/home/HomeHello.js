import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const HomeHello = ({ t }) => {
  return (
    <Jumbotron className="home-hello">
      <h1>{t('hello-title')}</h1>
      <p>{t('hello-description')}</p>
    </Jumbotron>
  );
};

HomeHello.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('home')(HomeHello);
