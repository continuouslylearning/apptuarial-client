import React from 'react';
import { shallow } from 'enzyme';
import { UpdateClaimForm } from './update-claim-form';


describe('<UpdateClaimForm/>', () => {

  it('should render without crashing', () => {
    shallow(<UpdateClaimForm/>);
  });
});