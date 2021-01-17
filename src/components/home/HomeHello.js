import PropTypes from 'prop-types';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { withTranslation } from '../../i18n';

const HomeHello = ({ t }) => {
  return (
    <Card className="home-hello">
      <Card.Body>
        <h1>{t('hello-title')}</h1>
        <Card.Text>{t('hello-description')}</Card.Text>
      </Card.Body>
      <Image
        className="card-image card-img-bottom"
        src="/static/images/home-hello.jpg"
        alt="Home hello"
        width={590}
        height={350}
        layout="responsive"
      />
    </Card>
  );
};

HomeHello.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('home')(HomeHello);
