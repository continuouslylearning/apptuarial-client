import React from 'react';
import { connect } from 'react-redux';
import PolicyItem from './policy-item';
import List from './list';
import { setFilter, setDirection, toggleCheckbox} from '../actions/filter';
import './list.css';

class PoliciesPage extends React.Component{

  sort(e){
    const filter = e.target.value;
    this.props.dispatch(setFilter(filter));
  }

  setDirection(e){
    const ascending = e.target.value;
    this.props.dispatch(setDirection(ascending));
  }

  toggleChecked(e){
    const checked = e.target.checked;
    this.props.dispatch(toggleCheckbox(checked));
  }

  render(){
    const { filter, checked, ascending, factor } = this.props;

    let list = checked 
      ? this.props.policies.filter(policy => policy.expirationDate >= new Date()) 
      : this.props.policies.slice();

    if(filter === 'effective') {
      list.sort((a, b) => (b.effectiveDate - a.effectiveDate) * factor);
    } else if(filter === 'premium') {
      list.sort((a, b) => (b.premium - a.premium) * factor);
    } else {
      list.sort((a, b) => (b.exposures - a.exposures) * factor);
    }

    const PolicyList = List()(PolicyItem);
 
    return (
      <div className='list'>
        <h2>POLICIES</h2>
        <label htmlFor='sort'>Sort By</label>
        <div className='dropdown'>
          <select id='sort' value={filter} onChange={e => this.sort(e)}>
            <option value='effective'>Effective Date</option>
            <option value='premium'>Premium</option>
            <option value='exposure'>Exposure</option>
          </select>
          <select id='direction' value={ascending} onChange={e => this.setDirection(e)}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
        </div>
        <label htmlFor='checkbox'>Show only non-expired policies</label>
        <input type='checkbox' id='checkbox' checked={checked} onChange={e=> this.toggleChecked(e)}/>
        <PolicyList data={list}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { checked, ascending, filter } = state.policyFilter;
  return {
    policies: state.policies ? state.policies : [],
    checked,
    filter,
    ascending,
    factor: ascending === 'true' ? -1 : 1
  };
};

export default connect(mapStateToProps)(PoliciesPage);