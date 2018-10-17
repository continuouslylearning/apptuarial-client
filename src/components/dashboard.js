import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import RequiresLogin from './requires-login';
import PoliciesList from './policy-list';
import ClaimsList from './claims-list';
import PolicyForm from './policy-form';
import AddClaimForm from './add-claim-form';
import UpdateClaimForm from './update-claim-form';
import DropdownMenu from './dropdown';
import Menu from './menu';
import Ratio from './ratios';
import { fetchPolicies } from '../actions/policies';
import { fetchClaims } from '../actions/claims';

class Dashboard extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPolicies());
    this.props.dispatch(fetchClaims());
  }

  render(){
    return (
      <div>
        <DropdownMenu/>
        <Route component={PolicyForm} exact path='/dashboard/policies/add'/>
        <Route component={PoliciesList} path='/dashboard/policies/list'/>
        <Route component={ClaimsList} path='/dashboard/claims/list'/>
        <Route component={Ratio} path='/dashboard/ratios'/>
        <Route component={AddClaimForm} exact path='/dashboard/claims/add'/>
        <Route component={UpdateClaimForm} exact path='/dashboard/claims/update'/>
        <Route component={Menu} exact path='/dashboard'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : [],
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));