/* eslint-disable no-console */
import fetch from 'isomorphic-unfetch';
import { enableSpanner, disableSpanner } from './spanner';
import { sendTrackEvent } from './tracker';

const postData = async (url, data) => {
  let result;
  let response;
  try {
    enableSpanner();
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    result = await response.json();
    sendTrackEvent({ url, data, response, result });
  } catch (error) {
    console.error(error);
    sendTrackEvent({ url, data, response, error });
  } finally {
    disableSpanner();
  }
  return result;
};

export default postData;
