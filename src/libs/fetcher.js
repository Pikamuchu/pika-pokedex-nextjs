import fetch from 'isomorphic-unfetch';

const fetcher = async (...args) => {
  enableSpanner();
  const res = await fetch(...args);
  disableSpanner();
  return res.json();
};

const enableSpanner = () => isNode() && showSpanner(true);

const disableSpanner = () => isNode() && showSpanner(false);

const isNode = () => typeof module !== 'undefined' && module.exports;

const showSpanner = (show) => {
  const spanner = getSpannerElement();
  if (show) return spanner && spanner.classList.add('show');
  return spanner && spanner.classList.remove('show');
};

const getSpannerElement = () => {
  const spanner = document.getElementsByClassName('spanner');
  return spanner && spanner[0];
}

export default fetcher;
