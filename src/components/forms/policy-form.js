import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Input from './input';
import { addPolicy, fetchPolicies } from '../../actions/policies';
import { required, moreThan } from '../../validators';
import BaseForm from './form';

const moreThanEffectiveDate = moreThan('effectiveDate');

const BasePolicyForm = BaseForm('policy');

class PolicyForm extends React.Component {

  addPolicy(values){
    return this.props.dispatch(addPolicy(values))
      .then(() => this.props.dispatch(fetchPolicies()));
  }

  render(){
    return (
      <BasePolicyForm title='ADD NEW POLICY' onSubmit={(values) => this.addPolicy(values)}>
        <Field component={Input} type='date' label='Effective Date' name='effectiveDate' validate={[required]}/>
        <Field component={Input} type='date' label='Expiration Date' name='expirationDate' validate={[required, moreThanEffectiveDate]}/>
        <Field component={Input} type='number' label='Premium' name='premium' min='0' required={true}/>
        <Field component={Input} type='number' label='Exposures' name='exposures' min='0'/>
      </BasePolicyForm>
    );
  }
}

export default connect()(PolicyForm);
