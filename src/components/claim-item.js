import React from 'react';

export default function ClaimItem(props){

  const { id, status, accidentDate, caseReserve, transactions } = props.item;
  const options = props.options;

  return (
    <li key={id} className='item'>
      <h2>Claim id: {id}</h2>
      <p>Status: {status}</p>
      <p>Accident Date: {accidentDate.toLocaleDateString('en-US', options)}</p>
      <p>Case Reserve: {caseReserve}</p>
      <p>Number of transactions: {transactions.length}</p>
    </li>
  );
}