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
    <section id="wrapper">
      <div id="title">
        <h1>{`Catch ${pokemon?.name}!`}</h1>
      </div>
      <div id="touch-layer" />
      <div id="particles" />
      <div id="screen" className="gradient-background">
        <div id="ball" />
        <div id="output" />
        <div id="motion-path">
          <div id="target">
            <div id="ring">
              <div id="ring-active">
                <div id="ring-fill" />
              </div>
            </div>
          </div>
          <svg width="80%" height="40%" viewBox="0 0 256 112">
            <path
              fill="none"
              stroke="#FFF"
              d="M 128 57 C 8 33.9086 25.9086 16 48 16 C 70.0914 16 88 33.9086 88 56 C 88 78.0914 105.9086 92 128 92 C 150.0914 92 160 72 160 56 C 160 40 148 24 128 24 C 108 24 96 40 96 56 C 96 72 105.9086 92 128 92 C 154 93 168 78 168 56 C 168 33.9086 185.9086 16 208 16 C 230.0914 16 248 33.9086 128 57 C 248 78.0914 230.0914 96 208 96 L 48 96 C 25.9086 96 8 78.0914 128 57 Z"
            />
          </svg>
        </div>
      </div>
      <div id="capture-screen" className="gradient-background hidden">
        <div id="capture-status" className="hidden">
          <h1>{`You caught ${pokemon.name}!`}</h1>
        </div>
        <div id="poof-container" className="hidden">
          <div id="poof" />
        </div>
        <div id="capture-confetti" />
        <div id="capture-ball" />
        <div id="capture-ball-button-container" className="hidden">
          <div id="capture-ball-button" />
        </div>
      </div>
    </section>
  );
};

CaptureGame.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('capture')(CaptureGame);
