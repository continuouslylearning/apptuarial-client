import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from './input';
import { Link } from 'react-router-dom';
import { addPolicy } from '../actions/policies';

class PolicyForm extends React.Component{

  addPolicy(values){
    const { effectiveDate, expirationDate, premium, exposures } = values;
    const newPolicy = { effectiveDate, expirationDate, premium, exposures };
    return this.props.dispatch(addPolicy(newPolicy));
  }

  render(){
    return(
      <div>
        <Link to='/policies'>{'< BACK'}</Link>
        <form onSubmit={this.props.handleSubmit(values => this.addPolicy(values))}>
          <label htmlFor='effectiveDate'>Effective Date</label>
          <Field component={Input} type='date' name='effectiveDate' id='effectiveDate'/>
          <label htmlFor='expirationDate'>Expiration Date</label>
          <Field component={Input} type='date' name='expirationDate' id='expirationDate'/>
          <label htmlFor='premium'>Premium</label>
          <Field component='input' type='number' name='premium' min='0'/>
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
  initialValues: {
    exposures: 1
  }
})(PolicyForm);