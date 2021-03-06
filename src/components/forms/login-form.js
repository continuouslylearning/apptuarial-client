import React from 'react';
import Input from './input';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { required } from '../../validators';
import BaseForm from './form';
import Info from '../landing-page/landing-info';

const BaseLoginForm = BaseForm('login');

export class LoginForm extends React.Component {

  login(values){
    const { username, password } = values;
    return this.props.dispatch(login(username, password));
  }

  render(){
    return(
      <div>
        <BaseLoginForm title='LOGIN' onSubmit={values => this.login(values)} login={true}>
          <Field component={Input} label='Username' type='text' name='username' validate={[required]}/>
          <Field component={Input} label='Password' type='password' name='password' validate={[required]} />
        </BaseLoginForm>
        <Link className='form-link' to='/register'>Register</Link>
        <Info/>
      </div>
    );
  }
}

export default connect()(LoginForm);
