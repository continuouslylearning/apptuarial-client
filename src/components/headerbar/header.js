import React from 'react';
import { connect } from 'react-redux';
import DropdownMenu from '../dropdown/dropdown';
import './header.css';

function HeaderBar(props) {

  return (
    <header>
      <h1>Apptuarial</h1>
      { props.loggedIn ? <DropdownMenu/> : null } 
    </header>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);