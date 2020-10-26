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
      <div id="ring-screen">
        <div id="ring">
          <div id="ring-active">
            <div id="ring-fill" />
          </div>
        </div>
      </div>
      <div id="screen" className="gradient-background">
        <div id="target-container">
          <div id="target" />
        </div>
        <div id="ball" />
        <div id="output" />
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
