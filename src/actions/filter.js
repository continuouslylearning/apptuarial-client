export const SET_FILTER = 'SET_FILTER';
export const setFilter = filter => ({
  type: SET_FILTER,
  filter
});

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const toggleCheckbox = checked => ({
  type: TOGGLE_CHECKBOX,
  checked
});

export const SET_DIRECTION = 'SET_DIRECTION';
export const setDirection = ascending => ({
  type: SET_DIRECTION,
  ascending
});

export const DISPLAY_POLICY = 'DISPLAY_POLICY';
export const displayPolicy = displayedPolicy => ({
  type: DISPLAY_POLICY,
  displayedPolicy
});