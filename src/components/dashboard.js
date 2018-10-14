import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import Policies from './policies';

class Dashboard extends React.Component {

  render(){
    if(!this.props.loggedIn) return <Redirect to='/login'/>;
    return (
      <div>
        <Link to='/dashboard/policies'>Policies</Link>
        <Route component={Policies} path='/dashboard/policies'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : [],
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);