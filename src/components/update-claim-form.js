import React from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm, Field } from 'redux-form';
import Input from './input';
import { Link } from 'react-router-dom';
import { fetchClaims } from '../actions/claims';
import { required } from '../validators';

class UpdateClaimForm extends React.Component{

  addClaim(values){
    const { transaction, lossPayment, caseReserve } = values;
    return this.props.dispatch()
      .then(() => this.props.dispatch(fetchClaims()));
  }

  render(){

    const { claims, handleSubmit, pristine, submitting, error } = this.props;
    const options = claims.filter(claim => claim.status === 'OPEN').map(({ id }) => <option key={id} value={id}>{id}</option>);
  
    return(
      <div>
        <Link to='/dashboard/policies'>{'< BACK'}</Link>
        <h2>RECORD PAID LOSS OR CASE RESERVE ON CLAIM</h2> 
        <form className='form' onSubmit={handleSubmit(values => this.addClaim(values))}>
          {error}
          <Field component={Input} type='date' label='Transaction Date' name='transactionDate' validate={[required]}/>
          <Field component={Input} element='select' label='Choose ID of an Existing Claim' name='claimId' validate={[required]}>
            <option value=''></option>
            {options}
          </Field>
          <Field component={Input} label='Record a Loss Payment' type='number' name='lossPayment' min='0' validate={[required]}/>
          <Field component={Input} label='Update the Case Reserve' type='number' name='caseReserve' min='0' validate={[required]}/>
          <Field component={Input} className='checkbox' label='Close the Claim?' type='checkbox' name='closeClaim' min='0'/>
          <button type='submit' disabled={pristine || submitting}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.claims
});
const WrappedAddClaimForm = connect(mapStateToProps)(UpdateClaimForm);

export default reduxForm({
  form: 'updateclaim',
  initialValues: { policyId: '' },
  onSubmitSuccess: (result, dispatch) => dispatch(reset('updateclaim'))
})(WrappedAddClaimForm);