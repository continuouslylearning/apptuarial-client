import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/utils';

function ClaimItem(props){
  const { id, policyId, status, accidentDate, caseReserve, paidLoss } = props.item;

  return (
    <div>
      <h3>Claim Id: {id}</h3>
      <p>Policy Id: {policyId}</p>
      <p>Status: {status}</p>
      <p>Accident Date: {formatDate(accidentDate)}</p>
      <p>Case Reserve: {caseReserve}</p>
      <p>Paid Loss: {paidLoss}</p>
    </div>
  );
}

export default connect()(ClaimItem);