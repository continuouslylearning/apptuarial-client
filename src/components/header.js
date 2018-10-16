import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import './header.css';

class HeaderBar extends React.Component{

  logout(){
    this.props.dispatch(clearAuth());
    localStorage.removeItem('authToken');
  }
  render(){
    const logout = this.props.loggedIn ? <button onClick={() => this.logout()}>LOGOUT</button> : null;
    return (
      <header>
        <h1>Apptuarial</h1>
        {logout}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);