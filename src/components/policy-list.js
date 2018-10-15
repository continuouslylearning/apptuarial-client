import React from 'react';
import { connect } from 'react-redux';
import PolicyItem from './policy-item';
import List from './list';
import './list.css';

class PoliciesPage extends React.Component{

  render(){

    const policies = this.props.policies.sort((a,b) => b.effectiveDate - a.effectiveDate);
    const PolicyList = List()(PolicyItem);

    return (
      <PolicyList data={policies}/>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : []
});

export default connect(mapStateToProps)(PoliciesPage);