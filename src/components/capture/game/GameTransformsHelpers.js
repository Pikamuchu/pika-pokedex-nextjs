export const NO_TRANSFORMABLE_ELEMENTS = [
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
  'html',
  'main',
  'body',
  'section',
  'footer',
  'svg'
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