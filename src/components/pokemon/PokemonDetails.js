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
          <Row className="justify-content-center">
            <p>{`${pokemon.description}`}</p>
          </Row>
          <Row className="pt-3 px-5">
            <Col sm={6} xs={12} className="pb-5 pr-5">
              <Row className="pokemon-image justify-content-center">
                <Link href={`/pokemon/${pokemon.id}`}>
                  <Image src={pokemon.image} label={pokemon.slug} alt={pokemon.slug} thumbnail fluid />
                </Link>
                <PokemonCaptureButton pokemon={pokemon} size="large mr-5" />
              </Row>
            </Col>
            <Col sm={6} xs={12}>
              <PokemonData pokemon={pokemon} t={t} />
            </Col>
          </Row>
          <Row className="px-5 pb-5">
            <Col sm={6} xs={12} className="pb-5 pr-5">
              <PokemonStats stats={pokemon.stats} t={t} />
            </Col>
            <Col sm={6} xs={12}>
              <PokemonAbilities abilities={pokemon.abilities} t={t} />
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
    description: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.object),
    abilities: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

const PokemonData = ({ t, pokemon }) => {
  return (
    <>
      <Row className="justify-content-left">
        <h5>{t('pokemon-data')}</h5>
      </Row>
      <Row className="justify-content-left"></Row>
      <Row className="justify-content-left">
        <div className="pokemon-stats">
          <ul className="list-unstyled">
            <li>
              {`${t('type')}:`}
              <PokemonTypes types={pokemon.types} t={t} />
            </li>
            <li>{`${t('color')}: ${pokemon.color}`}</li>
            <li>{`${t('weight')}: ${pokemon.weight}`}</li>
            <li>{`${t('height')}: ${pokemon.height}`}</li>
            <li>{`${t('evolves-from')}: ${pokemon.evolvesFromId}`}</li>
          </ul>
        </div>
      </Row>
    </>
  );
};

const PokemonStats = ({ t, stats }) => {
  return (
    <>
      <Row className="justify-content-left">
        <h5>{t('pokemon-stats')}</h5>
      </Row>
      <Row className="justify-content-left">
        <div className="pokemon-stats">
          <ul className="list-unstyled">
            {stats?.map((stat) => (
              <li key={stat.name}>{`${stat.name}: ${stat.value}`}</li>
            ))}
          </ul>
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
          <ul className="list-unstyled">
            {abilities?.map((ability) => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        </div>
      </Row>
    </>
  );
};

export default withTranslation('pokemon')(PokemonDetails);
