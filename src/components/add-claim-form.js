import React from 'react';
import { connect } from 'react-redux';
import { reset, reduxForm, Field } from 'redux-form';
import Input from './input';
import { Link } from 'react-router-dom';
import { fetchClaims, addClaim } from '../actions/claims';
import { required } from '../validators';

class AddClaimForm extends React.Component{

  addClaim(values){
    const { accidentDate, policyId, caseReserve } = values;
    const newClaim = { accidentDate, policyId, caseReserve };
    return this.props.dispatch(addClaim(newClaim))
      .then(() => this.props.dispatch(fetchClaims()));
  }

  render(){

    const { policies, handleSubmit, pristine, submitting, error } = this.props;
    const options = policies.map(({ id }) => <option key={id} value={id}>{id}</option>);
    return(
      <div>
        <Link to='/dashboard/policies'>{'< BACK'}</Link>
        <h2>ADD A NEW CLAIM</h2> 
        <form className='form' onSubmit={handleSubmit(values => this.addClaim(values))}>
          {error}
          <Field component={Input} type='date' label='Accident Date' name='accidentDate' validate={[required]}/>
          <Field component={Input} element='select' label='Policy ID' name='policyId' validate={[required]}>
            <option value=''></option>
            {options}
          </Field>
          <Field component={Input} type='number' label='Case Reserve' name='caseReserve' min='0' validate={[required]}/>
          <button type='submit' disabled={pristine || submitting}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies
});
const WrappedAddClaimForm = connect(mapStateToProps)(AddClaimForm);

export default reduxForm({
  form: 'addclaim',
  initialValues: { policyId: '' },
  onSubmitSuccess: (result, dispatch) => dispatch(reset('addclaim'))
})(WrappedAddClaimForm);