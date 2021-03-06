import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, SubmissionError } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from './input';
import BaseForm from './form';
import Info from '../landing-page/landing-info';
import { Redirect } from 'react-router-dom';
import { required, trimmed, match } from '../../validators';

const matchPassword = match('password');
const BaseRegistrationForm = BaseForm('registration');

export class RegistrationForm extends React.Component {

  registerUser(values){
    const { username, password } = values;
    const user = { username, password };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)))
      .catch(err => Promise.reject(new SubmissionError({ _error: err.message })));
  }

  render(){
    if(this.props.loggedIn) return <Redirect to='/dashboard'/>;

    return(
      <div>
        <BaseRegistrationForm title='REGISTER' onSubmit={values => this.registerUser(values)} login={true}>
          <Field component={Input} type='text' label='Username' name='username' validate={[required, trimmed]}/>
          <Field component={Input} type='password' label='Password' name='password' validate={[required, trimmed]}/>          
          <Field component={Input} type='password' label='Confirm password' name='passwordConfirm' validate={[required, matchPassword]}/>
        </BaseRegistrationForm>
        <Link className='form-link' to='/login'>Login</Link>
        <Info/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationForm);