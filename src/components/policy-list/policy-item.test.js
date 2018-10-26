import React from 'react';
import { shallow } from 'enzyme';
import { PolicyItem } from './policy-item';


describe('<PolicyItem/>', () => {
  const policy = {
    id: '123456',
    effectiveDate: new Date(2017, 0),
    expirationDate: new Date(2018, 0),
    premium: 1000,
    exposures: 1
  };

  it('renders without crashing', () => {
    shallow(<PolicyItem item={policy}/>);
  });

});