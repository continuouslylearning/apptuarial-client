import React from 'react';
import Input from './input';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { login } from '../actions/auth';
import { required } from '../validators';

class LoginForm extends React.Component{

  login(values){
    const { username, password } = values;
    return this.props.dispatch(login(username, password));
  }

  render(){
    const { pristine, error, submitting, handleSubmit } = this.props;
    const errorMessage = !pristine && error ? <span className='error'>{error}</span> : null;

    return(
      <div>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit(values => this.login(values))}>
          {errorMessage}
          <Field component={Input} label='Username' type='text' name='username' validate={[required]}/>
          <Field component={Input} label='Password' type='password' name='password' validate={[required]} />
          <button type='submit' disabled={pristine || submitting}>SUBMIT</button><br/>
          <Link to='/register'>Register</Link>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);