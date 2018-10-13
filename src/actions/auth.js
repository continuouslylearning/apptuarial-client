import { API_BASE_URL } from '../config';
import jwtDecode from 'jwt-decode';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const authRequestSuccess = currentUser => ({
  type: AUTH_REQUEST_SUCCESS,
  currentUser
});

export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const authRequestError = error => ({
  type: AUTH_REQUEST_ERROR,
  error
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return fetch(`${API_BASE_URL}/auth/login`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(({authToken}) => {
      const currentUser = jwtDecode(authToken).user;
      dispatch(setAuthToken(authToken));
      dispatch(authRequestSuccess(currentUser));
    })
    .catch(err => dispatch(authRequest(err)));
};