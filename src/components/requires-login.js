import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {

  function RequiresLogin(props){
    const { loggedIn, loading, error, ...passThroughProps } = props;
    if(loading) return <div>Loading...</div>;
    if(!loggedIn || error) return <Redirect to='/login'/>;
    return <Component {...passThroughProps}/>;
  }

  const mapStateToProps = state => {
    const { currentUser, error, loading } = state.auth;
    return {
      loggedIn: currentUser !== null,
      error,
      loading
    };
  };

  return connect(mapStateToProps)(RequiresLogin);
};