import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import PolicyList from './policy-list';
import PolicyForm from './policy-form';
import './policies.css';

class Policy extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
  }

  render(){

    return (
      <div>      
        <label htmlFor='select'>Sort</label><br/>
        <select id='select'>
          <option value='effectiveDate'>Effective Date</option>
          <option value='premium'>Premium</option>
          <option value='exposures'>Exposures</option>
        </select>
        <Route component={PolicyForm} path='/dashboard/policies/add'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies ? state.policies : []
});

export default connect(mapStateToProps)(Policy);