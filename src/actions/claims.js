import { API_BASE_URL } from '../config';
import { SubmissionError } from 'redux-form';
import { normalizeResponseError } from '../utils/utils';

export const ADD_CLAIM = 'ADD_CLAIM';
export const addClaim = claim => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  return fetch(`${API_BASE_URL}/api/claims`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(claim)
  })
    .then(res => normalizeResponseError(res))
    .catch(err => Promise.reject(new SubmissionError({ _error: err.message })));
};

export const DELETE_CLAIM = 'DELETE_CLAIM';

export const deleteClaim = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/claims/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .catch(err => err);
};

export const FETCH_CLAIMS_SUCCESS = 'FETCH_CLAIMS_SUCCESS';
export const fetchClaimsSuccess = claims => ({
  type: FETCH_CLAIMS_SUCCESS,
  claims
});

export const fetchClaims = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  return fetch(`${API_BASE_URL}/api/claims`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => normalizeResponseError(res))
    .then(claims => dispatch(fetchClaimsSuccess(claims)));
};

export const UPDATE_CLAIM = 'UPDATE_CLAIM';
export const updateClaim = claim => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/api/claims/${claim.id}`, {
    method: 'PUT',
    headers: { 
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(claim)
  })
    .then(res => normalizeResponseError(res));
};