import { API_BASE_URL } from '../config';
import { SubmissionError } from 'redux-form';

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
    .then(res => {
      if(!res.ok){
        return Promise.reject(new Error('error'));
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      return Promise.reject(new SubmissionError({ _error: 'error'}));
    });
};

export const FETCH_CLAIMS_SUCCESS = 'FETCH_CLAIMS_SUCCESS';
const fetchClaimsSuccess = claims => ({
  type: FETCH_CLAIMS_SUCCESS,
  claims
});

export const fetchClaims = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  
  return fetch(`${API_BASE_URL}/api/claims`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => res.json())
    .then(claims => dispatch(fetchClaimsSuccess(claims)));
};