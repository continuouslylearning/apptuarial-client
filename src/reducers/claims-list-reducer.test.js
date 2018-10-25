import { setClaimsSortField, setClaimsSortDirection, toggleStatusFilter } from '../actions/claims-list';
import { claimsListReducer, initialClaimsListState} from './list-reducer';

describe('Claims List reducer', () => {
  it('should return initial state when state argument is undefined', () => {
    const state = undefined;
    const action = {
      type: '@@UNKWOWN'
    };
    const newState = claimsListReducer(state, action);
    expect(newState).toEqual(initialClaimsListState);
  });

  it('should return current state when action type is unknown', () => {
    const state = {
      isAscending: false,
      sortField: 'accidentDate',
      hide: false,
      searchTerm: '123456'
    };
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = claimsListReducer(state, action);
    expect(newState).toEqual(state);
  });

  it('should handle the set sort field action', () => {
    const state = {
      isAscending: false,
      sortField: 'accidentDate',
      hide: false,
      searchTerm: '123456'
    };
    const sortField = 'paidLoss';
    const action = setClaimsSortField(sortField);
    const newState = claimsListReducer(state, action);
    expect(newState).toEqual({
      ...state,
      sortField
    });
  });

  it('should handle the set sort direction action', () => {
    const state = {
      isAscending: false,
      sortField: 'accidentDate',
      hide: false,
      searchTerm: '123456'
    };
    const isAscending = true;
    const action = setClaimsSortDirection(isAscending);
    const newState = claimsListReducer(state, action);
    expect(newState).toEqual({
      ...state,
      isAscending
    });
  });

  it('should handle the toggle status filter action', () => {
    const state = {
      isAscending: false,
      sortField: 'accidentDate',
      hide: false,
      searchTerm: '123456'
    };
    const hide = true;
    const action = toggleStatusFilter(hide);
    const newState = claimsListReducer(state, action);
    expect(newState).toEqual({
      ...state,
      hide
    });
  });
});
