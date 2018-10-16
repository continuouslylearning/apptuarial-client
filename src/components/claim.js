import React from 'react';
import { connect } from 'react-redux';
import { fetchClaims, deleteClaim } from '../actions/claims';

import './popup.css';
import { displayClaim } from '../actions/claims-list';

class Policy extends React.Component{

  delete(id){
    return this.props.dispatch(deleteClaim(id))
      .then(() => this.props.dispatch(displayClaim(null)))
      .then(() => this.props.dispatch(fetchClaims()))
      .catch(err => err);
  }

  render(){
    const { id, accidentDate, paidLoss, caseReserve, transactions } = this.props;
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    const transactionsList = transactions.length !== 0 ? 
      <div>
        <ul>
          {transactions.map((item, index) => 
            <li key={index}>
              <b>{'Transaction'}</b>
              <p>Date: {item.transactionDate.toLocaleDateString('en-US', options)}</p>
              <p>Loss Payment: {item.lossPayment}</p>
              <p>Case Reserve: {item.caseReserve}</p>
            </li>)}
        </ul> 
      </div>
      : null;

    return (
      <div className='popup'>
        <h2>Claim #{id}</h2>
        <p>Accident Date: {accidentDate.toLocaleDateString('en-US', options)}</p>
        <p>Paid Loss: {paidLoss}</p>
        <p>Case Reserve: {caseReserve}</p>
        <p>Number of Transactions: {transactions.length === 0? 'None': `${transactions.length}`}</p>
        {transactionsList}
        <button className='close' onClick={() => this.props.dispatch(displayClaim(null))}>CLOSE</button>
        <button className='delete' onClick={() => this.delete(id)}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.displayedItem;
  const claim = state.claims.find(item => item.id === id);
  const { accidentDate, paidLoss, caseReserve, transactions } = claim;

  return {
    id,
    accidentDate,
    paidLoss,
    caseReserve,
    transactions: transactions.slice().sort((a, b) => b.transactionDate - a.transactionDate)
  };
};
export default connect(mapStateToProps)(Policy);