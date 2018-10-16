import { TOGGLE_CHECKBOX, SET_DIRECTION, SET_FILTER, DISPLAY_POLICY} from '../actions/filter';

const initialState = {
  filter: 'effective',
  checked: false,
  ascending: false,
  displayedPolicy: null
};

export default function rootReducer(state = initialState, action){
  return {
    filter: filterReducer(state.filter, action),
    checked: checkedReducer(state.checked, action),
    ascending: directionReducer(state.ascending, action),
    displayedPolicy: displayReducer(state.displayedPolicy, action)
  };
}

function checkedReducer(state, action){
  if(action.type === TOGGLE_CHECKBOX){
    return action.checked;
  } else {
    return state;
  }
}

function directionReducer(state, action){
  if(action.type === SET_DIRECTION) {
    return action.ascending;
  } else {
    return state;
  }
}

function filterReducer(state, action){
  if(action.type === SET_FILTER){
    return action.filter;
  } else {
    return state;
  }
}

function displayReducer(state, action){
  if(action.type === DISPLAY_POLICY){
    return action.displayedPolicy;
  } else {
    return state;
  }
}