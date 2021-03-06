import React from 'react';
import { connect } from 'react-redux';
import DropdownMenu from '../dropdown/dropdown';
import './header.css';

export function HeaderBar(props) {

  return (
    <header role='banner'>
      <h1>Apptuarial</h1>
      { props.loggedIn ? <DropdownMenu/> : null } 
    </header>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);