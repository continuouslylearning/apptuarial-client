import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Demo extends React.Component {

  componentDidMount(){
    this.props.dispatch(login('anonymous', 'password'));
  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/dashboard" />;
    return <span>Loading</span>;
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Demo);