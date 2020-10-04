import * as gtag from './gtag';

export const sendTrackEvent = (...args) => {
  gtag.event({
    action: getAction(...args),
    category: getCategory(...args),
    label: getLabel(...args),
  });
};

const getAction = (...args) => {
  return 'Action';
};

const getCategory = (...args) => {
  return 'Action';
};

const getLabel = (...args) => {
  return 'Action';
};
