import { API_BASE_URL } from '../config';

export const FETCH_POLICIES_SUCCESS = 'FETCH_POLICIES_SUCCESS';
export const fetchPoliciesSuccess = policies => ({
  type: FETCH_POLICIES_SUCCESS,
  policies
});

export const FETCH_POLICIES = 'FETCH_POLICIES';
export const fetchPolicies = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/api/policies`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}`}
  })
    .then(res => res.json())
    .then(policies => dispatch(fetchPoliciesSuccess(policies)));
};

export const ADD_POLICY = 'ADD_POLICY';
export const addPolicy = policy => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/policies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(policy)
  })
    .then(res => res.json())
    .catch(err => {
      return err;
    });
};

export const DELETE_POLICY = policyId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/api/policy/${policyId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => res.json())
    .catch(err => err);
};