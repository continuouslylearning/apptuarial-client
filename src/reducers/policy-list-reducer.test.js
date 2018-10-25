import { setPolicySortDirection, setPolicySortField, togglePolicyStatusFilter } from '../actions/policy-list';
import { policyListReducer as reducer, initialPolicyListState as initialState } from './list-reducer';

describe('Policy List reducer', () => {
  it('should return initial state when state argument is undefined', () => {
    const state = undefined;
    const action = {
      type: '@@UNKWOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('should return current state when action type is unknown', () => {
    const state = {
      isAscending: false,
      sortField: 'effectiveDate',
      hide: false,
      searchTerm: '123456'
    };
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle the set sort field action', () => {
    const state = {
      isAscending: false,
      sortField: 'effectiveDate',
      hide: false,
      searchTerm: '123456'
    };
    const sortField = 'premium';
    const action = setPolicySortField(sortField);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      sortField
    });
  });

  it('should handle the set sort direction action', () => {
    const state = {
      isAscending: false,
      sortField: 'effectiveDate',
      hide: false,
      searchTerm: '123456'
    };
    const isAscending = true;
    const action = setPolicySortDirection(isAscending);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      isAscending
    });
  });

  it('should handle the toggle status filter action', () => {
    const state = {
      isAscending: false,
      sortField: 'effectiveDate',
      hide: false,
      searchTerm: '123456'
    };
    const hide = true;
    const action = togglePolicyStatusFilter(hide);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      ...state,
      hide
    });
  });
});