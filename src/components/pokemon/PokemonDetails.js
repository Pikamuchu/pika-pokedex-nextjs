import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, withTranslation } from '../../i18n';
import PokemonTypes from './PokemonTypes';
import PokemonCaptureButton from './PokemonCaptureButton';
import NotFound from '../layout/NotFound';

const PokemonDetails = ({ t, pokemon }) => {
  return (
    <>
      {pokemon?.id ? (
        <>
          <Row className="justify-content-center">
            <h2 className="pr-1">{`${pokemon.code} - ${pokemon.name}`}</h2>
          </Row>
          <Row className="justify-content-left">
            <h3 className="pr-1">{`${pokemon.description}`}</h3>
          </Row>
          <Row className="pt-5 pb-5">
            <Col sm={5} xs={12}>
              <Row className="pokemon-image justify-content-center">
                <Link href={`/pokemon/${pokemon.id}`}>
                  <Image src={pokemon.image} label={pokemon.slug} alt={pokemon.slug} thumbnail fluid />
                </Link>
                <PokemonCaptureButton pokemon={pokemon} size="large" />
              </Row>
            </Col>
            <Col sm={3} xs={6} className="ml-3">
              <Row className="justify-content-left">
                <h5>{t('pokemon-types')}</h5>
              </Row>
              <Row className="justify-content-left">
                <PokemonTypes types={pokemon.types} t={t} />
              </Row>
            </Col>
            <Col sm={3} xs={6} className="ml-3">
              <PokemonStats stats={pokemon.stats} t={t} />
            </Col>
          </Row>
          <Row className="pt-5 pb-5">
            <Col sm={3} xs={6} className="ml-3">
              <PokemonAbilities stats={pokemon.abilities} t={t} />
            </Col>
          </Row>
        </>
      ) : (
        <NotFound message={t('pokemon-not-found')} />
      )}
    </>
  );
};

PokemonDetails.propTypes = {
  pokemon: PropTypes.shape({
    code: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.object),
    abilities: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

const PokemonStats = ({ t, stats }) => {
  return (
    <>
      <Row className="justify-content-left">
        <h5>{t('pokemon-stats')}</h5>
      </Row>
      <Row className="justify-content-left">
        <div className="pokemon-stats">
          {stats?.map((stat) => (
            <p key={stat.name}>{`${stat.name}: ${stat.value}`}</p>
          ))}
        </div>
      </Row>
    </>
  );
};

const PokemonAbilities = ({ t, abilities }) => {
  return (
    <>
      <Row className="justify-content-left">
        <h5>{t('pokemon-abilities')}</h5>
      </Row>
      <Row className="justify-content-left">
        <div className="pokemon-abilities">
          {abilities?.map((ability) => (
            <p key={ability.name}>{ability.name}</p>
          ))}
        </div>
      </Row>
    </>
  );
};

export default withTranslation('pokemon')(PokemonDetails);
