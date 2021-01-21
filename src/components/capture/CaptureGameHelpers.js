/* eslint-disable func-names */
/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es.js';
import * as Hammer from 'hammerjs';
import { Resources } from './game/GameResourcesHelpers';
import { createBall, createTarget, getElementById, getFirstElement, getCenterCoords } from './game/GameElementsHelpers';
import { getRandomNumber, randomTransform, isTransformableElement } from './game/GameTransformsHelpers';
import { createTouchManager } from './game/GameTouchHelpers';

export default function captureGame(pokemon, captureSuccessCallback) {
  const Screen = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  window.onresize = () => {
    Screen.height = window.innerHeight;
    Screen.width = window.innerWidth;
    resetState();
  };

  const Ball = createBall(Screen);

  const throwBall = (movementY, translateXValue, scalePercent) => {
    // Treat translations as fixed.
    Ball.savePosition();
    anime({
      targets: ['.ball'],
      translateY: {
        value: `${movementY * -0.5}px`,
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
    const targetCoords = getCenterCoords('target');
    const ballCoords = getCenterCoords('ball');

    // Determine if the ball is touching the target.
    const radius = getElementById('target').getBoundingClientRect().width / 2;
    if (
      ballCoords.x > targetCoords.x - radius &&
      ballCoords.x < targetCoords.x + radius &&
      ballCoords.y > targetCoords.y - radius &&
      ballCoords.y < targetCoords.y + radius
    ) {
      targetMotion.pause();
      Ball.savePosition();
      const ballOrientation = ballCoords.x < targetCoords.x ? -1 : 1;
      anime({
        targets: ['.ball'],
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
          const ball = Ball.getElement();
          ball.style.backgroundImage = `url('${Resources.pikaballOpened}')`;
          emitParticlesToPikaball();
        }
      });
    } else {
      setTimeout(resetState, 400);
    }
  };

  const emitParticlesToPikaball = () => {
    let particleLeft;
    let particleRight;
    const targetEle = getCenterCoords('target');
    const ballEle = Ball.getElement();
    const ballRect = ballEle.getBoundingClientRect();
    const palette = ['#E4D3A8', '#6EB8C0', '#FFF', '#2196F3'];
    const particleContainer = getFirstElement('particles');
    for (let i = 0; i < 50; i++) {
      const particleEle = document.createElement('div');
      particleEle.className = 'particle';
      particleEle.setAttribute('id', `particle-${i}`);
      particleLeft = getRandomNumber(-60, 60) + targetEle.x;
      particleEle.style.left = `${particleLeft}px`;
      particleRight = getRandomNumber(-60, 60) + targetEle.y;
      particleEle.style.top = `${particleRight}px`;
      particleEle.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
      particleContainer.appendChild(particleEle);
      anime({
        targets: [`#particle-${i}`],
        translateX: {
          value: ballRect.left - particleLeft,
          delay: 100 + i * 10
        },
        translateY: {
          value: ballRect.top + Ball.size / 2 - particleRight,
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
      const ball = Ball.getElement();
      ball.style.backgroundImage = `url('${Resources.pikaballClosed}')`;
      getFirstElement('particles').innerHTML = '';
      Ball.savePosition();

      anime({
        targets: ['.ball'],
        translateY: {
          value: '200px',
          delay: 400,
          duration: 400,
          easing: 'linear'
        },
        complete: () => {
          Ball.resetBall();
        }
      });
      setTimeout(() => {
        animateCaptureState();
        resetState();
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

  function showEscapeAnimationAndContinue() {
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
  }

  const makeItRainConfetti = () => {
    for (let i = 0; i < 100; i++) {
      const particleContainer = getFirstElement('capture-confetti');
      const particleEle = document.createElement('div');
      particleEle.className = 'particle';
      particleEle.setAttribute('id', `particle-${i}`);
      const particleLeft = window.innerWidth / 2;
      particleEle.style.left = `${particleLeft}px`;
      const particleTop = window.innerHeight / 2;
      particleEle.style.top = `${particleTop}px`;
      particleEle.style.backgroundColor = getRandomNumber(0, 2) ? '#FFF' : '#4aa6fb';
      particleContainer.appendChild(particleEle);
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
          getFirstElement('capture-confetti').innerHTML = '';
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

  // Ball colision logic
  function ballColisions() {
    const elements = document.elementsFromPoint(Ball.x, Ball.y);
    elements.forEach((element) => {
      if (isTransformableElement(element)) {
        randomTransform(element);
      }
    });
    if (isGameRunning() && isGameVisible()) {
      setTimeout(function () {
        ballColisions();
      }, 500);
    }
  }

  // Page visibility events
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        pauseGame();
      } else {
        startGame();
      }
    },
    false
  );

  // Init pokemon
  const target = createTarget(anime, pokemon);

  // Audio elements
  const gameAudio = {
    music: document.getElementById('game-music')
  };

  let gameRunning = 0;

  const isGameRunning = () => !!gameRunning;
  const isGameVisible = () => getElementById('target');

  const startGame = () => {
    gameRunning = 1;
    if (target.motion) {
      target.motion.play();
    }
    if (gameAudio.music && gameAudio.music.paused) {
      gameAudio.music.muted = false;
      gameAudio.music.loop = true;
      gameAudio.music.play();
    }
    ballColisions();
  };

  // Game start and pause function
  const pauseGame = () => {
    gameRunning = 0;
    if (target.motion) {
      target.motion.pause();
    }
    if (gameAudio.music) {
      gameAudio.music.pause();
    }
  };

  const resetState = () => {
    Ball.resetBall();
    getElementById('target').style.opacity = 1;
    // Adjust Ring
    const ring = getFirstElement('ring-fill');
    ring.style.height = '150px';
    ring.style.width = '150px';
    anime({
      targets: ['.ring-fill'],
      height: '5px',
      width: '5px',
      duration: 3000,
      loop: true,
      easing: 'linear'
    });
    startGame();
  };

  // Gesture Bindings
  createTouchManager(Hammer, anime, Ball, Screen, throwBall, resetState);

  // Initial Setup
  resetState();
}
