import anime from 'animejs/lib/anime.es.js';

import { createScreen, createAudio, createBall, createTarget } from './game/GameElementsHelpers';
import { createGameState } from './game/GameStateHelpers';
import { createGameActions } from './game/GameActionsHelpers';
import { createGameEvents } from './game/GameEventsHelpers';

export default function captureGame(pokemon, captureSuccessCallback) {
  const screen = createScreen();
  const audio = createAudio();

  const ball = createBall(screen);
  const target = createTarget(anime, pokemon);

  const state = createGameState(ball, target, screen, audio);
  const actions = createGameActions(anime, ball, target, screen, state, captureSuccessCallback);

  createGameEvents(screen, state, actions);

  // Init game
  state.resetState();
}
