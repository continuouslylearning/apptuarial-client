import { TOGGLE_CHECKBOX, SET_DIRECTION, SET_FILTER} from '../actions/filter';

const initialState = {
  filter: 'effective',
  checked: false,
  ascending: false,
};

export default function rootReducer(state = initialState, action){
  return {
    filter: filterReducer(state.filter, action),
    checked: checkedReducer(state.checked, action),
    ascending: directionReducer(state.ascending, action)
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
  if(action.type === SET_DIRECTION){
    console.log(action.ascending);
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