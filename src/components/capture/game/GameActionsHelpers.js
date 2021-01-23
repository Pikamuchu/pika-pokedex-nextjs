import { Resources } from './GameResourcesHelpers';
import { getFirstElement } from './GameElementsHelpers';
import {
  getRandomNumber,
  isTransformableElement,
  randomTransform,
  emitBallColisionParticles
} from './GameEffectsHelpers';

export const createGameActions = (anime, ball, target, screen, state, captureSuccessCallback) => {
  const BALL_THROW_MAX_TIME = 200;

  const checkBallColisions = () => {
    if (!ball.colision) {
      const ballCoords = ball.getCenterCoords();
      const elements = document.elementsFromPoint(ballCoords.x, ballCoords.y);
      elements.forEach((element) => {
        if (isTransformableElement(element)) {
          console.log('Ball colision' + element);
          ball.colision = true;
          randomTransform(element);
          emitBallColisionParticles(anime, ball, element);
        }
      });
      // Restore ball after colision
      if (ball.colision) {
        const ballElement = ball.getElement();
        anime.remove(ballElement);
        anime({
          targets: [ballElement],
          opacity: {
            value: 0,
            delay: 800,
            easing: 'easeInSine'
          },
          complete: () => {
            ball.resetBall();
          }
        });
      }
    }
  };

  const moveBall = (coords, final) => {
    if (coords) {
      ball.moveBallPointer(coords.x, coords.y);
    }
    if (final) {
      setTimeout(() => {
        if (ball.inMotion === false) {
          ball.resetBall();
        }
      }, BALL_THROW_MAX_TIME);
    }
  };

  const moveElement = (element, coords, duration, scalePercent) => {
    const translateY = 0;
    const translateX = 0;
    anime({
      targets: [element],
      translateY: {
        value: translateY,
        duration: duration || 400,
        easing: 'linear'
      },
      translateX: {
        value: translateX,
        duration: duration || 400,
        easing: 'linear'
      },
      scale: {
        value: 1 - 0.25 * (scalePercent || 0),
        easing: 'easeInSine',
        duration: 400
      },
      complete: determineThrowResult
    });
  };

  const throwBall = (angle, deltaY, velocity) => {
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
    anime.remove('.ring-fill');
    anime({
      targets: [ball.getElement()],
      translateX: {
        value: translateXValue,
        duration: 300,
        easing: 'easeOutSine'
      },
      translateY: {
        value: movementY * 1.25,
        duration: 300,
        easing: 'easeOutSine'
      },
      scale: {
        value: 1 - 0.5 * scalePercent,
        duration: 300,
        easing: 'easeInSine'
      },
      complete: () => {
        if (movementY < 0) {
          throwBall2(movementY, translateXValue, scalePercent);
        } else {
          setTimeout(state.resetState, 400);
        }
      }
    });
  };

  const throwBall2 = (movementY, translateXValue, scalePercent) => {
    // Treat translations as fixed.
    ball.savePosition();
    anime({
      targets: [ball.getElement()],
      translateY: {
        value: movementY * -0.5,
        duration: 400,
        easing: 'easeInOutSine'
      },
      translateX: {
        value: -translateXValue * 0.25,
        duration: 400,
        easing: 'linear'
      },
      scale: {
        value: 1 - 0.25 * scalePercent,
        easing: 'easeInSine',
        duration: 400
      },
      complete: determineThrowResult
    });
  };

  const determineThrowResult = () => {
    // Determine hit-region
    const targetCoords = target.getCenterCoords();
    const ballCoords = ball.getCenterCoords();

    // Determine if the ball is touching the target.
    const radius = target.getRadius();
    if (
      ballCoords.x > targetCoords.x - radius &&
      ballCoords.x < targetCoords.x + radius &&
      ballCoords.y > targetCoords.y - radius &&
      ballCoords.y < targetCoords.y + radius
    ) {
      if (target.motion) {
        target.motion.pause();
      }
      ball.savePosition();
      const ballOrientation = ballCoords.x < targetCoords.x ? -1 : 1;
      anime({
        targets: [ball.getElement()],
        translateY: {
          value: -1.15 * radius,
          duration: 200,
          easing: 'linear'
        },
        translateX: {
          value: 1.15 * radius * ballOrientation,
          duration: 200,
          easing: 'linear'
        },
        scaleX: {
          value: ballOrientation,
          duration: 200
        },
        complete: () => {
          const ballElement = ball.getElement();
          ballElement.style.backgroundImage = `url('${Resources.pikaballOpened}')`;
          emitTargetParticlesToBall();
        }
      });
    } else {
      setTimeout(state.resetState, 400);
    }
  };

  const emitTargetParticlesToBall = () => {
    let particleLeft;
    let particleRight;
    const targetCoords = target.getCenterCoords();
    const ballElement = ball.getElement();
    const ballRect = ballElement.getBoundingClientRect();
    const palette = ['#E4D3A8', '#6EB8C0', '#FFF', '#2196F3'];
    const particleContainer = getFirstElement('particle-container');
    for (let i = 0; i < 50; i++) {
      const particleElement = document.createElement('div');
      particleElement.className = 'particle';
      particleElement.setAttribute('id', `particle-${i}`);
      particleLeft = getRandomNumber(-60, 60) + targetCoords.x;
      particleElement.style.left = `${particleLeft}px`;
      particleRight = getRandomNumber(-60, 60) + targetCoords.y;
      particleElement.style.top = `${particleRight}px`;
      particleElement.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
      particleContainer.appendChild(particleElement);
      anime({
        targets: [`#particle-${i}`],
        translateX: {
          value: ballRect.left - particleLeft,
          delay: 100 + i * 10
        },
        translateY: {
          value: ballRect.top + ball.size / 2 - particleRight,
          delay: 100 + i * 10
        },
        opacity: {
          value: 0,
          delay: 100 + i * 10,
          duration: 800,
          easing: 'easeInSine'
        }
      });
      anime({
        targets: ['.target'],
        opacity: {
          value: 0,
          delay: 200,
          easing: 'easeInSine'
        }
      });
    }
    setTimeout(() => {
      const ballElement = ball.getElement();
      ballElement.style.backgroundImage = `url('${Resources.pikaballClosed}')`;
      getFirstElement('particle-container').innerHTML = '';
      ball.savePosition();

      anime({
        targets: [ball.getElement()],
        translateY: {
          value: '200px',
          delay: 400,
          duration: 400,
          easing: 'linear'
        },
        complete: () => {
          ball.resetBall();
        }
      });
      setTimeout(() => {
        animateCaptureState();
        state.resetState();
      }, 750);
    }, 1000);
  };

  const animateCaptureState = () => {
    const ballContainer = getFirstElement('capture-screen');
    ballContainer.classList.toggle('hidden');

    const buttonContainer = getFirstElement('capture-ball-button-container');
    buttonContainer.classList.toggle('hidden');

    const duration = 500;
    anime({
      targets: ['.capture-ball'],
      rotate: 40,
      duration,
      easing: 'easeInOutBack',
      loop: true,
      direction: 'alternate'
    });

    const ringRect = getFirstElement('ring-active').getBoundingClientRect();
    const successRate = ((150 - ringRect.width) / 150) * 100;
    const seed = getRandomNumber(0, 100);
    setTimeout(() => {
      anime.remove('.capture-ball');

      if (seed < Math.floor(successRate)) {
        showCaptureSuccess();
      } else {
        showEscapeAnimationAndContinue();
      }
    }, duration * 6);
  };

  const showCaptureSuccess = () => {
    const captureBallButton = getFirstElement('capture-ball-button');
    captureBallButton.classList.toggle('active');

    const captureStatus = getFirstElement('capture-status');
    captureStatus.classList.toggle('hidden');

    makeItRainConfetti();

    captureSuccessCallback();
  };

  const showEscapeAnimationAndContinue = () => {
    const buttonContainer = getFirstElement('capture-ball-button-container');
    buttonContainer.classList.toggle('hidden');

    const poofContainer = getFirstElement('poof-container');
    poofContainer.classList.toggle('hidden');

    anime({
      targets: ['.poof'],
      scale: {
        value: 20,
        delay: 0,
        easing: 'linear',
        duration: 500
      },
      complete: () => {
        setTimeout(() => {
          hideEscapeAnimation();
        }, 500);
      }
    });
  };

  const makeItRainConfetti = () => {
    const particleContainer = getFirstElement('capture-confetti');
    for (let i = 0; i < 100; i++) {
      const particleElement = document.createElement('div');
      particleElement.className = 'particle';
      particleElement.setAttribute('id', `particle-${i}`);
      const particleLeft = window.innerWidth / 2;
      particleElement.style.left = `${particleLeft}px`;
      const particleTop = window.innerHeight / 2;
      particleElement.style.top = `${particleTop}px`;
      particleElement.style.backgroundColor = getRandomNumber(0, 2) ? '#FFF' : '#4aa6fb';
      particleContainer.appendChild(particleElement);
      anime({
        targets: [`#particle-${i}`],
        translateX: {
          value: (getRandomNumber(0, 2) ? -1 : 1) * getRandomNumber(0, window.innerWidth / 2),
          delay: 100
        },
        translateY: {
          value: (getRandomNumber(0, 2) ? -1 : 1) * getRandomNumber(0, window.innerHeight / 2),
          delay: 100
        },
        opacity: {
          value: 0,
          duration: 800,
          easing: 'easeInSine'
        },
        complete: () => {
          particleContainer.innerHTML = '';
        }
      });
    }
  };

  const hideEscapeAnimation = () => {
    const ballContainer = getFirstElement('capture-screen');
    ballContainer.classList.toggle('hidden');
    const poofEle = getFirstElement('poof');
    poofEle.style.transform = '';
    const poofContainer = getFirstElement('poof-container');
    poofContainer.classList.toggle('hidden');
  };

  return {
    checkBallColisions,
    moveBall,
    throwBall
  };
};
