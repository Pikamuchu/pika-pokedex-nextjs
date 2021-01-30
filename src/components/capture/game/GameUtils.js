export const getElementById = (id) => document.getElementById(id);

export const getFirstElement = (className) => document.getElementsByClassName(className)[0];

export const getCenterCoords = (element) => {
  const rect = element?.getBoundingClientRect
    ? element.getBoundingClientRect()
    : getElementById(element)?.getBoundingClientRect();
  return (
    rect && {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  );
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
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

export const clearContainerElement = (element) => {
  const containerElement = typeof element === 'string' ? getFirstElement(element) : element;
  if (containerElement) {
    containerElement.innerHTML = '';
  }
};
