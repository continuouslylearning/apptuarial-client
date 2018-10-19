import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Input from './input';
import { fetchClaims, updateClaim } from '../../actions/claims';
import { required } from '../../validators';
import BaseForm from './form';

const BaseUpdateClaimForm = BaseForm('updateClaim');

class UpdateClaimForm extends React.Component{

  updateClaim(values){
    const { claimId, transactionDate, lossPayment, caseReserve, status } = values;
    const claim = this.props.claims.find(claim => claim.id === claimId);
    const transactions = claim.transactions.slice();
    transactions.push({
      transactionDate,
      lossPayment,
      caseReserve
    });
    const updatedClaim = {
      ...claim, 
      status: status ? 'CLOSED' : 'OPEN',
      transactions
    };
    return this.props.dispatch(updateClaim(updatedClaim))
      .then(() => this.props.dispatch(fetchClaims()));
  }

  render(){
    const options = this.props.claims.filter(claim => claim.status === 'OPEN').map(({ id }) => <option key={id} value={id}>{id}</option>);
    
    return (
      <BaseUpdateClaimForm title='RECORD PAID LOSS OR CHANGE CASS RESERVE' onSubmit={values => this.updateClaim(values)}>
        <Field component={Input} type='date' label='Transaction Date' name='transactionDate' validate={[required]}/>
        <Field component={Input} element='select' label='Choose ID of an Existing Claim' name='claimId' validate={[required]}>
          <option value=''></option>
          {options}
        </Field>
        <Field component={Input} label='Record a Loss Payment' type='number' name='lossPayment' min='0' validate={[required]}/>
        <Field component={Input} label='Update the Case Reserve' type='number' name='caseReserve' min='0' validate={[required]}/>
        <Field component={Input} className='checkbox' label='Close the Claim?' type='checkbox' name='status' min='0'/>
      </BaseUpdateClaimForm>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.claims
});

export default connect(mapStateToProps)(UpdateClaimForm);
