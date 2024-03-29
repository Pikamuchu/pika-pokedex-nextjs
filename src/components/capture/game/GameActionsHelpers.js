import { Resources } from './GameResourcesHelpers';
import { findCollidableElement, elementColisionTransform, isBouncingElement } from './GameCollisionsHelpers';
import {
  getElementById,
  getFirstElement,
  getRandomNumber,
  clearContainerElement,
  hideElement,
  activeElement,
  clearElementTransforms,
  setElementImage,
  getTranslationBetweenElements
} from './GameUtils';
import {
  emitBallColisionParticles,
  restoreBallEffect,
  removeElementAnimation,
  throwEffect1,
  throwEffect2,
  throwAttackEffect,
  moveElementAsideEffect,
  emitParticlesToElementEffect,
  fadeElementEffect,
  dropElementEffect,
  shakeEffect,
  rainConfettiEffect,
  poofEffect
} from './GameEffectsHelpers';

const MAX_BOUNCINGS = 2;

export const createGameActions = (ball, target, screen, state, captureSuccessCallback) => {
  const performTargetAttacks = () => {
    if (!target.captured) {
      const attackType = target.getAttackType();
      switch (attackType) {
        case 'throw':
          performTargetThrowAttack();
          break;
        default:
      }
    }
  };

  const checkBallColisions = () => {
    if (!ball.colision && !target.captured) {
      const ballCoords = ball.getCenterCoords();
      if (ballCoords) {
        const elements = document.elementsFromPoint(ballCoords.x, ballCoords.y);
        var elementColision = findCollidableElement(elements);
        if (elementColision) {
          ball.colision = true;
          elementColisionTransform(elementColision, elements);
          emitBallColisionParticles(ball, elementColision);
          if (!isBouncingElement(elementColision)) {
            restoreBallEffect(ball);
          } else {
            ball.bouncing++;
            if (ball.bouncing <= MAX_BOUNCINGS) {
              ball.colision = false;
            }
          }
        }
      }
    }
  };

  const pointerBall = (coords, final) => {
    if (ball.inMotion) {
      return;
    }
    if (coords && !final) {
      ball.moveBallPointer(coords.x, coords.y);
    }
  };

  let numEvents = 0;
  let numAttack = 0;
  const performTargetThrowAttack = () => {
    const targetCoords = target.getCenterCoords();
    const attackContainer = getFirstElement('attack-container');
    if (targetCoords && attackContainer) {
      numEvents++;
      numAttack++;
      if (numEvents % target.attackDelay === 0) {
        numAttack = 0;
      }
      if (numAttack < target.attackBurst + getRandomNumber(0, 2)) {
        target.numAttacks++;

        const attackElement = document.createElement('div');
        attackElement.className = 'attack collidable';
        attackElement.setAttribute('id', `attack-${target.numAttacks}`);
        attackElement.style.left = `${targetCoords.x + getRandomNumber(-60, 60)}px`;
        attackElement.style.top = `${targetCoords.y}px`;
        attackElement.style.backgroundImage = `url('${target.getAttackImage()}')`;

        attackContainer.appendChild(attackElement);

        const translationCoords = getTranslationBetweenElements(attackElement, ball.getElement());

        throwAttackEffect(attackElement, translationCoords.x, translationCoords.y, 2, 1000, () => {
          attackElement.remove();
        });
      }
    }
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
      ball.savePosition();
      throwEffect2(ball.getElement(), movementY, translateXValue, scalePercent, determineThrowResult);
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
      ballCoords.y < targetCoords.y + radius &&
      !ball.colision
    ) {
      // Capture success
      target.captured = true;
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
    const particleContainer = getElementById('particle-container');

    emitParticlesToElementEffect(
      ballElement,
      ball.getCurrentSize(),
      targetCoords,
      particleContainer,
      closingCaptureBall
    );
    fadeElementEffect(target.getElement());
  };

  const closingCaptureBall = () => {
    setElementImage(ball.getElement(), Resources.pikaballClosed);
    clearContainerElement('particle-container');
    ball.savePosition();

    dropElementEffect(ball.getElement(), () => {
      showCaptureResult();
    });
  };

  const showCaptureResult = () => {
    hideElement('capture-screen');
    hideElement('capture-ball-button-container');

    const captureBallElement = getElementById('capture-ball');
    shakeEffect(captureBallElement, 500);

    const ringRect = getFirstElement('ring-fill').getBoundingClientRect();
    const successRate = ((150 - ringRect.width) / 150) * target.getMaxSuccessRate();
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

    const confettiContainer = getElementById('capture-confetti');
    rainConfettiEffect(confettiContainer, () => {
      clearContainerElement(confettiContainer);
      captureSuccessCallback();
    });
  };

  const showEscapeAnimationAndContinue = () => {
    hideElement('capture-ball-button-container');
    hideElement('poof-container');
    poofEffect(getFirstElement('poof'), () => {
      hideElement('capture-screen');
      clearElementTransforms('poof');
      hideElement('poof-container');
      ball.resetBall();
      state.resetState();
    });
  };

  return {
    performTargetAttacks,
    checkBallColisions,
    pointerBall,
    throwBall
  };
};
