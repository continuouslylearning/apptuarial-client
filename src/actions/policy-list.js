export const SET_POLICY_SORT_DIRECTION = 'SET_POLICY_SORT_DIRECTION';
export const SET_POLICY_SORT_FIELD = 'SET_POLICY_SORT_FIELD';
export const TOGGLE_POLICY_STATUS_FILTER = 'TOGGLE_POLICY_STATUS_FILTER';

export const setPolicySortDirection = isAscending => ({
  type: SET_POLICY_SORT_DIRECTION,
  isAscending
});

export const setPolicySortField = sortField => {
  return {
    type: SET_POLICY_SORT_FIELD,
    sortField
  };
};

export const togglePolicyFilterStatusFilter = hide => {
  return {
    type: TOGGLE_POLICY_STATUS_FILTER,
    hide
  };
};