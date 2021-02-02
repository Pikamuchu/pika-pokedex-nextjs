import { Resources } from './GameResourcesHelpers';
import { findCollidableElement, elementColisionTransform, isBouncingElement } from './GameCollisionsHelpers';
import {
  getFirstElement,
  getRandomNumber,
  clearContainerElement,
  hideElement,
  activeElement,
  clearElementTransforms,
  setElementImage
} from './GameUtils';
import {
  emitBallColisionParticles,
  restoreBallEffect,
  removeElementAnimation,
  throwEffect1,
  throwEffect2,
  moveElementAsideEffect,
  emitParticlesToElementEffect,
  fadeElementEffect,
  dropElementEffect,
  shakeEffect,
  rainConfettiEffect,
  poofEffect
} from './GameEffectsHelpers';

export const createGameActions = (ball, target, screen, state, captureSuccessCallback) => {
  const checkBallColisions = () => {
    if (!ball.colision) {
      const ballCoords = ball.getCenterCoords();
      if (ballCoords) {
        const elements = document.elementsFromPoint(ballCoords.x, ballCoords.y);
        var elementColision = findCollidableElement(elements);
        if (elementColision) {
          console.log('Ball colision' + elementColision);
          ball.colision = true;
          elementColisionTransform(elementColision, elements);
          emitBallColisionParticles(ball, elementColision, () => {
            ball.colision = false;
          });
          if (!isBouncingElement(elementColision)) {
            restoreBallEffect(ball);
          }
        }
      }
    }
  };

  const translateBall = (coords) => {
    if (coords) {
      ball.moveBallPointer(coords.x, coords.y);
    }
  };

  const translateElementToCoords = (element, coords) => {
    if (coords) {
      ball.moveBallPointer(coords.x, coords.y);
    }
    if (final) {
      //restoreBallEffect(ball);
    }
  };

  const pointerBall = (coords, final) => {
    if (ball.inMotion) {
      return;
    }
    if (coords) {
      ball.moveBallPointer(coords.x, coords.y);
    }
    if (final) {
      //restoreBallEffect(ball);
    }
  };

  const throwTargetElementToBall = () => {
    const targetCoords = target.getCenterCoords();
    const ballCoords = ball.getCenterCoords();

    //throwEffect2(ball.getElement(), movementY, translateXValue, scalePercent, determineThrowResult);
  };

  const throwBall = (angle, deltaY, velocity) => {
    if (ball.inMotion) {
      return;
    }
    ball.inMotion = true;
    let maxVelocity = screen.height * 0.009;
    velocity = Math.abs(velocity);
    if (velocity > maxVelocity) {
      velocity = maxVelocity;
    }
    // Determine the final position.
    const scalePercent = Math.log(velocity + 1) / Math.log(maxVelocity + 1);
    const movementY = deltaY;
    // Determine how far it needs to travel from the current position to the destination.
    const translateYValue = -0.75 * screen.height * scalePercent;
    const translateXValue = -1 * (angle + 90) * (translateYValue / 100);

    throwEffect1(ball.getElement(), translateXValue, movementY, scalePercent, () => {
      if (movementY < 0) {
        ball.savePosition();
        throwEffect2(ball.getElement(), movementY, translateXValue, scalePercent, determineThrowResult);
      } else {
        setTimeout(state.resetState, 400);
      }
    });
  };

  const determineThrowResult = () => {
    // Determine if the ball is touching the target.
    const targetCoords = target.getCenterCoords();
    const ballCoords = ball.getCenterCoords();
    const radius = target.getRadius();
    if (
      ballCoords.x > targetCoords.x - radius &&
      ballCoords.x < targetCoords.x + radius &&
      ballCoords.y > targetCoords.y - radius &&
      ballCoords.y < targetCoords.y + radius
    ) {
      // Capture success
      removeElementAnimation('.ring-fill');
      if (target.motion) {
        target.motion.pause();
      }
      ball.savePosition();
      const ballElement = ball.getElement();
      const ballOrientation = ballCoords.x < targetCoords.x ? -1 : 1;
      moveElementAsideEffect(ballElement, radius, ballOrientation, () => {
        setElementImage(ballElement, Resources.pikaballOpened);
        emitTargetParticlesToBall();
      });
    } else {
      // Capture fail
      restoreBallEffect(ball);
    }
  };

  const emitTargetParticlesToBall = () => {
    const targetCoords = target.getCenterCoords();
    const ballElement = ball.getElement();
    const particleContainer = getFirstElement('particle-container');

    emitParticlesToElementEffect(ballElement, ball.size, targetCoords, particleContainer, closingCaptureBall);
    fadeElementEffect(target.getElement());
  };

  const closingCaptureBall = () => {
    setElementImage(ball.getElement(), Resources.pikaballClosed);
    clearContainerElement('particle-container');
    ball.savePosition();

    dropElementEffect(ball.getElement(), () => {
      ball.resetBall();
      state.resetState();
      animateCaptureState();
    });
  };

  const animateCaptureState = () => {
    hideElement('capture-screen');
    hideElement('capture-ball-button-container');

    const captureBallElement = getFirstElement('capture-ball');
    shakeEffect(captureBallElement, 500);

    const ringRect = getFirstElement('ring-active').getBoundingClientRect();
    const successRate = ((150 - ringRect.width) / 150) * 100;
    const seed = getRandomNumber(0, 100);
    setTimeout(() => {
      removeElementAnimation(captureBallElement);

      if (seed < Math.floor(successRate)) {
        showCaptureSuccess();
      } else {
        showEscapeAnimationAndContinue();
      }
    }, 3000);
  };

  const showCaptureSuccess = () => {
    activeElement('capture-ball-button');
    hideElement('capture-status');

    const particleContainer = getFirstElement('capture-confetti');
    rainConfettiEffect(particleContainer, () => {
      clearContainerElement(particleContainer);
      captureSuccessCallback();
    });
  };

  const showEscapeAnimationAndContinue = () => {
    hideElement('capture-ball-button-container');
    hideElement('poof-container');
    poofEffect(getFirstElement('poof'), hideEscapeAnimation);
  };

  const hideEscapeAnimation = () => {
    hideElement('capture-screen');
    clearElementTransforms('poof');
    hideElement('poof-container');
  };

  return {
    checkBallColisions,
    pointerBall,
    throwBall,
    throwTargetElementToBall
  };
};
