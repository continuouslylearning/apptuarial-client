export const SET_CLAIMS_SORT_FIELD = 'SET_CLAIMS_SORT_FIELD';
export const setClaimsSortField = field => ({
  type: SET_CLAIMS_SORT_FIELD,
  field
});

export const TOGGLE_CLAIMS_STATUS_FILTER = 'TOGGLE_STATUS_FILTER';
export const toggleStatusFilter = hide => ({
  type: TOGGLE_CLAIMS_STATUS_FILTER,
  hide
});

export const SET_CLAIMS_SORT_DIRECTION = 'SET_CLAIMS_SORT_DIRECTION';
export const setClaimsSortDirection = isAscending => ({
  type: SET_CLAIMS_SORT_DIRECTION,
  isAscending
});
