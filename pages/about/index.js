import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const About = () => {
  const { t } = useTranslation('about');

  return (
    <>
      <Head>
        <title>{`Pikadex - ${t('about-title')}`}</title>
      </Head>
      <Container>
        <h3>{t('about-title')}</h3>
        <p>{t('about-description')}</p>
        <p>
          Made with love by
          <a className="ps-1" href="https://pikamuchu.github.com">
            Antonio Marin
          </a>
          . Code released under the
          <a className="ps-1" href="https://github.com/pikamuchu/pika-pokedex-nextjs/blob/master/LICENSE">
            MIT License
          </a>
          .
        </p>
        <p>
          Build with
          <a className="ps-1" href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>
          ,
          <a className="ps-1" href="https://getbootstrap.com" rel="nofollow">
            Bootstrap
          </a>
          ,
          <a className="ps-1" href="https://animejs.com" rel="nofollow">
            Anime.js
          </a>
          . Theme from
          <a className="ps-1" href="https://bootswatch.com/" rel="nofollow">
            Bootswatch
          </a>
          .
        </p>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    }
  };
};

export default About;
