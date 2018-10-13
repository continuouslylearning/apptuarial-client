import React from 'react';
import LoginForm from './login-form';
import RegistrationForm from './registration-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PolicyForm from './policy-form';
import { fetchPolicies } from '../actions/policies';
import { connect } from 'react-redux';
import Header from './header';

class App extends React.Component{

  componentDidMount(){
    this.props.dispatch(fetchPolicies());
  }

  render(){
    return (
      <Router>
        <div className='container'>
          <Header/>
          <Route component={PolicyForm} exact path='/policy/add'/>
          <Route component={LoginForm} exact path='/login'/>
          <Route component={RegistrationForm} exact path='/register'/>
        </div>
      </Router>
    );
  }
}

export default connect()(App);