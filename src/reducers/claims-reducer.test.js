import { claimsReducer as reducer } from './index';
import { fetchClaimsSuccess } from '../actions/claims';

describe('Claims reducer', () => {
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
      policyId: '5bc4f03654190e1d702ea47a',
      status: 'CLOSED',
      accidentDate: new Date(), 
      expirationDate: new Date(), 
      paidLoss: 4000, 
      userId: '5bc174e565a2e61e44079101'
    }];
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle fetch claims success action', () => {
    const state = [];
    const claims = [{
      id: '5bc4f03654190e1d702ea470',
      policyId: '5bc4f03654190e1d702ea47a',
      status: 'CLOSED',
      accidentDate: new Date(), 
      expirationDate: new Date(), 
      paidLoss: 4000, 
      transactions: [],
      userId: '5bc174e565a2e61e44079101'
    }];

    const action = fetchClaimsSuccess(claims);
    const newState = reducer(state, action);
    expect(newState).toEqual(claims);
  });
});