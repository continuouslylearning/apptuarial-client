import React from 'react';
import { connect } from 'react-redux';
import './policies.css';

class ClaimsList extends React.Component{

  render(){
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    
    const claims = this.props.claims
      .sort((a,b) => b.accidentDate - a.accidentDate)
      .map(({ id, status, accidentDate, caseReserve, transactions }) =>
        <li key={id} className='policy'>
          <h2>Claim id: {id}</h2>
          <p>Status: {status}</p>
          <p>Accident Date: {accidentDate.toLocaleDateString('en-US', options)}</p>
          <p>Case Reserve: {caseReserve}</p>
          <p>Number of transactions: {transactions.length}</p>
        </li>
      );

    return (
      <ul>
        {claims}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.claims
});

export default connect(mapStateToProps)(ClaimsList);