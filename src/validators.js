export const required = value => value ? undefined : 'Required';
export const trimmed = value => value.trim() === value ? undefined : 'Cannot begin or end with whitespace';
export const moreThan = field => (value, allValues) => field in allValues && value >= allValues[field] ? undefined : 'Cannot be less than the Effective Date';
export const match = field => (value, allValues) => field in allValues && value.trim() === allValues[field] ? undefined : `Must match ${field}`;