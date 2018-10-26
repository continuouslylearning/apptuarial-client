import React from 'react';
import { shallow } from 'enzyme';
import { Policy } from './policy';

describe('<Policy/>', () => {
  const policy = {
    effectiveDate: new Date(2017),
    expirationDate: new Date(2018),
    premium: 1000,
    exposures: 1
  };

  it('renders without crashing', () => {
    shallow(<Policy policy={policy} claims={[]}/>);
  });

});