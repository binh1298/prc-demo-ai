import Axios from 'axios';
import objectAssign from 'object-assign';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '82009d58a6be4036b61b26b0d492255f'
  };
};

export const request = async (endpoint, method, headers = {}, params = {}, body = {}) => {
  let response;
  try {
    return response = await Axios({
      url: endpoint,
      method: method,
      headers: objectAssign(getHeaders(), headers),
      params: objectAssign(params),
      data: body,
    });
  } catch (error) {
    return error;
  }
};

export const post = (endpoint, body = {}, params = {}, headers = {}) => {
  return request(endpoint, 'POST', headers, params, body);
};
