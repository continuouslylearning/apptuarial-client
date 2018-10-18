import React from 'react';
import { connect } from 'react-redux';
import ClaimItem from './claim-item';
import List from '../list';
import Claim from './claim';
import { setClaimsSortField, setClaimsSortDirection, toggleStatusFilter } from '../../actions/claims-list';

class ClaimsPage extends React.Component{

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

  sort(e){
    const sortField = e.target.value;
    this.props.dispatch(setClaimsSortField(sortField));
  }

  setDirection(e){
    const isAscending = e.target.value;
    this.props.dispatch(setClaimsSortDirection(isAscending));
  }

  toggleChecked(e){
    const checked = e.target.checked;
    this.props.dispatch(toggleStatusFilter(checked));
  }

  render(){
    const { sortField, hide, isAscending, factor, claims } = this.props;
    const itemId = this.state.itemId;
    console.log(factor);

    let list = hide
      ? claims.filter(claim => claim.status === 'OPEN')
      : claims.slice();

      console.log(sortField);
    if(sortField === 'accidentDate') {
      list.sort((a, b) => (b.accidentDate - a.accidentDate) * factor);
    } else if(sortField === 'caseReserve') {
      console.log(sortField);
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
          <select id='sort' value={sortField} onChange={e => this.sort(e)}>
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
        <input type='checkbox' id='checkbox' checked={hide} onChange={e=> this.toggleChecked(e)}/>
        <ClaimsList data={list} displayItem={(itemId) => this.displayItem(itemId)}/>
        {itemId ? <Claim item={itemId} closeItem={() => this.displayItem(null)}/> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isAscending, hide, sortField } = state.claimsList;
  return {
    claims: state.claims,
    isAscending,
    hide,
    sortField,
    factor: isAscending === 'true' ? -1 : 1
  };
};

export default connect(mapStateToProps)(ClaimsPage);