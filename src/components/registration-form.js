import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
import './form.css';

class registrationForm extends React.Component{

  registerUser(values){
    const { username, password } = values;
    const user = { username, password };
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render(){
    return (
      <form onSubmit={this.props.handleSubmit(values => this.registerUser(values))}>
        <div class='form'>
          <label htmlFor='username'>Username</label>
          <Field component={Input} type='text' name='username' id='username'/>
          <label htmlFor='password'>Password</label>
          <Field component={Input} type='password' name='password' id='password'/>
          <label htmlFor='passwordConfirm'>Confirm password</label>
          <Field component={Input} type='password' name='passwordConfirm' id='passwordConfirm'/>
          <button type='submit' disabled={this.props.pristine||this.props.submitting}>REGISTER</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration'
})(registrationForm);