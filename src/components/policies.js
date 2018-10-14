import React from 'react';
import { connect } from 'react-redux';
import { fetchPolicies } from '../actions/policies';
import { Route, Link } from 'react-router-dom';
import PolicyList from './policy-list';
import PolicyForm from './policy-form';
import './policies.css';
import Ratios from './ratios';

class Policy extends React.Component{

  componentDidMount(){
    this.props.dispatch(fetchPolicies());
  }

  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
  }

  render(){

    // const calendarYear = 2015;
    // const startOfYear = new Date(calendarYear, 1);
    // const endOfYear = new Date(calendarYear + 1, 1);
    // console.log(startOfYear);
    // console.log(endOfYear);

    // const earnedPremium = this.props.policies.reduce((acc, { effectiveDate, expirationDate, premium }) => 
    //   effectiveDate > endOfYear || expirationDate < startOfYear
    //     ? acc
    //     : acc + premium * ((Math.min(expirationDate, endOfYear) - Math.max(effectiveDate, startOfYear))/(expirationDate - effectiveDate)),
    // 0);

    return (
      <div>
        <Ratios/>        
        <Link to='/dashboard/policies/add'>
          <button class='add'>ADD A NEW POLICY</button>
        </Link>
        <label htmlFor='select'>Sort</label><br/>
        <select id='select' value={this.state}>
          <option value='effectiveDate'>Effective Date</option>
          <option value='premium'>Premium</option>
          <option value='exposures'>Exposures</option>
        </select>
        <Route component={PolicyForm} path='/dashboard/policies/add'/>
        <Route component={PolicyList} exact path='/dashboard/policies'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : []
});

export default connect(mapStateToProps)(Policy);