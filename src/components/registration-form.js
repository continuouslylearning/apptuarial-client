import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
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
    return (
      <div>
        <h2>REGISTER</h2>
        <form onSubmit={this.props.handleSubmit(values => this.registerUser(values))}>
          <div class='form'>
            <Field component={Input} type='text' label='Username' name='username' id='username' validate={[required, trimmed]}/>
            <Field component={Input} type='password' label='Password' name='password' id='password' validate={[required, trimmed]}/>          
            <Field component={Input} type='password' label='Confirm password' name='passwordConfirm' id='passwordConfirm' validate={[required, matchPassword]}/>
            <button type='submit' disabled={this.props.pristine||this.props.submitting}>SUBMIT</button>
            <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'registration'
})(RegistrationForm);