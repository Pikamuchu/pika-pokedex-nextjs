export const enableSpanner = () => isNode() && showSpanner(true);

export const disableSpanner = () => isNode() && showSpanner(false);

const isNode = () => typeof module !== 'undefined' && module.exports;

const showSpanner = (show) => {
  const spanner = getSpannerElement();
  if (show) return spanner && spanner.classList.add('show');
  return spanner && spanner.classList.remove('show');
};

const getSpannerElement = () => {
  const spanner = document.getElementsByClassName('spanner');
  return spanner && spanner[0];
};
