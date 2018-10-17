import React from 'react';
import { reset, reduxForm, Field } from 'redux-form';
import Input from './input';
import { Link } from 'react-router-dom';
import { addPolicy, fetchPolicies } from '../actions/policies';
import { required, moreThan } from '../validators';

const moreThanEffectiveDate = moreThan('effectiveDate');

class PolicyForm extends React.Component{

  addPolicy(values){
    const { effectiveDate, expirationDate, premium, exposures } = values;
    const newPolicy = { effectiveDate, expirationDate, premium, exposures };
    return this.props.dispatch(addPolicy(newPolicy))
      .then(() => this.props.dispatch(fetchPolicies()));
  }

  render(){

    const { handleSubmit, pristine, submitting, error } = this.props;
    const errorMessage = !pristine && error ? <span className='form-error'>{error}</span> : null;

    return(
      <div>
        <Link to='/dashboard/policies'>{'BACK'}</Link>
        <h2>ADD A NEW POLICY</h2>
        <form onSubmit={handleSubmit(values => this.addPolicy(values))}>
          {errorMessage}
          <Field component={Input} type='date' label='Effective Date' name='effectiveDate' validate={[required]}/>
          <Field component={Input} type='date' label='Expiration Date' name='expirationDate' validate={[required, moreThanEffectiveDate]}/>
          <Field component={Input} type='number' label='Premium' name='premium' min='0' required={true}/>
          <Field component={Input} type='number' label='Exposures' name='exposures' min='0'/>
          <button type='submit' disabled={pristine || submitting}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'policy',
  initialValues: { exposures: 1 },
  onSubmitSuccess: (result, dispatch) => dispatch(reset('policy'))
})(PolicyForm);