import React from 'react';
import { connect } from 'react-redux';
import { fetchPolicies } from '../actions/policies';

class Policy extends React.Component{

  componentDidMount(){
    this.props.dispatch(fetchPolicies());
  }

  render(){
    return (

    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies
});

export default connect(mapStateToProps)(Policy);