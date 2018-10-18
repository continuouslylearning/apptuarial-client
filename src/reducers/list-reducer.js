import { SET_CLAIMS_SORT_DIRECTION, SET_CLAIMS_SORT_FIELD, TOGGLE_CLAIMS_STATUS_FILTER } from '../actions/claims-list';
import { SET_POLICY_SORT_DIRECTION, SET_POLICY_SORT_FIELD, TOGGLE_POLICY_STATUS_FILTER } from '../actions/policy-list';

const listReducer = (constants, initialState) => (state = initialState, action) => {
  
  if(action.type === constants.SET_SORT_DIRECTION){
    return {
      ...state,
      isAscending: action.isAscending
    };
  } else if(action.type === constants.SET_SORT_FIELD){
    return {
      ...state,
      sortField: action.sortField
    };
  } else if(action.type === constants.TOGGLE_STATUS_FILTER){
    return {
      ...state,
      hide: action.hide
    };
  } else {
    return state;
  }

};

const initialClaimsListState = {
  isAscending: false,
  sortField: 'accidentDate',
  hide: false
};

export const claimsListReducer = listReducer(
  { 
    SET_SORT_DIRECTION: SET_CLAIMS_SORT_DIRECTION,
    SET_SORT_FIELD: SET_CLAIMS_SORT_FIELD,
    TOGGLE_STATUS_FILTER: TOGGLE_CLAIMS_STATUS_FILTER
  }, 
  initialClaimsListState
);

const initialPolicyListState = {
  isAscending: false,
  sortField: 'effectiveDate',
  hide: false
};

export const policyListReducer = listReducer({
  SET_SORT_DIRECTION: SET_POLICY_SORT_DIRECTION,
  SET_SORT_FIELD: SET_POLICY_SORT_FIELD,
  TOGGLE_STATUS_FILTER: TOGGLE_POLICY_STATUS_FILTER
},
initialPolicyListState
);


