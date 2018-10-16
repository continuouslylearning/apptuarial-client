import React from 'react';

export default function PolicyItem(props){
  const { id, effectiveDate, expirationDate, exposures, premium } = props.item;
  const options = props.options;

  return (
    <div>
      <h3>Policy Id: {id}</h3>
      <p>Effective Date: {effectiveDate.toLocaleDateString('en-US', options)}</p>
      <p>Expiration Date: {expirationDate.toLocaleDateString('en-US', options)}</p>
      <p>Exposures: {exposures}</p>
      <p>Premium: {premium}</p>
    </div>
  );
}
