/* eslint-disable func-names */
/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es.js';
import * as Hammer from 'hammerjs';

import { createScreen, createAudio, createBall, createTarget } from './game/GameElementsHelpers';
import { createGameActions } from './game/GameActionsHelpers';
import { createGameState } from './game/GameStateHelpers';
import { createTouchManager } from './game/GameTouchHelpers';

export default function captureGame(pokemon, captureSuccessCallback) {
  const screen = createScreen();
  const audio = createAudio();
  const ball = createBall(screen);
  const target = createTarget(anime, pokemon);

  const state = createGameState(anime, ball, target, screen, audio);
  const actions = createGameActions(anime, ball, target, screen, state, captureSuccessCallback);
  createTouchManager(Hammer, anime, ball, screen, actions, state);

  // Init game
  state.resetState();
}
