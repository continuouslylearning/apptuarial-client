import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import RequiresLogin from './requires-login';
import PoliciesList from './policy-list/policy-list';
import ClaimsList from './claims-list/claims-list';
import PolicyForm from './forms/policy-form';
import AddClaimForm from './forms/add-claim-form';
import UpdateClaimForm from './forms/update-claim-form';
import Menu from './menu/menu';
import Ratio from './ratios/ratios';
import { fetchPolicies } from '../actions/policies';
import { fetchClaims } from '../actions/claims';

export class Dashboard extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPolicies());
    this.props.dispatch(fetchClaims());
  }

  render(){
    return (
      <div>
        <Switch>
          <Route component={PolicyForm} exact path='/dashboard/policies/add'/>
          <Route component={PoliciesList} path='/dashboard/policies/list'/>
          <Route component={ClaimsList} path='/dashboard/claims/list'/>
          <Route component={Ratio} path='/dashboard/ratios'/>
          <Route component={AddClaimForm} exact path='/dashboard/claims/add'/>
          <Route component={UpdateClaimForm} exact path='/dashboard/claims/update'/>
          <Route component={Menu} exact path='/dashboard'/>
          <Redirect to='/dashboard'/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : [],
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));