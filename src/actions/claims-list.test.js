import {
  SET_CLAIMS_SORT_DIRECTION, 
  SET_CLAIMS_SORT_FIELD, 
  TOGGLE_CLAIMS_STATUS_FILTER, 
  CLAIMS_SEARCH,
  searchClaims,
  toggleStatusFilter,
  setClaimsSortDirection, 
  setClaimsSortField, 
} from './claims-list';

describe('searchClaims', () => {
  it('should return the action', () => {
    const searchTerm = '123456';
    const action = searchClaims(searchTerm);
    expect(action).toEqual({
      type: CLAIMS_SEARCH,
      searchTerm
    });
  });
});

describe('toggleStatusFilter', () => {
  it('should return the action', () => {
    const hide = false;
    const action = toggleStatusFilter(hide);
    expect(action).toEqual({
      type: TOGGLE_CLAIMS_STATUS_FILTER,
      hide
    });
  });
});

describe('setClaimsSortDirection', () => {
  it('should return the action', () => {
    const isAscending = false;
    const action = setClaimsSortDirection(isAscending);
    expect(action).toEqual({
      type: SET_CLAIMS_SORT_DIRECTION,
      isAscending
    });
  });
});

describe('setClaimsSortField', () => {
  it('should return the action', () => {
    const sortField = 'accidentDate';
    const action = setClaimsSortField(sortField);
    expect(action).toEqual({
      type: SET_CLAIMS_SORT_FIELD,
      sortField
    });
  });
});