/* eslint-disable no-console */
import fetch from 'isomorphic-unfetch';
import { enableSpanner, disableSpanner } from './spanner';
import { sendTrackEvent } from './tracker';

const fetcher = async (...args) => {
  let result;
  let response;
  try {
    enableSpanner();
    response = await fetch(...args);
    result = await response.json();
    sendTrackEvent({ ...args, response, result });
  } catch (error) {
    console.error(error);
    sendTrackEvent({ ...args, response, error });
  } finally {
    disableSpanner();
  }
  return result;
};

export default fetcher;
