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
    return(
      <div>
        <Link to='/dashboard/policies'>{'< BACK'}</Link>
        <form onSubmit={this.props.handleSubmit(values => this.addPolicy(values))}>
          <label htmlFor='effectiveDate'>Effective Date</label>
          <Field component={Input} type='date' name='effectiveDate' id='effectiveDate' validate={required}/>
          <label htmlFor='expirationDate'>Expiration Date</label>
          <Field component={Input} type='date' name='expirationDate' id='expirationDate' validate={[required, moreThanEffectiveDate]}/>
          <label htmlFor='premium'>Premium</label>
          <Field component='input' type='number' name='premium' min='0' required={true}/>
          <label htmlFor='exposures'>Exposures</label>
          <Field component='input' type='number' name='exposures' min='0'/>
          <button type='submit' disabled={this.props.pristine || this.props.submitting}>ADD POLICY</button>
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