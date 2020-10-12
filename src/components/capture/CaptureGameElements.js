/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch';

const Resources = {
  pikaball: '/static/images/pikaball.png',
  pikaballActive: '/static/images/pikaball-active.png',
  pikaballOpened: '/static/images/pikaball-opened.png',
  pikaballClosed: '/static/images/pikaball-closed.png',
};

const INITIAL_BALL_POSITION = 120;
const BALL_LAUNCH_MAX_TIME = 200;

const Screen = {
  height: window.innerHeight,
  width: window.innerWidth,
};

let MAX_VELOCITY = Screen.height * 0.009;

window.onresize = () => {
  Screen.height = window.innerHeight;
  Screen.width = window.innerWidth;
  MAX_VELOCITY = Screen.height * 0.009;
  resetState();
};

const Ball = {
  id: 'ball',
  size: 50,
  x: 0,
  y: 0,
  inMotion: false,
  moveBall: (x, y) => {
    Ball.x = x;
    Ball.y = y;
    const BallElement = document.getElementById(Ball.id);
    BallElement.style.top = `${Ball.y}px`;
    BallElement.style.left = `${Ball.x}px`;
  },
  getElement: () => {
    return document.getElementById(Ball.id);
  },
  resetBall: () => {
    Ball.moveBall(Screen.width / 2 - Ball.size / 2, Screen.height - (Ball.size + INITIAL_BALL_POSITION));
    const BallElement = document.getElementById(Ball.id);
    BallElement.style.transform = '';
    BallElement.style.width = BallElement.style.height = `${Ball.size}px`;
    BallElement.style.backgroundImage = `url('${Resources.pikaball}')`;
    Ball.inMotion = false;
  },
  savePosition: () => {
    const ballEle = document.getElementById('ball');
    const ballRect = ballEle.getBoundingClientRect();
    ballEle.style.transform = '';
    ballEle.style.top = `${ballRect.top}px`;
    ballEle.style.left = `${ballRect.left}px`;
    ballEle.style.height = ballEle.style.width = `${ballRect.width}px`;
  },
};

function throwBall(movementY, translateXValue, scalePercent) {
  // Treat translations as fixed.
  Ball.savePosition();
  anime({
    targets: ['#ball'],
    translateY: {
      value: `${movementY * -0.5}px`,
      duration: 400,
      easing: 'easeInOutSine',
    },
    translateX: {
      value: -translateXValue * 0.25,
      duration: 400,
      easing: 'linear',
    },
    scale: {
      value: 1 - 0.25 * scalePercent,
      easing: 'easeInSine',
      duration: 400,
    },
    complete: determineThrowResult,
  });
}

function determineThrowResult() {
  // Determine hit-region
  const targetCoords = getCenterCoords('target');
  const ballCoords = getCenterCoords('ball');

  // Determine if the ball is touching the target.
  const radius = document.getElementById('target').getBoundingClientRect().width / 2;
  if (
    ballCoords.x > targetCoords.x - radius &&
    ballCoords.x < targetCoords.x + radius &&
    ballCoords.y > targetCoords.y - radius &&
    ballCoords.y < targetCoords.y + radius
  ) {
    Ball.savePosition();
    const ballOrientation = ballCoords.x < targetCoords.x ? -1 : 1;
    anime({
      targets: ['#ball'],
      translateY: {
        value: -1.15 * radius,
        duration: 200,
        easing: 'linear',
      },
      translateX: {
        value: 1.15 * radius * ballOrientation,
        duration: 200,
        easing: 'linear',
      },
      scaleX: {
        value: ballOrientation,
        duration: 200,
      },
      complete: () => {
        const ball = Ball.getElement();
        ball.style.backgroundImage = `url('${Resources.pikaballOpened}')`;
        emitParticlesToPikaball();
      },
    });
  } else {
    setTimeout(resetState, 400);
  }
}

function emitParticlesToPikaball() {
  let particleLeft;
  let particleRight;
  const particles = [];
  const targetEle = getCenterCoords('target');
  const ballEle = Ball.getElement();
  const ballRect = ballEle.getBoundingClientRect();
  const palette = ['#E4D3A8', '#6EB8C0', '#FFF', '#2196F3'];
  const particleContainer = document.getElementById('particles');
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
        delay: 100 + i * 10,
      },
      translateY: {
        value: ballRect.top + Ball.size / 2 - particleRight,
        delay: 100 + i * 10,
      },
      opacity: {
        value: 0,
        delay: 100 + i * 10,
        duration: 800,
        easing: 'easeInSine',
      },
    });
    anime({
      targets: ['#target'],
      opacity: {
        value: 0,
        delay: 200,
        easing: 'easeInSine',
      },
    });
  }
  setTimeout(() => {
    const ball = Ball.getElement();
    ball.style.backgroundImage = `url('${Resources.pikaballClosed}')`;
    document.getElementById('particles').innerHTML = '';
    Ball.savePosition();

    anime({
      targets: ['#ball'],
      translateY: {
        value: '200px',
        delay: 400,
        duration: 400,
        easing: 'linear',
      },
      complete: () => {
        Ball.resetBall();
      },
    });
    setTimeout(() => {
      animateCaptureState();
      resetState();
    }, 750);
  }, 1000);
}

function animateCaptureState() {
  const ballContainer = document.getElementById('capture-screen');
  ballContainer.classList.toggle('hidden');

  const duration = 500;
  anime({
    targets: ['#capture-ball'],
    rotate: 40,
    duration,
    easing: 'easeInOutBack',
    loop: true,
    direction: 'alternate',
  });

  const ringRect = document.getElementById('ring-active').getBoundingClientRect();
  const successRate = ((150 - ringRect.width) / 150) * 100;
  const seed = getRandNum(0, 100);
  setTimeout(() => {
    anime.remove('#capture-ball');

    if (seed < Math.floor(successRate)) {
      const captureBall = document.getElementById('capture-ball');
      const buttonContainer = document.getElementById('capture-ball-button-container');
      buttonContainer.classList.toggle('hidden');

      // Captured
      captures.push(pokemon.id);
      postCapture(captures, mutate, revalidate);

      // Captured animation
      const captureStatus = document.getElementById('capture-status');
      captureStatus.classList.toggle('hidden');
      captureStatus.innerHTML = `You caught ${pokemon.name}!`;
      makeItRainConfetti();

      /*
        anime({
          targets: ['#capture-ball-button-container'],
          opacity: {
            value: 0,
            duration: 800,
            easing: 'easeInSine',
          },
          complete: () => {
            setTimeout(() => {
              const ballContainer = document.getElementById('capture-screen');
              ballContainer.classList.toggle('hidden');
              const buttonContainer = document.getElementById('capture-ball-button-container');
              buttonContainer.classList.toggle('hidden');
              buttonContainer.style.opacity = '';
              document.getElementById('capture-status').classList.toggle('hidden');
            }, 800);
          },
        });
*/
    } else {
      const poofContainer = document.getElementById('poof-container');
      poofContainer.classList.toggle('hidden');

      const captureStatus = document.getElementById('capture-status');
      captureStatus.innerHTML = `${pokemon.name} Escaped!`;
      captureStatus.classList.toggle('hidden');

      anime({
        targets: ['#poof'],
        scale: {
          value: 20,
          delay: 400,
          easing: 'linear',
          duration: 600,
        },
        complete: () => {
          const ballContainer = document.getElementById('capture-screen');
          ballContainer.classList.toggle('hidden');

          const poofEle = document.getElementById('poof');
          poofEle.style.transform = '';
          const poofContainer = document.getElementById('poof-container');
          poofContainer.classList.toggle('hidden');

          const captureStatus = document.getElementById('capture-status');
          captureStatus.classList.toggle('hidden');
        },
      });
    }
  }, duration * 6);
}

function makeItRainConfetti() {
  for (let i = 0; i < 100; i++) {
    const particleContainer = document.getElementById('capture-confetti');
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
        delay: 100,
      },
      translateY: {
        value: (getRandNum(0, 2) ? -1 : 1) * getRandNum(0, window.innerHeight / 2),
        delay: 100,
      },
      opacity: {
        value: 0,
        duration: 800,
        easing: 'easeInSine',
      },
      complete: () => {
        document.getElementById('capture-confetti').innerHTML = '';
      },
    });
  }
}

function resetState() {
  Ball.resetBall();
  document.getElementById('target').style.opacity = 1;
  // Adjust Ring
  const ring = document.getElementById('ring-fill');
  ring.style.height = '150px';
  ring.style.width = '150px';
  anime({
    targets: ['#ring-fill'],
    height: '5px',
    width: '5px',
    duration: 3000,
    loop: true,
    easing: 'linear',
  });
}

function getCenterCoords(elementId) {
  const rect = document.getElementById(elementId).getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
