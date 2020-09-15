import { Jumbotron } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const HomeHello = ({ t }) => {
  return (
    <Jumbotron>
      <h1>{t('hello-title')}</h1>
      <p>{t('hello-description')}</p>
    </Jumbotron>
  );
};

export default withTranslation('home')(HomeHello);
