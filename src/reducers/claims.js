import { SET_CLAIMS_SORT_DIRECTION, SET_CLAIMS_SORT_FIELD, TOGGLE_STATUS_FILTER, DISPLAY_CLAIM } from '../actions/claims-list';

const initialState = {
  isAscending: false,
  sortingField: 'accidentDate',
  hideClosed: false,
  displayId: null
};

export default function rootReducer(state = initialState, action){
  if(action.type === SET_CLAIMS_SORT_DIRECTION){
    return {
      ...state,
      isAscending: action.isAscending
    };
  } else if(action.type === SET_CLAIMS_SORT_FIELD) {
    return {
      ...state,
      sortingField: action.field
    };
  } else if(action.type === TOGGLE_STATUS_FILTER){
    return {
      ...state,
      hideClosed: action.checked
    };
  } else if(action.type === DISPLAY_CLAIM){
    console.log(action.displayId);
    return {
      ...state, 
      displayId: action.displayId
    };
  } else {
    return state;
  }
}