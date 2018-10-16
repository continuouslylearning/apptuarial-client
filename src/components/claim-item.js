import React from 'react';
import { connect } from 'react-redux';
import { displayClaim } from '../actions/claims-list';

function ClaimItem(props){

  const { id, policyId, status, accidentDate, caseReserve, paidLoss } = props.item;
  const options = props.options;

  return (
    <div onClick={() => props.dispatch(displayClaim(id))}>
      <h3>Claim Id: {id}</h3>
      <p>Policy Id: {policyId}</p>
      <p>Status: {status}</p>
      <p>Accident Date: {accidentDate.toLocaleDateString('en-US', options)}</p>
      <p>Case Reserve: {caseReserve}</p>
      <p>Paid Loss: {paidLoss}</p>
    </div>
  );
}

export default connect()(ClaimItem);