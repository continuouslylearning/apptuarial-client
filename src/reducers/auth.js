import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_ERROR, CLEAR_AUTH, SET_AUTH_TOKEN } from '../actions/auth';

const initialState = {
  error: null, 
  loading: false,
  authToken: null
};

export default function(state = initialState, action){
  switch(action.type){

  case AUTH_REQUEST: {
    return {
      ...state,
      loading: true,
      error: false
    };
  }
  case SET_AUTH_TOKEN: {
    return {
      ...state,
      loading: false,
      authToken: action.authToken
    };
  }
  case AUTH_REQUEST_SUCCESS: {
    return {
      ...state,
      loading: false,
      currentUser: action.currentUser
    };
  }
  case AUTH_REQUEST_ERROR:{
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }
  case CLEAR_AUTH: {
    return {
      ...state,
      currentUser: null,
      authToken: null
    };
  }
  default: {
    return state;
  }

  }
}