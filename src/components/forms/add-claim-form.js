import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Input from '../input';
import BaseForm from '../form';
import { fetchClaims, addClaim } from '../../actions/claims';
import { required } from '../../validators';

const BaseAddClaimForm = BaseForm('addClaim');

class AddClaimForm extends React.Component {
  
  addClaim(values){
    return this.props.dispatch(addClaim(values))
      .then(() => this.props.dispatch(fetchClaims()));
  }

  render(){
    const { policies } = this.props;
    const options = policies.map(({ id }) => <option key={id} value={id}>{id}</option>);
    return(
      <BaseAddClaimForm title='ADD A NEW CLAIM' onSubmit={(values) => this.addClaim(values)}>
        <Field component={Input} type='date' label='Accident Date' name='accidentDate' validate={[required]}/>
        <Field component={Input} element='select' label='Policy ID' name='policyId' validate={[required]}>
          <option value=''></option>
          {options}
        </Field>
        <Field component={Input} type='number' label='Case Reserve' name='caseReserve' min='0' validate={[required]}/>
      </BaseAddClaimForm>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies
});

export default connect(mapStateToProps)(AddClaimForm);
