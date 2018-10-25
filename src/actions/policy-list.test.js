import { 
  SET_POLICY_SORT_DIRECTION, 
  SET_POLICY_SORT_FIELD, 
  TOGGLE_POLICY_STATUS_FILTER,
  setPolicySortField,
  setPolicySortDirection,
  togglePolicyStatusFilter 
} from './policy-list';

describe('setPolicySortField', () => {
  it('should return the action', () => {
    const sortField = 'effectiveDate';
    const action = setPolicySortField(sortField);
    expect(action).toEqual({
      type: SET_POLICY_SORT_FIELD,
      sortField
    });
  });
});

describe('setPolicySortDirection', () => {
  it('should return the action', () => {
    const isAscending = false;
    const action = setPolicySortDirection(isAscending);
    expect(action).toEqual({
      type: SET_POLICY_SORT_DIRECTION,
      isAscending
    });
  });
});

describe('togglePolicyStatusFilter', () => {
  it('should return the action', () => {
    const hide = true;
    const action = togglePolicyStatusFilter(hide);
    expect(action).toEqual({
      type: TOGGLE_POLICY_STATUS_FILTER,
      hide
    });
  });
});