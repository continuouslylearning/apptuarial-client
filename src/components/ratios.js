import React from 'react';
import './ratios.css';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs';

class Ratios extends React.Component {
  /* 
    BASIC INSURANCE RATIOS
    frequency = number of reported claims / number of earned exposures
    severity = 
  */
  render(){

    const currentYear = new Date(Date.now()).getFullYear();
    let statistics = [];
    for(let i = currentYear - 4; i <= currentYear; i++){
      const year = i;
      const startOfYear = new Date(year, 0);
      const endOfYear = new Date(year + 1, 0);

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

    const labels = statistics.map(({ year }) => year);
    const data = statistics.map(({ earnedExposures, earnedPremium }) => earnedExposures ? (earnedPremium / earnedExposures).toFixed(2) : 0);

    const premiumData = {
      labels,
      datasets: [{
        label: 'Average Premium',
        fillColor: 'rgba(151,187,205,0.5)',
        data: data
      }]
    };
   
    return (
      <div className='ratios'>
        <h2>INSURANCE RATIOS</h2>
        <div className='chart'>
          <h3>Average Premium</h3>
          <Bar data={premiumData} width={400} height={250}/>
        </div>
      </div>
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
