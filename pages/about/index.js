import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

import { withTranslation } from '../../src/i18n';

const About = ({ t }) => {
  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('about-title')}`}</title>
      </Head>
      <Container>
        <h3>{t('about-title')}</h3>
        <p>
          Made with love by
          <a className="pl-1" href="https://pikamachu.github.com">
            Antonio Marin
          </a>
          . Code released under the
          <a className="pl-1" href="https://github.com/pikamachu/pika-pokedex-nextjs/blob/master/LICENSE">
            MIT License
          </a>
          .
        </p>
        <p>
          Build with
          <a className="pl-1" href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>
          ,
          <a className="pl-1" href="https://getbootstrap.com" rel="nofollow">
            Bootstrap
          </a>
          ,
          <a className="pl-1" href="https://animejs.com" rel="nofollow">
            Anime.js
          </a>
          . Theme from
          <a className="pl-1" href="https://bootswatch.com/" rel="nofollow">
            Bootswatch
          </a>
          .
        </p>
      </Container>
    </>
  );
};

About.propTypes = {
  i18nNamespaces: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

About.defaultProps = {
  i18nNamespaces: ['common', 'about'],
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      initialData: {
        query,
      },
    },
  };
};

export default withTranslation('about')(About);
