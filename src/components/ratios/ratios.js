import React from 'react';
import { connect } from 'react-redux';
import Chart from './ratio-chart';
import { policyReducer, claimsReducer, computeRatio } from './reducers';
import './ratios.css';


class Ratios extends React.Component {

  render(){

    const currentYear = new Date(Date.now()).getFullYear();

    let stats = [];

    for(let i = currentYear - 3; i <= currentYear; i++){
      const year = i;
      const start = new Date(year, 0);
      const end = new Date(year + 1, 0);

      const policystats = this.props.policies.reduce(
        (acc, policy) => policyReducer(acc, policy, start, end), 
        {
          earnedPremium: 0, 
          earnedExposures: 0
        }
      );

      const claimstats = this.props.claims.reduce(
        (acc, claim) => claimsReducer(acc, claim, start, end), 
        {
          reportedLoss: 0,
          reportedClaims: 0
        }
      );

      stats.push({
        ...policystats,
        ...claimstats,
        year
      });
    }

    const labels = stats.map(({ year }) => year);
    const data = stats.map(stat => computeRatio(stat, 'earnedPremium', 'earnedExposures'));
    const severityData = stats.map(stat => computeRatio(stat, 'reportedLoss', 'reportedClaims'));
    const frequencyData = stats.map(stat => computeRatio(stat, 'reportedClaims', 'earnedExposures'));
    const lossRatioData = stats.map(stat => computeRatio(stat, 'reportedLoss', 'earnedPremium'));
    const purePremiumData = stats.map(stat => computeRatio(stat, 'reportedLoss', 'earnedExposures'));

    return (
      <div className='ratios-page'>
        <h2 className='ratios-title'>INSURANCE RATIOS</h2>
        <p>These ratios use accident year aggregation for claims and losses and calendar year aggregation for premium and exposure</p>
        <div className='ratios'>
          <Chart label='Severity' labels={labels} dataset={severityData}/>
          <Chart label='Frequency' labels={labels} dataset={frequencyData}/>
          <Chart label='Average Premium' labels={labels} dataset={data}/>
          <Chart label='Pure Premium' labels={labels} dataset={purePremiumData}/>
          <Chart label='Loss Ratio' labels={labels} dataset={lossRatioData}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  policies: state.policies,
  claims: state.claims
});

export default connect(mapStateToProps)(Ratios);
