/* eslint-disable import/prefer-default-export */

export const arrayChunk = (array, chunk) => {
  const result = [];
  for (let i = 0, j = array.length; i < j; i += chunk) {
    result.push(array.slice(i, i + chunk));
  }
  return result;
};

export const querySeparator = (url) => {
  return url.includes('?') ? '&' : '?';
};

export const isBrowser = () => typeof window !== "undefined";
