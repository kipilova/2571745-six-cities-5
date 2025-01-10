import axios, { AxiosInstance } from 'axios';
import store from '../store';
import { setAuthorizationStatusAction } from '../action';
import { AuthorizationStatus } from '../const';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_NAME = 'six-cities-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add interceptor for 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(
          setAuthorizationStatusAction(AuthorizationStatus.NoAuth),
        );
      }
      return Promise.reject(error);
    },
  );

  // Add token to headers if it exists
  const token = localStorage.getItem(TOKEN_NAME);
  if (token) {
    api.defaults.headers.common['X-Token'] = token;
  }

  return api;
};
