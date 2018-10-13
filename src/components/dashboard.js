import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Policies from './policies';

class Dashboard extends React.Component {

  render(){
    return (
      <Route component={Policies} exact path='/dashboard/policies'/>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect()(Dashboard);