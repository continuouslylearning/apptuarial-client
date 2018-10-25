import { policiesReducer as reducer } from './index';
import { fetchPoliciesSuccess } from '../actions/policies';

describe('Policies reducer', () => {
  it('should return the initial state when state argument is undefined', () => {
    const initialState = [];
    const state = undefined;
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('should return current state if action is unkwown', () => {
    const state = [{
      id: '5bc4f03654190e1d702ea470',
      exposures: 1, 
      effectiveDate: new Date(), 
      expirationDate: new Date(), 
      premium: 4000, 
      userId: '5bc174e565a2e61e44079101'
    }];
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle fetch policies success action', () => {
    const state = [];
    const policies = [{
      id: '5bc4f03654190e1d702ea470',
      exposures: 1, 
      effectiveDate: new Date(), 
      expirationDate: new Date(), 
      premium: 4000, 
      userId: '5bc174e565a2e61e44079101'
    }];

    const action = fetchPoliciesSuccess(policies);
    const newState = reducer(state, action);
    expect(newState).toEqual(policies);
  });
});