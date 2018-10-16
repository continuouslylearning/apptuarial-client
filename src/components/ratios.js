import React from 'react';
import { connect } from 'react-redux';
import Chart from './ratio-chart';
import './ratios.css';

class Ratios extends React.Component {

  render(){

    const currentYear = new Date(Date.now()).getFullYear();

    let stats = [];

    for(let i = currentYear - 4; i <= currentYear; i++){
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
    const data = stats.map(({ earnedExposures, earnedPremium }) => earnedExposures ? (earnedPremium / earnedExposures).toFixed(2) : 0);
    const severityData = stats.map(({ reportedLoss, reportedClaims }) => reportedClaims ? (reportedLoss / reportedClaims).toFixed(2) : 0);
    const frequencyData = stats.map(({reportedClaims, earnedExposures}) => earnedExposures ? (reportedClaims / earnedExposures).toFixed(2) : 0);
    const lossRatioData = stats.map(({reportedLoss, earnedPremium}) => earnedPremium ? (reportedLoss / earnedPremium).toFixed(2) : 0);
    const purePremiumData = stats.map(({reportedLoss, earnedExposures}) => earnedExposures ? (reportedLoss / earnedExposures).toFixed(2) : 0);

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

// calculates calendar year earned exposure and earned premium on a policy for a given year
function policyReducer(acc, policy, start, end){
  const { effectiveDate, expirationDate, premium, exposures } = policy;

  if(effectiveDate > end || expirationDate < start) return acc;
  const length = expirationDate - effectiveDate;
  const earnedLength = (Math.min(expirationDate, end) - Math.max(effectiveDate, start));
  const earnedPremium = acc.earnedPremium + premium * earnedLength / length;
  const earnedExposures = acc.earnedExposures + exposures * earnedLength / length;

  return {
    earnedExposures,
    earnedPremium
  };
}

// calculates the reported loss and reported claims for the given year
// uses accident year aggregation for claims and losses
function claimsReducer(acc, claim, start, end){
  const { accidentDate, caseReserve, transactions } = claim;

  if(accidentDate < start || accidentDate > end) return acc;
  const paidLoss = transactions.reduce((acc,{lossPayment}) => acc + lossPayment, 0);
  const reportedLoss = acc.reportedLoss + paidLoss + caseReserve;
  const reportedClaims = acc.reportedClaims + 1;

  return {
    reportedLoss,
    reportedClaims
  };
}