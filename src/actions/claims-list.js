export const SET_CLAIMS_SORT_FIELD = 'SET_CLAIMS_SORT_FIELD';
export const setClaimsSortField = field => ({
  type: SET_CLAIMS_SORT_FIELD,
  field
});

export const TOGGLE_STATUS_FILTER = 'TOGGLE_STATUS_FILTER';
export const toggleStatusFilter = checked => ({
  type: TOGGLE_STATUS_FILTER,
  checked
});

export const SET_CLAIMS_SORT_DIRECTION = 'SET_CLAIMS_SORT_DIRECTION';
export const setClaimsSortDirection = isAscending => ({
  type: SET_CLAIMS_SORT_DIRECTION,
  isAscending
});

export const DISPLAY_CLAIM = 'DISPLAY_CLAIM';
export const displayClaim = displayId => ({
  type: DISPLAY_CLAIM,
  displayId
});