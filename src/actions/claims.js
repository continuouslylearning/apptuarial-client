import { API_BASE_URL } from '../config';

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