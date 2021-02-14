import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { withTranslation } from '../../i18n';
import useCapture, { postCapture, routeCapture } from '../../hooks/useCapture';
import captureGame from './CaptureGameHelpers';

const CaptureGame = ({ pokemon, t }) => {
  const { data: captures, mutate, revalidate } = useCapture();

  useEffect(() => {
    captureGame(pokemon, () => {
      captures.push(pokemon.id);
      postCapture(captures, mutate, revalidate);
      setTimeout(() => {
        routeCapture({});
      }, 2000);
    });
  }, [pokemon]);

  return (
    <section className="wrapper">
      <div className="title">
        <h1>
          <span className="collidable bouncing">{`Catch ${pokemon?.name}!`}</span>
        </h1>
      </div>
      <div className="touch-layer" />
      <div id="particle-container" className="particle-container" />
      <div id="attack-container" className="attack-container" />
      <div className="screen gradient-background">
        <div id="ball" className="ball" />
        <div className="output" />
        <div className="motion-path">
          <div id="target" className="target">
            <div className="ring">
              <div className="ring-active">
                <div className="ring-fill" />
              </div>
            </div>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 256 112">
            {pokemon?.gameConfig?.motionPath ? (
              <path fill="none" stroke="#FFF" d={pokemon.gameConfig.motionPath} />
            ) : (
              ''
            )}
          </svg>
        </div>
      </div>
      <div className="capture-screen gradient-background hidden">
        <div className="capture-status hidden">
          <h1>{`You caught ${pokemon.name}!`}</h1>
        </div>
        <div className="poof-container hidden">
          <div className="poof" />
        </div>
        <div id="capture-confetti" className="capture-confetti" />
        <div id="capture-ball" className="capture-ball" />
        <div className="capture-ball-button-container hidden">
          <div className="capture-ball-button" />
        </div>
      </div>
      {pokemon?.gameConfig?.audio ? <audio id="game-music" src={pokemon.gameConfig.audio} muted /> : ''}
    </section>
  );
};

CaptureGame.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('capture')(CaptureGame);
