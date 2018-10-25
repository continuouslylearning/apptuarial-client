import React from 'react';
import { connect } from 'react-redux';
import { fetchClaims, deleteClaim } from '../../actions/claims';
import { formatDate } from '../../utils/utils';
import '../popup.css';

export class Claim extends React.Component{

  delete(id){
    return this.props.dispatch(deleteClaim(id))
      .then(() => this.props.closeItem())
      .then(() => this.props.dispatch(fetchClaims()));
  }

  render(){
    const { transactions, closeItem } = this.props;
    const { id, policyId, accidentDate, paidLoss, caseReserve, status } = this.props.claim;

    const transactionsList = transactions.length !== 0 ? 
      <ul>
        {transactions.map((item, index) => 
          <li key={index}>
            <b>{'Transaction'}</b>
            <p>Date: {formatDate(item.transactionDate)}</p>
            <p>Loss Payment: {item.lossPayment}</p>
            <p>Case Reserve: {item.caseReserve}</p>
          </li>)}
      </ul> 
      : null;

    return (
      <div className='popup'>
        <h2>Claim #{id}</h2>
        <p>Policy Id: {policyId}</p>
        <p>Accident Date: {formatDate(accidentDate)}</p>
        <p>Status: {status}</p>
        <p>Paid Loss: {paidLoss}</p>
        <p>Case Reserve: {caseReserve}</p>
        <p>Number of Transactions: {transactions.length === 0? 'None': `${transactions.length}`}</p>
        {transactionsList}
        <button className='close' onClick={closeItem}>CLOSE</button>
        <button className='delete' onClick={() => this.delete(id)}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.item;
  const claim = state.claims.find(item => item.id === id);
  const transactions = claim.transactions;

  return {
    claim,
    transactions: transactions.slice().sort((a, b) => b.transactionDate - a.transactionDate)
  };
};
export default connect(mapStateToProps)(Claim);