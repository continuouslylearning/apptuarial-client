import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import BaseForm from './form';
import { Link, Redirect } from 'react-router-dom';
import { required, trimmed, match } from '../validators';
import './form.css';
const matchPassword = match('password');
const BaseRegistrationForm = BaseForm('registration');

class RegistrationForm extends React.Component {

  registerUser(values){
    const { username, password } = values;
    const user = { username, password };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)))
      .catch(err => Promise.reject(new SubmissionError({ _error: err.message })));
  }

  render(){
    const { loggedIn } = this.props;
    if(loggedIn) return <Redirect to='/dashboard'/>;
    return(
      <BaseRegistrationForm title='REGISTER' onSubmit={values => this.registerUser(values)}>
        <Field component={Input} type='text' label='Username' name='username' validate={[required, trimmed]}/>
        <Field component={Input} type='password' label='Password' name='password' validate={[required, trimmed]}/>          
        <Field component={Input} type='password' label='Confirm password' name='passwordConfirm' validate={[required, matchPassword]}/>
      </BaseRegistrationForm>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationForm);