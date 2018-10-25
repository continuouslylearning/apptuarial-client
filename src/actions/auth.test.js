import { SET_AUTH_TOKEN, setAuthToken, AUTH_REQUEST, authRequest, AUTH_REQUEST_ERROR, authRequestError, CLEAR_AUTH, clearAuth } from './auth';

describe('setAuthToken', () => {
  it('should return the action', () => {
    const authToken = 'authToken';
    const action = setAuthToken(authToken);
    expect(action).toEqual({
      type: SET_AUTH_TOKEN,
      authToken
    });
  });
});

describe('authRequest', () => {
  it('should return the action', () => {
    const action = authRequest();
    expect(action).toEqual({
      type: AUTH_REQUEST
    });
  });
});

describe('authRequestError', () => {
  it('should return the action', () => {
    const error = { 
      message: 'Error'
    };
    const action = authRequestError(error);
    expect(action).toEqual({
      type: AUTH_REQUEST_ERROR,
      error
    });
  });
});

describe('clearAuth', () => {
  it('should return the action', () => {
    const action = clearAuth();
    expect(action).toEqual({
      type: CLEAR_AUTH
    });
  });
});