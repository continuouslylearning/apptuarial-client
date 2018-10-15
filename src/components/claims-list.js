import React from 'react';
import { connect } from 'react-redux';
import ClaimItem from './claim-item';
import List from './list';

class ClaimsPage extends React.Component{

  render(){

    const claims = this.props.claims.sort((a,b) => b.accidentDate - a.accidentDate);

    const ClaimsList = List()(ClaimItem);
    return (
      <ClaimsList data={claims}/>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.claims
});

export default connect(mapStateToProps)(ClaimsPage);