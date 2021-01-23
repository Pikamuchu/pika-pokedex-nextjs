import * as Hammer from 'hammerjs';
import { getFirstElement } from './GameElementsHelpers';

export function createTouchManager(actions) {
  // Create a manager to manage the touch area
  const touchElement = getFirstElement('touch-layer');
  const manager = new Hammer.Manager(touchElement);
  const pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
  const swipe = new Hammer.Swipe();
  swipe.recognizeWith(pan);

  // ball pan events
  manager.add(pan);
  manager.on('pan', (event) => {
    actions.moveBall(event.center, event.isFinal);
  });

  // ball swipe events
  manager.add(swipe);
  manager.on('swipe', (event) => {
    actions.throwBall(event.angle, event.deltaY, event.velocity);
  });

  return manager;
}
