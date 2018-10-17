import React from 'react';
import LandingPage from './landing-page';
import RegistrationForm from './registration-form';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
import Header from './header';

class App extends React.Component{

  render(){

    return (
      <div className='container'>
        <Header/>
        <Router>
          <main>
            <Switch>
              <Route component={LandingPage} exact path='/login'/>
              <Route component={RegistrationForm} exact path='/register'/>
              <Route component={Dashboard} path='/dashboard'/>
              <Redirect from='/' to='/login'/>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);