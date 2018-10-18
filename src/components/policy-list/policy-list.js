import React from 'react';
import { connect } from 'react-redux';
import PolicyItem from './policy-item';
import Policy from './policy';
import List from '../list';
import { setPolicySortDirection, setPolicySortField, togglePolicyFilterStatusFilter } from '../../actions/policy-list';
import '../list.css';

const PolicyList = List()(PolicyItem);

class PoliciesPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      itemId: null, 
      searchTerm: ''
    };
  }

  sort(e){
    const sortField = e.target.value;
    this.props.dispatch(setPolicySortField(sortField));
  }

  setDirection(e){
    const isAscending = e.target.value;
    this.props.dispatch(setPolicySortDirection(isAscending));
  }

  toggleChecked(e){
    const checked = e.target.checked;
    this.props.dispatch(togglePolicyFilterStatusFilter(checked));
  }

  displayItem(itemId){
    this.setState({
      itemId
    });
  }

  render(){
    const { sortField, hide, isAscending, factor, policies } = this.props;

    const itemId = this.state.itemId;

    let list = this.state.searchTerm
      ? policies.filter(({ id }) => id.toLowerCase().includes(this.state.searchTerm.toLowerCase())) 
      : policies.slice();
 
    list = hide 
      ? list.filter(policy => policy.expirationDate >= new Date()) 
      : list;

    if(sortField === 'effectiveDate') {
      list.sort((a, b) => (b.effectiveDate - a.effectiveDate) * factor);
    } else if(sortField === 'premium') {
      list.sort((a, b) => (b.premium - a.premium) * factor);
    } else {
      list.sort((a, b) => (b.exposures - a.exposures) * factor);
    }
 
    return (
      <div className='list'>
        <h2>POLICIES</h2>
        <div className='sort-area'>
          <label htmlFor='sort'>Sort By</label>
          <div className='dropdown'>
            <select id='sort' value={sortField} onChange={e => this.sort(e)}>
              <option value='effectiveDate'>Effective Date</option>
              <option value='premium'>Premium</option>
              <option value='exposure'>Exposure</option>
            </select>
            <select id='direction' value={isAscending} onChange={e => this.setDirection(e)}>
              <option value='true'>Ascending</option>
              <option value='false'>Descending</option>
            </select>
            <input type='text' className='search' value={this.state.searchTerm} 
              onChange={e => this.setState({searchTerm : e.target.value })} placeholder='Search by Policy Id'
            />
          </div>

          <label htmlFor='checkbox'>Show only non-expired policies</label>
          <input type='checkbox' id='checkbox' checked={hide} onChange={e=> this.toggleChecked(e)}/>
        </div>
        <PolicyList data={list} displayItem={(itemId) => this.displayItem(itemId)}/>
        {itemId ? <Policy item={itemId} closeItem={() => this.displayItem(null)}/> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { hide, isAscending, sortField, displayedPolicy } = state.policyList;
  return {
    policies: state.policies ? state.policies : [],
    displayedPolicy,
    hide,
    sortField,
    isAscending,
    factor: isAscending === 'true' ? -1 : 1
  };
};

export default connect(mapStateToProps)(PoliciesPage);