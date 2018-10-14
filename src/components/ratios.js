import React from 'react';
import { connect } from 'react-redux';

class Ratios extends React.Component {
  /* 
    BASIC INSURANCE RATIOS
    frequency = number of reported claims / number of earned exposures
    severity = 
  */
  render(){

    const currentYear = new Date(Date.now()).getFullYear();
    let statistics = [];
    for(let i = currentYear; i > currentYear - 5; i--){
      const year = i;
      const startOfYear = new Date(year, 1);
      const endOfYear = new Date(year + 1, 1);

      const initialValue = {
        earnedPremium: 0,
        earnedExposures: 0
      };
      const yearStatistics = this.props.policies.reduce((acc, policy) => policyReducer(acc, policy, startOfYear, endOfYear), initialValue);
      statistics.push({
        ...yearStatistics,
        year
      });
    }
    console.log(statistics);

  

    return (
      null
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies
});

export default connect(mapStateToProps)(Ratios);

function policyReducer(acc, policy, startOfYear, endOfYear){
  const { effectiveDate, expirationDate, premium, exposures } = policy;

  if(effectiveDate > endOfYear || expirationDate < startOfYear) return acc;

  const length = expirationDate - effectiveDate;
  const earnedLength = (Math.min(expirationDate, endOfYear) - Math.max(effectiveDate, startOfYear));

  const earnedPremium = acc.earnedPremium + premium * earnedLength / length;
  const earnedExposures = acc.earnedExposures + exposures * earnedLength / length;

  return {
    earnedExposures,
    earnedPremium
  };
}
