/* eslint-disable func-names */
/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es.js';
import * as Hammer from 'hammerjs';

const Resources = {
  pikaball: '/static/images/pikaball.png',
  pikaballActive: '/static/images/pikaball-active.png',
  pikaballOpened: '/static/images/pikaball-opened.png',
  pikaballClosed: '/static/images/pikaball-closed.png',
};

const INITIAL_BALL_POSITION = 120;
const BALL_LAUNCH_MAX_TIME = 200;

export default function captureGame(pokemon, captureSuccessCallback) {
  const Screen = {
    height: window.innerHeight,
    width: window.innerWidth,
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
      BallElement.style.height = `${Ball.size}px`;
      BallElement.style.width = `${Ball.size}px`;
      BallElement.style.backgroundImage = `url('${Resources.pikaball}')`;
      Ball.inMotion = false;
    },
    savePosition: () => {
      const ballEle = document.getElementById('ball');
      const ballRect = ballEle.getBoundingClientRect();
      ballEle.style.transform = '';
      ballEle.style.top = `${ballRect.top}px`;
      ballEle.style.left = `${ballRect.left}px`;
      ballEle.style.height = `${ballRect.width}px`
      ballEle.style.width = `${ballRect.width}px`;
    },
  };

  const throwBall = (movementY, translateXValue, scalePercent) => {
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
  };

  const determineThrowResult = () => {
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
  };

  const emitParticlesToPikaball = () => {
    let particleLeft;
    let particleRight;
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
  };

  const animateCaptureState = () => {
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
        showCaptureSuccess();

      } else {
        showEscapeAnimationAndContinue();
      }
    }, duration * 6);
  };

  const showCaptureSuccess = () => {
    const buttonContainer = document.getElementById('capture-ball-button-container');
    buttonContainer.classList.toggle('hidden');

    const captureStatus = document.getElementById('capture-status');
    captureStatus.classList.toggle('hidden');

    makeItRainConfetti();

    captureSuccessCallback();

  /*
    const captureBall = document.getElementById('capture-ball');
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
  };

  function showEscapeAnimationAndContinue() {
    const poofContainer = document.getElementById('poof-container');
    poofContainer.classList.toggle('hidden');
    const captureStatus = document.getElementById('capture-status');
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
        hideEscapeAnimation();
      },
    });
  }

  const makeItRainConfetti = () => {
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
  };

  const hideEscapeAnimation = () => {
    const ballContainer = document.getElementById('capture-screen');
    ballContainer.classList.toggle('hidden');
    const poofEle = document.getElementById('poof');
    poofEle.style.transform = '';
    const poofContainer = document.getElementById('poof-container');
    poofContainer.classList.toggle('hidden');
    const captureStatus = document.getElementById('capture-status');
    captureStatus.classList.toggle('hidden');
  }

  const resetState = () => {
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
  };

  // Initial Setup
  resetState();

  // Init pokemon
  const target = document.getElementById('target');
  target.style.backgroundImage = `url('${pokemon.image}')`;
  anime({
    targets: ['#target'],
    rotate: 20,
    duration: 800,
    loop: true,
    easing: 'easeInOutQuad',
    direction: 'alternate',
  });

  /* Gesture Bindings */
  const touchElement = document.getElementById('touch-layer');

/*
  const touchRegion = new ZingTouch.Region(touchElement);
  const CustomSwipe = new ZingTouch.Swipe({
    escapeVelocity: 0.1,
  });

  const CustomPan = new ZingTouch.Pan();
  const endPan = CustomPan.end;
  CustomPan.end = function (inputs) {
    setTimeout(() => {
      if (Ball.inMotion === false) {
        Ball.resetBall();
      }
    }, BALL_LAUNCH_MAX_TIME);
    return endPan.call(this, inputs);
  };
*/

  // Create a manager to manager the element
  const manager = new Hammer.Manager(touchElement);
  const Swipe = new Hammer.Swipe();
  manager.add(Swipe);

/*
  // Declare global variables to swiped correct distance
  var deltaX = 0;
  var deltaY = 0;

  // Subscribe to a desired event
  manager.on('swipe', function(e) {
    deltaX = deltaX + e.deltaX;
    var direction = e.offsetDirection;
    var translate3d = 'translate3d(' + deltaX + 'px, 0, 0)';

    if (direction === 4 || direction === 2) {
      e.target.innerText = deltaX;
      e.target.style.transform = translate3d;
    }
  });
*/

//  touchRegion.bind(touchElement, CustomPan, (e) => {
//    Ball.moveBall(e.detail.events[0].x - Ball.size / 2, e.detail.events[0].y - Ball.size / 2);
//  });

//  touchRegion.bind(touchElement, CustomSwipe, (e) => {
  manager.on('swipe', (event) => {
    Ball.inMotion = true;
    const screenEle = document.getElementById('screen');
    const screenPos = screenEle.getBoundingClientRect();

    const { angle, deltaY } = event;
    let velocity = Math.abs(event.velocity);
    if (velocity > maxVelocity) {
      velocity = maxVelocity;
    }

    console.log(`Swipe event angle ${angle} deltaY ${deltaY} velocity ${velocity}`);

    // Determine the final position.
    const scalePercent = Math.log(velocity + 1) / Math.log(maxVelocity + 1);
    //const destinationY = Screen.height - Screen.height * scalePercent + screenPos.top;
    const movementY = deltaY;// destinationY - e.detail.events[0].y;

    // Determine how far it needs to travel from the current position to the destination.
    const translateYValue = -0.75 * Screen.height * scalePercent;
    const translateXValue = -1 * (angle + 90) * (translateYValue / 100);

    console.log(`translateYValue ${translateYValue} translateXValue ${translateXValue}`);

    anime.remove('#ring-fill');

    anime({
      targets: ['#ball'],
      translateX: {
        duration: 300,
        value: translateXValue,
        easing: 'easeOutSine',
      },
      translateY: {
        value: `${movementY * 1.25}px`,
        duration: 300,
        easing: 'easeOutSine',
      },
      scale: {
        value: 1 - 0.5 * scalePercent,
        easing: 'easeInSine',
        duration: 300,
      },
      complete: () => {
        if (movementY < 0) {
          throwBall(movementY, translateXValue, scalePercent);
        } else {
          setTimeout(resetState, 400);
        }
      },
    });
  });
}

const getCenterCoords = (elementId) => {
  const rect = document.getElementById(elementId).getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
