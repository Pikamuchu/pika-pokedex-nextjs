import * as Hammer from 'hammerjs';
import { getFirstElement } from './GameUtils';

export function createGameEvents(screen, state, actions) {
  // Create a manager to manage the touch area
  const touchElement = getFirstElement('touch-layer');
  const touchManager = new Hammer.Manager(touchElement);
  const pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
  const swipe = new Hammer.Swipe();
  swipe.recognizeWith(pan);

  // ball pan events
  touchManager.add(pan);
  touchManager.on('pan', (event) => {
    actions.pointerBall(event.center, event.isFinal);
  });

  // ball swipe events
  touchManager.add(swipe);
  touchManager.on('swipe', (event) => {
    actions.throwBall(event.angle, event.deltaY, event.velocity);
  });

  // Game events
  const gameEvents = () => {
    actions.performTargetAttacks();
    actions.checkBallColisions();
    if (state.isGameRunning() && state.isGameVisible()) {
      setTimeout(function () {
        gameEvents();
      }, 50);
    }
  };
  state.addGameEvent(gameEvents);

  // Window events
  window.onresize = () => {
    screen.height = window.innerHeight;
    screen.width = window.innerWidth;
    state.resetState();
  };

  // Page visibility events
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        state.pauseGame();
      } else {
        state.resumeGame();
      }
    },
    false
  );

  return {
    touchManager
  };
}
