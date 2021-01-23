import anime from 'animejs/lib/anime.es.js';

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

  createTouchManager(actions);

  // Init game
  state.resetState();
}
