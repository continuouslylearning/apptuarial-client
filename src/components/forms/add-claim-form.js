import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Input from './input';
import BaseForm from './form';
import { fetchClaims, addClaim } from '../../actions/claims';
import { required, notWithinPolicyPeriod } from '../../validators';
import { formatDate } from '../../utils/utils';

const BaseAddClaimForm = BaseForm('addClaim');

class AddClaimForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      choice: null
    };
  }
  
  choose(e){
    const choice = e.target.value;
    this.setState({
      choice
    });
  }

  addClaim(values){
    return this.props.dispatch(addClaim(values))
      .then(() => this.props.dispatch(fetchClaims()))
      .then(() => this.setState({ choice: null }));
  }

  render(){

    const { policies } = this.props;
    const options = policies.map(({ id }, index) => <option index={index} key={id} value={id}>{id}</option>);
    const invalidAccidentDate = notWithinPolicyPeriod('policyId', policies);
    const choice = policies.find(({id}) => id === this.state.choice);
  
    return(
      <BaseAddClaimForm title='ADD A NEW CLAIM' onSubmit={(values) => this.addClaim(values)}>
        <Field component={Input} onChange={e => this.choose(e)}element='select' label='Policy ID' name='policyId' validate={[required]}>
          <option value=''></option>
          {options}
        </Field>
        {choice ? <p className='date'>Effective Date: {formatDate(choice.effectiveDate)}</p> : null}
        {choice ? <p className='date'>Expiration Date: {formatDate(choice.expirationDate)}<br/><br/></p> : null } 
        <Field component={Input} type='date' label='Accident Date' name='accidentDate' validate={[required, invalidAccidentDate]}/>
        <Field component={Input} type='number' label='Case Reserve' name='caseReserve' min='1' validate={[required]}/>
      </BaseAddClaimForm>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies
});

export default connect(mapStateToProps)(AddClaimForm);
