import PropTypes from 'prop-types';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

const HomeHello = () => {
  const { t } = useTranslation('home');
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
        style={{ width: '100%', height: 'auto' }}
        priority
      />
    </Card>
  );
};

export default HomeHello;
