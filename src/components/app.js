import React from 'react';
import { connect } from 'react-redux';
import LandingPage from './landing-page/landing-page';
import RegistrationForm from './forms/registration-form';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import Header from './headerbar/header';
import { refresh } from '../actions/auth';
export class App extends React.Component{

  componentDidUpdate(prevProps) {

    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refresh()),
      60 * 60 * 1000
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

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