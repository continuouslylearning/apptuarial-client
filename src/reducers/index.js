import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import { FETCH_POLICIES_SUCCESS } from '../actions/policies';
import { FETCH_CLAIMS_SUCCESS } from '../actions/claims';
import { policyListReducer, claimsListReducer } from './list-reducer';

export function policiesReducer(state = [], action){
  if(action.type === FETCH_POLICIES_SUCCESS){
    console.log(action, 'action');
    return action.policies.map(policy => ({
      ...policy,
      effectiveDate: new Date(policy.effectiveDate),
      expirationDate: new Date(policy.expirationDate)
    }));
  }
  return state;
}

export function claimsReducer(state = [], action){
  if(action.type === FETCH_CLAIMS_SUCCESS){
    return action.claims.map(claim => ({
      ...claim,
      accidentDate: new Date(claim.accidentDate),
      transactions: claim.transactions.map(transaction => ({
        ...transaction,
        transactionDate: new Date(transaction.transactionDate)
      }))
    }));
  }
  return state;
}

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  policies: policiesReducer,
  claims: claimsReducer,
  policyList: policyListReducer,
  claimsList: claimsListReducer
});

