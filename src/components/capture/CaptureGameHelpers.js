/* eslint-disable func-names */
/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es.js';
import * as Hammer from 'hammerjs';

const Resources = {
  pikaball: '/static/images/pikaball.png',
  pikaballActive: '/static/images/pikaball-active.png',
  pikaballOpened: '/static/images/pikaball-opened.png',
  pikaballClosed: '/static/images/pikaball-closed.png'
};

const INITIAL_BALL_POSITION = 120;
const BALL_LAUNCH_MAX_TIME = 200;
const TARGET_DEFAULT_SIZE = 140;

export default function captureGame(pokemon, captureSuccessCallback) {
  const Screen = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  let maxVelocity = Screen.height * 0.009;

  window.onresize = () => {
    Screen.height = window.innerHeight;
    Screen.width = window.innerWidth;
    maxVelocity = Screen.height * 0.009;
    resetState();
  };

  const Ball = {
    id: 'ball',
    size: 60,
    x: 0,
    y: 0,
    inMotion: false,
    moveBall: (x, y) => {
      Ball.x = x;
      Ball.y = y;
      const BallElement = getElement(Ball.id);
      BallElement.style.top = `${Ball.y}px`;
      BallElement.style.left = `${Ball.x}px`;
    },
    moveBallDelta: (deltaX, deltaY) => {
      const x = Ball.x + deltaX;
      const y = Ball.y + deltaY;
      Ball.moveBall(x, y);
    },
    moveBallPointer: (centerX, centerY) => {
      const x = centerX - Ball.size / 2;
      const y = centerY - Ball.size / 2;
      Ball.moveBall(x, y);
    },
    getElement: () => {
      return getElement(Ball.id);
    },
    resetBall: () => {
      Ball.moveBall(Screen.width / 2 - Ball.size / 2, Screen.height - (Ball.size + INITIAL_BALL_POSITION));
      const BallElement = getElement(Ball.id);
      BallElement.style.transform = '';
      BallElement.style.height = `${Ball.size}px`;
      BallElement.style.width = `${Ball.size}px`;
      BallElement.style.backgroundImage = `url('${Resources.pikaball}')`;
      Ball.inMotion = false;
    },
    savePosition: () => {
      const ballEle = getElement(Ball.id);
      const ballRect = ballEle.getBoundingClientRect();
      ballEle.style.transform = '';
      ballEle.style.top = `${ballRect.top}px`;
      ballEle.style.left = `${ballRect.left}px`;
      ballEle.style.height = `${ballRect.width}px`;
      ballEle.style.width = `${ballRect.width}px`;
    }
  };

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
    const radius = getElement('target').getBoundingClientRect().width / 2;
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
    const particleContainer = getElement('particles');
    for (let i = 0; i < 50; i++) {
      const particleEle = document.createElement('div');
      particleEle.className = 'particle';
      particleEle.setAttribute('id', `particle-${i}`);
      particleLeft = getRandNum(-60, 60) + targetEle.x;
      particleEle.style.left = `${particleLeft}px`;
      particleRight = getRandNum(-60, 60) + targetEle.y;
      particleEle.style.top = `${particleRight}px`;
      particleEle.style.backgroundColor = palette[getRandNum(0, palette.length)];
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
      getElement('particles').innerHTML = '';
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
    const ballContainer = getElement('capture-screen');
    ballContainer.classList.toggle('hidden');

    const buttonContainer = getElement('capture-ball-button-container');
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

    const ringRect = getElement('ring-active').getBoundingClientRect();
    const successRate = ((150 - ringRect.width) / 150) * 100;
    const seed = getRandNum(0, 100);
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
    const captureBallButton = getElement('capture-ball-button');
    captureBallButton.classList.toggle('active');

    const captureStatus = getElement('capture-status');
    captureStatus.classList.toggle('hidden');

    makeItRainConfetti();

    captureSuccessCallback();
  };

  function showEscapeAnimationAndContinue() {
    const buttonContainer = getElement('capture-ball-button-container');
    buttonContainer.classList.toggle('hidden');

    const poofContainer = getElement('poof-container');
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
      const particleContainer = getElement('capture-confetti');
      const particleEle = document.createElement('div');
      particleEle.className = 'particle';
      particleEle.setAttribute('id', `particle-${i}`);
      const particleLeft = window.innerWidth / 2;
      particleEle.style.left = `${particleLeft}px`;
      const particleTop = window.innerHeight / 2;
      particleEle.style.top = `${particleTop}px`;
      particleEle.style.backgroundColor = getRandNum(0, 2) ? '#FFF' : '#4aa6fb';
      particleContainer.appendChild(particleEle);
      anime({
        targets: [`#particle-${i}`],
        translateX: {
          value: (getRandNum(0, 2) ? -1 : 1) * getRandNum(0, window.innerWidth / 2),
          delay: 100
        },
        translateY: {
          value: (getRandNum(0, 2) ? -1 : 1) * getRandNum(0, window.innerHeight / 2),
          delay: 100
        },
        opacity: {
          value: 0,
          duration: 800,
          easing: 'easeInSine'
        },
        complete: () => {
          getElement('capture-confetti').innerHTML = '';
        }
      });
    }
  };

  const hideEscapeAnimation = () => {
    const ballContainer = getElement('capture-screen');
    ballContainer.classList.toggle('hidden');
    const poofEle = getElement('poof');
    poofEle.style.transform = '';
    const poofContainer = getElement('poof-container');
    poofContainer.classList.toggle('hidden');
  };

  const resetState = () => {
    Ball.resetBall();
    getElement('target').style.opacity = 1;
    // Adjust Ring
    const ring = getElement('ring-fill');
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

  // Init pokemon
  const target = getElement('target');
  target.style.backgroundImage = `url('${pokemon.image}')`;
  if (pokemon.imageRatio > 1) {
    target.style.height = `${TARGET_DEFAULT_SIZE * pokemon.imageRatio}px`;
  }

  // Move pokemon through path
  const path = anime.path('.motion-path path');

  const targetMotion = anime({
    targets: '.target',
    translateX: path('x'),
    translateY: path('y'),
    rotate: 20,
    easing: 'easeInOutQuad',
    duration: 10000,
    loop: true,
    direction: 'alternate',
    autoplay: false
  });

  // Audio elements
  const gameAudio = {
    music: document.getElementById('game-music')
  };

  // Game start and pause function
  const pauseGame = () => {
    if (targetMotion) {
      targetMotion.pause();
    }
    if (gameAudio.music) {
      gameAudio.music.pause();
    }
  };

  const startGame = () => {
    if (targetMotion) {
      targetMotion.play();
    }
    if (gameAudio.music && gameAudio.music.paused) {
      gameAudio.music.muted = false;
      gameAudio.music.loop = true;
      gameAudio.music.play();
    }
  };

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

  // Gesture Bindings
  const touchElement = getElement('touch-layer');

  // Create a manager to manage the touch area
  const manager = new Hammer.Manager(touchElement);

  const pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
  const swipe = new Hammer.Swipe();

  swipe.recognizeWith(pan);

  // Ball pan events
  manager.add(pan);
  manager.on('pan', (event) => {
    if (event.center) {
      Ball.moveBallPointer(event.center.x, event.center.y);
    }
    if (event.isFinal) {
      setTimeout(() => {
        if (Ball.inMotion === false) {
          Ball.resetBall();
        }
      }, BALL_LAUNCH_MAX_TIME);
    }
  });

  // Ball swipe events
  manager.add(swipe);
  manager.on('swipe', (event) => {
    Ball.inMotion = true;
    const screenEle = getElement('screen');
    const screenPos = screenEle.getBoundingClientRect();

    const { angle, deltaY } = event;
    let velocity = Math.abs(event.velocity);
    if (velocity > maxVelocity) {
      velocity = maxVelocity;
    }

    // Determine the final position.
    const scalePercent = Math.log(velocity + 1) / Math.log(maxVelocity + 1);
    const movementY = deltaY;

    // Determine how far it needs to travel from the current position to the destination.
    const translateYValue = -0.75 * Screen.height * scalePercent;
    const translateXValue = -1 * (angle + 90) * (translateYValue / 100);

    anime.remove('.ring-fill');

    anime({
      targets: ['.ball'],
      translateX: {
        duration: 300,
        value: translateXValue,
        easing: 'easeOutSine'
      },
      translateY: {
        value: `${movementY * 1.25}px`,
        duration: 300,
        easing: 'easeOutSine'
      },
      scale: {
        value: 1 - 0.5 * scalePercent,
        easing: 'easeInSine',
        duration: 300
      },
      complete: () => {
        if (movementY < 0) {
          throwBall(movementY, translateXValue, scalePercent);
        } else {
          setTimeout(resetState, 400);
        }
      }
    });
  });

  // Initial Setup
  resetState();
}

const getElement = (className) => document.getElementsByClassName(className)[0];

const getCenterCoords = (elementId) => {
  const rect = getElement(elementId).getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
