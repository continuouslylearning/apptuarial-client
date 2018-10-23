export const required = value => value ? undefined : 'Required';

export const trimmed = value => value.trim() === value ? undefined : 'Cannot begin or end with whitespace';

export const moreThan = field => (value, allValues) => field in allValues && value >= allValues[field] 
  ? undefined 
  : 'Cannot be less than the Effective Date';

export const match = field => (value, allValues) => field in allValues && value.trim() === allValues[field] 
  ? undefined 
  : `Must match ${field}`;

export const notWithinPolicyPeriod = (field, data) => (value, allValues) => {
  if(!(field in allValues)) return undefined;
  const choiceId = allValues[field];
  const policy = data.find(({ id }) => id === choiceId);
  console.log(policy.expirationDate);

  value = new Date(value);
  console.log(value);
  return value >= policy.effectiveDate && value <= policy.expirationDate ? undefined : 'Accident date is not covered by the policy';
};