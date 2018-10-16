import React from 'react';
import { connect } from 'react-redux';
import ClaimItem from './claim-item';
import List from './list';
import { setClaimsSortField, setClaimsSortDirection, toggleStatusFilter } from '../actions/claims-list';

class ClaimsPage extends React.Component{
  
  sort(e){
    console.log(e.target.value);
    const sortingField = e.target.value;
    this.props.dispatch(setClaimsSortField(sortingField));
  }

  setDirection(e){
    const ascending = e.target.value;
    this.props.dispatch(setClaimsSortDirection(ascending));
  }

  toggleChecked(e){
    const checked = e.target.checked;
    this.props.dispatch(toggleStatusFilter(checked));
  }

  render(){
    const { sortingField, hideClosed, isAscending, factor } = this.props;

    console.log(sortingField);
    console.log(hideClosed);
    console.log(isAscending);
    console.log(factor);
    let list = hideClosed
      ? this.props.claims.filter(claim => claim.status === 'OPEN')
      : this.props.claims.slice();

    if(sortingField === 'accidentDate') {
      list.sort((a, b) => (b.accidentDate - a.accidentDate) * factor);
    } else if(sortingField === 'caseReserve') {
      list.sort((a, b) => (b.caseReserve - a.caseReserve) * factor);
    } else {
      list.sort((a, b) => (b.paidLoss - a.paidLoss) * factor);
    }

    const ClaimsList = List()(ClaimItem);

    return (
      <div className='list'>
        <h2>CLAIMS</h2>
        <label htmlFor='sort'>Sort By</label>
        <div className='dropdown'>
          <select id='sort' value={sortingField} onChange={e => this.sort(e)}>
            <option value='accidentDate'>Accident Date</option>
            <option value='caseReserve'>Case Reserve</option>
            <option value='paidLoss'>Paid Loss</option>
          </select>
          <select id='direction' value={isAscending} onChange={e => this.setDirection(e)}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
        </div>
        <label htmlFor='checkbox'>Show only open claims</label>
        <input type='checkbox' id='checkbox' checked={hideClosed} onChange={e=> this.toggleChecked(e)}/>
        <ClaimsList data={list}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAscending, hideClosed, sortingField } = state.claimsList;
  return {
    claims: state.claims,
    isAscending: isAscending === 'true',
    hideClosed,
    sortingField,
    factor: isAscending === 'true' ? -1 : 1
  };
};

export default connect(mapStateToProps)(ClaimsPage);