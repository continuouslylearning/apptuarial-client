import React from 'react';
import { connect } from 'react-redux';
import ClaimSort from './claim-sort';
import ClaimItem from './claim-item';
import List from '../list';
import Claim from './claim';

const ClaimsList = List()(ClaimItem);

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

  render(){
    const { sortField, hide, factor, claims } = this.props;
    const itemId = this.state.itemId;

    let list = hide
      ? claims.filter(claim => claim.status === 'OPEN')
      : claims.slice();

    if(sortField === 'accidentDate') {
      list.sort((a, b) => (b.accidentDate - a.accidentDate) * factor);
    } else if(sortField === 'caseReserve') {

      list.sort((a, b) => (b.caseReserve - a.caseReserve) * factor);
    } else {
      list.sort((a, b) => (b.paidLoss - a.paidLoss) * factor);
    }

    return (
      <div className='list'>
        <ClaimSort/>
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