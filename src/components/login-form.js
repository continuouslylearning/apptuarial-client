import React from 'react';
import Input from './input';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { login } from '../actions/auth';
import { fetchPolicies } from '../actions/policies';

class LoginForm extends React.Component{

  login(values){
    const { username, password } = values;
    return this.props.dispatch(login(username, password))
      .then(() => this.props.dispatch(fetchPolicies()));
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(values => this.login(values))}>
        <label htmlFor='username'>Username</label>
        <Field component={Input} type='text' name='username' id='username'/>
        <label htmlFor='password'>Password</label>
        <Field component={Input} type='password' name='password' id='password'/>
        <button type='submit' disable={this.props.pristine || this.props.submitting}>LOGIN</button>
        <Link to='/register'>Register</Link>
        <Link to='/policies'>Policies</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);