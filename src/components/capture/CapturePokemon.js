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
        <h1>{`Catch ${pokemon?.name}!`}</h1>
      </div>
      <div className="touch-layer" />
      <div className="particles" />
      <div className="screen gradient-background">
        <div className="ball" />
        <div className="output" />
        <div className="motion-path">
          <div className="target">
            <div className="ring">
              <div className="ring-active">
                <div className="ring-fill" />
              </div>
            </div>
          </div>
          <svg width="100%" height="100%" viewBox="0 0 256 112">
            <path
              fill="none"
              stroke="#FFF"
              d="M 128 57 C 8 33.9086 25.9086 16 48 16 C 70.0914 16 88 33.9086 88 56 C 88 78.0914 105.9086 92 128 92 C 150.0914 92 160 72 160 56 C 160 40 148 24 128 24 C 108 24 96 40 96 56 C 96 72 105.9086 92 128 92 C 154 93 168 78 168 56 C 168 33.9086 185.9086 16 208 16 C 230.0914 16 248 33.9086 128 57 C 248 78.0914 230.0914 96 208 96 L 48 96 C 25.9086 96 8 78.0914 128 57 Z"
            />
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
        <div className="capture-confetti" />
        <div className="capture-ball" />
        <div className="capture-ball-button-container hidden">
          <div className="capture-ball-button" />
        </div>
      </div>
      {pokemon.audio ? <audio id="game-music" src={pokemon.audio} muted /> : ''}
    </section>
  );
};

CaptureGame.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('capture')(CaptureGame);
