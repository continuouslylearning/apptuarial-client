import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import { FETCH_POLICIES_SUCCESS } from '../actions/policies';
import { FETCH_CLAIMS_SUCCESS } from '../actions/claims';

function policiesReducer(state = [], action){
  switch(action.type){
  case FETCH_POLICIES_SUCCESS:{
    return action.policies.map(policy => ({
      ...policy,
      effectiveDate: new Date(policy.effectiveDate),
      expirationDate: new Date(policy.expirationDate)
    }));
  }
  default: {
    return state;
  }
  }
}

function claimsReducer(state = [], action){
  if(action.type === FETCH_CLAIMS_SUCCESS){
    return {
      ...state,
      claims: action.claims
    };
  }
  return state;
}

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  policies: policiesReducer,
  claims: claimsReducer
});

