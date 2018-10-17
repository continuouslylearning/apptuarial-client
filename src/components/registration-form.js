import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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
      .then(() => this.props.dispatch(login(username, password)));
  }

  render(){
    const { handleSubmit, pristine, submitting, loggedIn } = this.props;
    if(loggedIn) return <Redirect to='/dashboard'/>;
    
    return (
      <div>
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit(values => this.registerUser(values))}>
          <div class='form'>
            <Field component={Input} type='text' label='Username' name='username' validate={[required, trimmed]}/>
            <Field component={Input} type='password' label='Password' name='password' validate={[required, trimmed]}/>          
            <Field component={Input} type='password' label='Confirm password' name='passwordConfirm' validate={[required, matchPassword]}/>
            <button type='submit' disabled={pristine||submitting}>SUBMIT</button>
            <Link to='/login'>Login</Link>
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