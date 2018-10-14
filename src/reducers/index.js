import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import { FETCH_POLICIES_SUCCESS } from '../actions/policies';

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

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  policies: policiesReducer
});

