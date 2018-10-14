import React from 'react';
import { connect } from 'react-redux';
import { fetchPolicies } from '../actions/policies';
import './policies.css';

class Policy extends React.Component{

  render(){
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    
    const policies = this.props.policies
      .sort((a,b) => a.effectiveDate - b.effectiveDate)
      .map(({ id, effectiveDate, expirationDate, exposures, premium }) =>
        <li key={id}>
          <h2>Policy Id: {id}</h2>
          <p>Effective Date: {effectiveDate.toLocaleDateString('en-US', options)}</p>
          <p>Expiration Date: {expirationDate.toLocaleDateString('en-US', options)}</p>
          <p>Exposures: {exposures}</p>
          <p>Premium: {premium}</p>
        </li>
      );

    return (
      <ul>
        {policies}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : []
});

export default connect(mapStateToProps)(Policy);