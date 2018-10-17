import React from 'react';
import { connect } from 'react-redux';
import { displayPolicy } from '../actions/filter';
import { fetchPolicies, deletePolicy } from '../actions/policies';
import { fetchClaims } from '../actions/claims';

import './popup.css';

class Policy extends React.Component{

  delete(id){
    return this.props.dispatch(deletePolicy(id))
      .then(() => this.props.dispatch(displayPolicy(null)))
      .then(() => Promise.all([this.props.dispatch(fetchPolicies()), this.props.dispatch(fetchClaims())]))
      .catch(err => err);
  }

  render(){
    const { id, effectiveDate, expirationDate, exposures, premium, claims } = this.props;
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    const claimsList = claims.length !== 0 ? 
      <ul>
        {claims.map(({id, accidentDate, paidLoss, status, caseReserve}) => 
          <li key={id}>
            <b>{`Claim # ${id}`}</b>
            <p>Accident Date: {accidentDate.toLocaleDateString('en-US', options)}</p>
            <p>Status: {status} </p>
            <p>Paid Loss: {paidLoss}</p>
            <p>Case Reserve: {caseReserve}</p>
          </li>)}
      </ul> 
      : null;

    return (
      <div className='popup'>
        <h2>Policy #{id}</h2>
        <p>Effective Date: {effectiveDate.toLocaleDateString('en-US', options)}</p>
        <p>Expiration Date: {expirationDate.toLocaleDateString('en-US', options)}</p>
        <p>Exposure: {exposures}</p>
        <p>Premium: {premium}</p>
        <p>Number of Claims: {claims.length === 0? 'None': `${claims.length}`}</p>
        {claimsList}
        <button className='close' onClick={() => this.props.dispatch(displayPolicy(null))}>CLOSE</button>
        <button className='delete' onClick={() => this.delete(id)}>DELETE</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.displayItem;
  const policy = state.policies.find(item => item.id === id);
  const claims = state.claims.filter(({ policyId }) => policyId === id);
  const { effectiveDate, expirationDate, exposures, premium } = policy;

  return {
    id,
    effectiveDate,
    expirationDate,
    exposures,
    premium,
    claims
  };
};
export default connect(mapStateToProps)(Policy);