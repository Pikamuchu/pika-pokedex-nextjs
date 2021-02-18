import { getRandomNumber, setTransform } from './GameUtils';

const COLLIDABLE_ELEMENT_CLASS = 'collidable';
const BOUNCING_ELEMENT_CLASS = 'bouncing';
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

export const findCollidableElement = (elements) => {
  return elements && elements.find(hasCollidableElement);
};

export const hasCollidableElement = (element) => {
  const classValues = getElementClassValues(element);
  return classValues && classValues.indexOf(COLLIDABLE_ELEMENT_CLASS) >= 0;
};

export const isBouncingElement = (element) => {
  const classValues = getElementClassValues(element);
  return classValues && classValues.indexOf(BOUNCING_ELEMENT_CLASS) >= 0;
};

export const getElementClassValues = (element) => {
  return element?.className?.toString().split(' ');
};

export const isTransformableElement = (element) => {
  const elementValues = [element.nodeName?.toLowerCase(), element.id, ...element.className?.toString().split(' ')];
  return !NO_TRANSFORMABLE_ELEMENTS.some((v) => elementValues.indexOf(v) >= 0);
};

export const elementColisionTransform = (elementColision, otherElements) => {
  randomTransform(elementColision);
  if (otherElements) {
    otherElements.forEach((element) => {
      if (isTransformableElement(element)) {
        randomTransform(element);
      }
    });
  }
};

export const randomTransform = (element) => {
  const rotation = getRandomNumber(-2, 2);
  const scale = 1;
  const skewX = getRandomNumber(-2, 2);
  const skewY = getRandomNumber(-2, 2);
  setTransform(element, rotation, scale, skewX, skewY);
};
