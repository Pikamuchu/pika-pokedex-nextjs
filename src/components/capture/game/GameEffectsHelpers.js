import { getFirstElement, getCenterCoords } from './GameElementsHelpers';

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
  'div'
];

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomTransform = (element) => {
  const rotation = getRandomNumber(-2, 2);
  const scale = 1;
  const skewX = getRandomNumber(-2, 2);
  const skewY = getRandomNumber(-2, 2);
  setTransform(element, rotation, scale, skewX, skewY);
};

export const setTransform = (element, rotation, scale, skewX, skewY) => {
  console.log(`transform: id ${element.id} class ${element.className}`);
  const transformString = `rotate(${rotation}deg ) scale(${scale}) skewX(${skewX}deg ) skewY(${skewY}deg )`;
  element.style.webkitTransform = transformString;
  element.style.MozTransform = transformString;
  element.style.msTransform = transformString;
  element.style.OTransform = transformString;
  element.style.transform = transformString;
};

export const isTransformableElement = (element) => {
  const elementValues = [element.nodeName?.toLowerCase(), element.id, ...element.className?.toString().split(' ')];
  return !NO_TRANSFORMABLE_ELEMENTS.some((v) => elementValues.indexOf(v) >= 0);
};

export const emitBallColisionParticles = (anime, ball, element) => {
  let particleLeft;
  let particleRight;
  const elementCoords = getCenterCoords(element);
  const ballCoords = ball.getCenterCoords();
  const colisionCoords = {
    x: ballCoords.x,
    y: ballCoords.y
  };
  const ballElement = ball.getElement();
  const ballRect = ballElement.getBoundingClientRect();
  const palette = ['#000000', '#FAD61D', '#E19720', '#F62D14', '#811E09'];
  const particleContainer = getFirstElement('particle-container');
  for (let i = 0; i < NUM_COLISION_PARTICLES; i++) {
    const particleElement = document.createElement('div');
    particleElement.className = 'particle';
    particleElement.setAttribute('id', `particle-${i}`);
    particleLeft = getRandomNumber(-60, 60) + colisionCoords.x;
    particleElement.style.left = `${particleLeft}px`;
    particleRight = getRandomNumber(-60, 60) + colisionCoords.y;
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
  }
  /*
  anime({
    targets: ['.ball'],
    opacity: {
      value: 0,
      delay: 200,
      easing: 'easeInSine'
    }
  });
  */
  setTimeout(() => {
    ball.resetBall();
  }, 1000);
};
