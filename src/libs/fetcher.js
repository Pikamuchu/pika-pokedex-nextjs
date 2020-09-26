/* eslint-disable no-console */
import fetch from 'isomorphic-unfetch';
import { enableSpanner, disableSpanner } from './spanner';
import { sendTrackEvent } from './tracker';

const fetcher = async (...args) => {
  let res;
  try {
    enableSpanner();
    res = await fetch(...args);
    sendTrackEvent(...args, res);
  } catch (error) {
    console.error(error);
    sendTrackEvent(...args, res, error);
  } finally {
    disableSpanner();
  }
  return res.json();
};

export default fetcher;
