
// calculates calendar year earned exposure and earned premium on a policy for a given year
export function policyReducer(acc, policy, start, end){
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
export function claimsReducer(acc, claim, start, end){
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

export const computeRatio = (object, numerator, denominator) => {
  numerator = object[numerator];
  denominator = object[denominator];
  return denominator ? ( numerator / denominator).toFixed(2) : 0;
};