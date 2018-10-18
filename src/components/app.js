import React from 'react';
import { connect } from 'react-redux';
import LandingPage from './landing-page';
import RegistrationForm from './registration-form';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import Header from './header';

class App extends React.Component{

  render(){

    return (
      <Router>
        <div className='container'>
          <Header/>
          <main>
            <Switch>
              <Route component={LandingPage} exact path='/login'/>
              <Route component={RegistrationForm} exact path='/register'/>
              <Route component={Dashboard} path='/dashboard'/>
              <Redirect from='/' to='/login'/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);