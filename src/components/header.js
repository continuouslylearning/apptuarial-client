import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import './header.css';

function HeaderBar(props){
  const logout = props.loggedIn ? <button onClick={() => props.dispatch(clearAuth())}>LOGOUT</button> : null;
  
  return (
    <header>
      <h1>Apptuarial</h1>
      {logout}
    </header>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null
  };
};

export default connect(mapStateToProps)(HeaderBar);