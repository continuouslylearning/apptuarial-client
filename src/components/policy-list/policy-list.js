import React from 'react';
import { connect } from 'react-redux';
import PolicyItem from './policy-item';
import Policy from './policy';
import List from '../list';
import PolicySort from './policy-sort';
import '../list.css';

const PolicyList = List()(PolicyItem);

class PoliciesPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      itemId: null
    };
  }

  displayItem(itemId){
    this.setState({
      itemId
    });
  }

  render(){

    const { sortField, hide, directionFactor, policies, searchTerm } = this.props;
    const itemId = this.state.itemId;

    let list = searchTerm
      ? policies.filter(({ id }) => id.includes(searchTerm)) 
      : policies.slice();
 
    list = hide ? list.filter(policy => policy.expirationDate >= new Date()) : list;

    if(sortField === 'effectiveDate') {
      list.sort((a, b) => (b.effectiveDate - a.effectiveDate) * directionFactor);
    } else if(sortField === 'premium') {
      list.sort((a, b) => (b.premium - a.premium) * directionFactor);
    } else {
      list.sort((a, b) => (b.exposures - a.exposures) * directionFactor);
    }
 
    return (
      <div className='list'>
        <PolicySort/>
        <PolicyList data={list} displayItem={(itemId) => this.displayItem(itemId)}/>
        {itemId ? <Policy item={itemId} closeItem={() => this.displayItem(null)}/> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { hide, sortField, isAscending, searchTerm } = state.policyList;
  return {
    policies: state.policies,
    hide,
    sortField,
    directionFactor: isAscending === 'true' ? -1 : 1,
    searchTerm
  };
};

export default connect(mapStateToProps)(PoliciesPage);