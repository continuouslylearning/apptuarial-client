import { API_BASE_URL } from '../config';
import { SubmissionError } from 'redux-form';
import { normalizeResponseError } from '../utils/utils';
export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = user => dispatch => {

  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseError(res));
};