import { SET_AUTH_TOKEN, setAuthToken, AUTH_REQUEST, authRequest, AUTH_REQUEST_ERROR, authRequestSuccess, authRequestError, CLEAR_AUTH, clearAuth, login, refresh } from './auth';
import { API_BASE_URL } from '../config';
import jwt from 'jsonwebtoken';

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

describe('Login', () => {
  it('should dispatch authRequestSuccess', () => {
    const JWT_SECRET = 'secret';
    const user = { username: 'anonymous'};
    const authToken = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    const res = {
      authToken
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return res;
        }
      })
    );

    const username = 'anonymous';
    const password = 'password';
    const dispatch = jest.fn();
    jest.mock('jwt-decode');
    return login(username, password)(dispatch)
      .then(() => {
        expect(dispatch.mock.calls.length).toBe(3);
        expect(dispatch.mock.calls[0][0]).toEqual(authRequest());
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        expect(dispatch.mock.calls[1][0]).toEqual(setAuthToken(res.authToken));
        expect(dispatch.mock.calls[2][0]).toEqual(authRequestSuccess(user));
      });
  });

});

describe('Refresh', () => {

  it('should call fetch and dispatch set auth token and auth request success', () => {
    const JWT_SECRET = 'secret';
    const user = { username: 'anonymous'};
    const oldAuthToken = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    const authToken = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    const res = {
      authToken
    };
  
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json(){
          return res;
        }
      })
    );
  
    const dispatch = jest.fn();
    const getState = jest.fn().mockImplementation(() => ({
      auth: {
        authToken: oldAuthToken
      }
    }));
  
    return refresh()(dispatch, getState)
      .then(() => {
        expect(dispatch.mock.calls.length).toBe(2);
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${oldAuthToken}`}
        });
        expect(dispatch.mock.calls[0][0]).toEqual(setAuthToken(authToken));
        expect(dispatch.mock.calls[1][0]).toEqual(authRequestSuccess(user));
      });

  });

});