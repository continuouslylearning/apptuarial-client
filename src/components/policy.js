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
      <div>
        <ul>
          {claims.map(item => 
            <li key={item.id}>
              <b>{`Claim # ${item.id}`}</b>
              <p>Accident Date: {item.accidentDate.toLocaleDateString('en-US', options)}</p>
              <p>Paid Loss: {item.paidLoss}</p>
              <p>Case Reserve: {item.caseReserve}</p>
            </li>)}
        </ul> 
      </div>
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
  const claims = state.claims.filter(claim => claim.policyId === id);
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