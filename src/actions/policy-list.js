export const SET_POLICY_SORT_DIRECTION = 'SET_POLICY_SORT_DIRECTION';
export const SET_POLICY_SORT_FIELD = 'SET_POLICY_SORT_FIELD';
export const TOGGLE_POLICY_STATUS_FILTER = 'TOGGLE_POLICY_STATUS_FILTER';
export const POLICY_SEARCH = 'POLICY_SEARCH';

export const setPolicySortDirection = isAscending => ({
  type: SET_POLICY_SORT_DIRECTION,
  isAscending
});

export const setPolicySortField = sortField => ({
  type: SET_POLICY_SORT_FIELD,
  sortField
});

export const togglePolicyStatusFilter = hide => ({
  type: TOGGLE_POLICY_STATUS_FILTER,
  hide
});

export const policySearch = searchTerm => ({
  type: POLICY_SEARCH,
  searchTerm
});