import anime from 'animejs/lib/anime.es.js';

import { getFirstElement, getRandomNumber, setTransform } from './GameUtils';

const NUM_COLISION_PARTICLES = 5;
const NO_TRANSFORMABLE_ELEMENTS = [
  '__next',
  'particles',
  'motion-path',
  'wrapper',
  'container',
  'touch-layer',
  'screen',
  'target',
  'ring',
  'ring-active',
  'ring-fill',
  'particle-container',
  'poof-container',
  'poof',
  'capture-confetti',
  'capture-ball',
  'capture-ball-button',
  'capture-ball-button-container',
  'html',
  'main',
  'body',
  'section',
  'footer',
  'svg',
  'div',
  'h1'
];

export const isTransformableElement = (element) => {
  const elementValues = [element.nodeName?.toLowerCase(), element.id, ...element.className?.toString().split(' ')];
  return !NO_TRANSFORMABLE_ELEMENTS.some((v) => elementValues.indexOf(v) >= 0);
};

export const randomTransform = (element) => {
  const rotation = getRandomNumber(-2, 2);
  const scale = 1;
  const skewX = getRandomNumber(-2, 2);
  const skewY = getRandomNumber(-2, 2);
  setTransform(element, rotation, scale, skewX, skewY);
};

export const emitBallColisionParticles = (ball, element) => {
  const ballCoords = ball.getCenterCoords();
  const colisionCoords = {
    x: ballCoords.x,
    y: ballCoords.y
  };
  const palette = ['#000000', '#FAD61D', '#E19720', '#F62D14', '#811E09'];
  const particleContainer = getFirstElement('particle-container');
  for (let i = 0; i < NUM_COLISION_PARTICLES; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    particleElement.style.left = `${colisionCoords.x}px`;
    particleElement.style.top = `${colisionCoords.y}px`;
    particleElement.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
    particleContainer.appendChild(particleElement);
    anime({
      targets: [`#particle-${i}`],
      translateX: {
        value: colisionCoords.x + getRandomNumber(-60, 60),
        delay: 100
      },
      translateY: {
        value: colisionCoords.y + getRandomNumber(-60, 60),
        delay: 100
      },
      opacity: {
        value: 0,
        delay: 100,
        duration: 800,
        easing: 'easeInSine'
      }
    });
  }
};

export const dropElementEffect = (element, completeCallback) => {
  anime({
    targets: [element],
    translateY: {
      value: '200px',
      delay: 400,
      duration: 400,
      easing: 'linear'
    },
    complete: completeCallback
  });
};

export const fadeElementEffect = (element) => {
  anime({
    targets: [element],
    opacity: {
      value: 0,
      delay: 200,
      easing: 'easeInSine'
    }
  });
};

export const emitParticlesToElementEffect = (element, elementSize, targetCoords, particleContainer) => {
  const elementRect = element.getBoundingClientRect();
  const palette = ['#E4D3A8', '#6EB8C0', '#FFF', '#2196F3'];
  for (let i = 0; i < 50; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    const particleLeft = getRandomNumber(-60, 60) + targetCoords.x;
    particleElement.style.left = `${particleLeft}px`;
    const particleRight = getRandomNumber(-60, 60) + targetCoords.y;
    particleElement.style.top = `${particleRight}px`;
    particleElement.style.backgroundColor = palette[getRandomNumber(0, palette.length)];
    particleContainer.appendChild(particleElement);
    anime({
      targets: [`#particle-${i}`],
      translateX: {
        value: elementRect.left - particleLeft,
        delay: 100 + i * 10
      },
      translateY: {
        value: elementRect.top + elementSize / 2 - particleRight,
        delay: 100 + i * 10
      },
      opacity: {
        value: 0,
        delay: 100 + i * 10,
        duration: 800,
        easing: 'easeInSine'
      }
    });
  }
};

export const shakeEffect = (element, duration) => {
  anime({
    targets: [element],
    rotate: 40,
    duration,
    easing: 'easeInOutBack',
    loop: true,
    direction: 'alternate'
  });
};

export const moveElementAsideEffect = (element, distance, orientation, completeCallback) => {
  anime({
    targets: [element],
    translateY: {
      value: -1.15 * distance,
      duration: 200,
      easing: 'linear'
    },
    translateX: {
      value: 1.15 * distance * orientation,
      duration: 200,
      easing: 'linear'
    },
    scaleX: {
      value: orientation,
      duration: 200
    },
    complete: completeCallback
  });
};

export const throwEffect1 = (element, translateXValue, movementY, scalePercent, completeCallback) => {
  anime({
    targets: [element],
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
    complete: completeCallback
  });
};

export const throwEffect2 = (element, movementY, translateXValue, scalePercent, determineThrowResult) => {
  anime({
    targets: [element],
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

export const removeElementAnimation = (element) => {
  anime.remove(element);
};

export const poofEffect = (poofElement, hideEscapeAnimation) => {
  anime({
    targets: [poofElement],
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

export const restoreBallAfterColision = (ball) => {
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
};

export const moveElementToCoords = (element, coords, duration, scalePercent, completeCallback) => {
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
    complete: completeCallback
  });
};

export const rainConfettiEffect = (container, completeCallback) => {
  for (let i = 0; i < 100; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    const particleLeft = window.innerWidth / 2;
    particleElement.style.left = `${particleLeft}px`;
    const particleTop = window.innerHeight / 2;
    particleElement.style.top = `${particleTop}px`;
    particleElement.style.backgroundColor = getRandomNumber(0, 2) ? '#FFF' : '#4aa6fb';
    container.appendChild(particleElement);
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
      complete: completeCallback
    });
  }
};

export const elementShrinkEffect = (element) => {
  anime({
    targets: [element],
    height: '5px',
    width: '5px',
    duration: 3000,
    loop: true,
    easing: 'linear'
  });
};

export const moveElementThroughPath = (element, path) => {
  const animePath = anime.path(path);
  return anime({
    targets: [element],
    translateX: animePath('x'),
    translateY: animePath('y'),
    rotate: 20,
    easing: 'easeInOutQuad',
    duration: 10000,
    loop: true,
    direction: 'alternate',
    autoplay: false
  });
};
