import axios from 'axios';
import CONFIG from '../config';
import { getToken } from '@/utils/cookies';

let authserviceInited: boolean = false;

const loadToken = () => {
  const tokenInCookie = getToken();
  return tokenInCookie;
};

const initToken = () => {
  if (authserviceInited) {
    return new Promise(resolve => resolve());
  }

  const token = loadToken();
  axios.defaults.baseURL = CONFIG.baseUrl;
  axios.defaults.headers.common.Authorization = token;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // const requests = [];
  // requests.push(userServiceInstance.getUserInfo());
  // requests.push(ruleServiceInstance.queryPermissions());

  // return axios.all(requests).then(() => {
  //   authserviceInited = true;
  // });
  return new Promise(resolve => resolve()).then(() => {
    authserviceInited = true;
  });
};

export default {
  loadToken,
  initToken
};
