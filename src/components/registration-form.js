import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { Link, Redirect } from 'react-router-dom';
import { required, trimmed, match } from '../validators';
import './form.css';
const matchPassword = match('password');

class RegistrationForm extends React.Component{

  registerUser(values){
    const { username, password } = values;
    const user = { username, password };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)))
      .catch(err => Promise.reject(new SubmissionError({ _error: err.message })));
  }

  render(){
    const { handleSubmit, pristine, submitting, loggedIn, error } = this.props;
    if(loggedIn) return <Redirect to='/dashboard'/>;
    const errorMessage = error ? <span className='form-error'>{error}</span> : null;

    return (
      <div>
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit(values => this.registerUser(values))}>
          {errorMessage}
          <div class='form'>
            <Field component={Input} type='text' label='Username' name='username' validate={[required, trimmed]}/>
            <Field component={Input} type='password' label='Password' name='password' validate={[required, trimmed]}/>          
            <Field component={Input} type='password' label='Confirm password' name='passwordConfirm' validate={[required, matchPassword]}/>
            <button type='submit' disabled={pristine||submitting}>SUBMIT</button>
            <Link class='link' to='/login'>Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default reduxForm({
  form: 'registration'
})(connect(mapStateToProps)(RegistrationForm));