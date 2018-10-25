import reducer, { initialState } from './auth';
import { authRequest, authRequestError, authRequestSuccess, setAuthToken, clearAuth } from '../actions/auth';

describe('authReducer', () => {
  it('should return initial state if state argument isnt passed in', () => {
    const state = undefined;
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('should return current state given an unknown action type', () => {
    const state = {
      authToken: null,
      error: null,
      loading: true,
      currentUser: null
    };
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle the auth request action', () => {
    const state = {
      authToken: null,
      error: {
        message: 'Error'
      },
      loading: false,
      currentUser: null
    };
    const action = authRequest();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      loading: true,
      error: null
    });
  });

  it('should handle the set auth token action', () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const state = {
      authToken: null,
      error: null,
      loading: true,
      currentUser: null
    };
    const action = setAuthToken(authToken);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      authToken
    });
  });

  it('should handle the auth success action', () => {
    const currentUser = {
      username: 'anonymous'
    };
    const state = {
      authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      error: null,
      loading: true,
      currentUser: null
    };
    const action = authRequestSuccess(currentUser);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      loading: false,
      currentUser
    });
  });

  it('should handle the auth request error action', () => {
    const error = {
      message: 'Invalid password'
    };
    const state = {
      authToken: null,
      error: null,
      loading: true,
      currentUser: null
    };
    const action = authRequestError(error);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      loading: false,
      error
    });
  });

  it('should handle the clear auth action', () => {
    const state = {
      authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      error: null,
      loading: false,
      currentUser: { username: 'anonymous'}
    };
    const action = clearAuth();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      authToken: null,
      currentUser: null
    });
  });
});