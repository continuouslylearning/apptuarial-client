import React from 'react';
import './ratios.css';
import { connect } from 'react-redux';
import Chart from './ratio-chart';


class Ratios extends React.Component {

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
      const policystats = this.props.policies.reduce((acc, policy) => policyReducer(acc, policy, startOfYear, endOfYear), initialValue);

      const initialValues2 = {
        reportedClaims: 0,
        reportedLoss: 0
      };

      const claimstats = this.props.claims.reduce((acc, claim) => claimsReducer(acc, claim, startOfYear, endOfYear), initialValues2);

      statistics.push({
        ...policystats,
        ...claimstats,
        year
      });
    }

    console.log(statistics);
    const labels = statistics.map(({ year }) => year);
    const data = statistics.map(({ earnedExposures, earnedPremium }) => earnedExposures ? (earnedPremium / earnedExposures).toFixed(2) : 0);
    const severityData = statistics.map(({ reportedLoss, reportedClaims }) => reportedClaims ? reportedLoss / reportedClaims : 0);
    const frequencyData = statistics.map(({reportedClaims, earnedExposures}) => earnedExposures ? reportedClaims / earnedExposures : 0);
    const lossRatioData = statistics.map(({reportedLoss, earnedPremium}) => earnedPremium ? reportedLoss / earnedPremium : 0);
    const purePremiumData = statistics.map(({reportedLoss, earnedExposures}) => earnedExposures ? reportedLoss / earnedExposures : 0);

    return (
      <div>
        <h2 className='ratios-title'>INSURANCE RATIOS</h2>
  
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

//use accident year aggregation for claims and losses

function claimsReducer(acc, claim, startOfYear, endOfYear){
  const { accidentDate, caseReserve, transactions } = claim;
  if(accidentDate < startOfYear || accidentDate > endOfYear) return acc;
  const paidLosses = transactions.reduce((acc,{lossPayment}) => acc + lossPayment, 0);
  const reportedLoss = acc.reportedLoss + paidLosses + caseReserve;
  const reportedClaims = acc.reportedClaims + 1;
  return {
    reportedLoss,
    reportedClaims
  };
}