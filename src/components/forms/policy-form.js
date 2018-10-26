import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Input from './input';
import { addPolicy, fetchPolicies } from '../../actions/policies';
import { required, moreThan } from '../../validators';
import BaseForm from './form';
import List from '../base-list/list';
import PolicyItem from '../policy-list/policy-item';
import Policy from '../policy-list/policy';

const moreThanEffectiveDate = moreThan('effectiveDate');
const BasePolicyForm = BaseForm('policy');
const NewPolicyList = List()(PolicyItem);

export class PolicyForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      added: [],
      itemId: null
    };
  }

  displayItem(itemId){
    this.setState({
      itemId
    });
  }

  addPolicy(values){
    let newPolicy;
    return this.props.dispatch(addPolicy(values))
      .then((res) => {
        newPolicy = res;
        return this.props.dispatch(fetchPolicies());
      })
      .then(() => this.setState(prevState => { 
        newPolicy = {
          ...newPolicy,
          effectiveDate: new Date(newPolicy.effectiveDate),
          expirationDate: new Date(newPolicy.expirationDate)
        };
        return {
          added: prevState.added.concat(newPolicy) 
        };
      }));
  }

  render(){
    const { itemId, added } = this.state;
    return (
      <div>
        <BasePolicyForm title='ADD NEW POLICY' onSubmit={(values) => this.addPolicy(values)}>
          <Field component={Input} type='date' label='Effective Date' name='effectiveDate' validate={[required]}/>
          <Field component={Input} type='date' label='Expiration Date' name='expirationDate' validate={[required, moreThanEffectiveDate]}/>
          <Field component={Input} type='number' label='Premium' name='premium' min='0' validate={[required]}/>
          <Field component={Input} type='number' label='Exposures' name='exposures' min='1' validate={[required]}/>
        </BasePolicyForm>
        {added.length === 0 ? null : <h3 className='added'>Recently added:</h3>}
        <NewPolicyList data={added} displayItem={(itemId) => this.displayItem(itemId)}/>
        {itemId ? <Policy item={itemId} closeItem={() => this.displayItem(null)}/> : null}
      </div>
    );
  }
}

export default connect()(PolicyForm);
