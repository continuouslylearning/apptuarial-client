import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import jwtDecode from 'jwt-decode';

import { setAuthToken, authRequestSuccess } from './actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));

const authToken = localStorage.getItem('authToken');
if(authToken){
  const payload = jwtDecode(authToken);
  store.dispatch(setAuthToken(authToken));
  store.dispatch(authRequestSuccess(payload.user));
}

export default store;