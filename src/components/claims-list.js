import React from 'react';
import { connect } from 'react-redux';
import './policies.css';

class Policy extends React.Component{

  render(){
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    
    const policies = this.props.policies
      .sort((a,b) => b.accidentDate - a.accidentDate)
      .map(({ id, status }) =>
        <li key={id} className='policy'>
          <h2>Claim id: {id}</h2>
          <p>Status: </p>
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