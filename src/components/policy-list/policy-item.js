import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/utils';


export function PolicyItem(props){
  const { id, effectiveDate, expirationDate, exposures, premium } = props.item;

  return (
    <div>
      <h3>Policy Id: {id}</h3>
      <p>Effective Date: {formatDate(effectiveDate)}</p>
      <p>Expiration Date: {formatDate(expirationDate)}</p>
      <p>Exposures: {exposures}</p>
      <p>Premium: {premium}</p>
    </div>
  );
}

export default connect()(PolicyItem);