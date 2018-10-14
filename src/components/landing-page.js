import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './login-form';


function LandingPage(props){
  if(props.loggedIn){
    return <Redirect to='/dashboard'/>;
  }
  else return <LoginForm/>;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);