import React from 'react';
import { shallow } from 'enzyme';
import { AddClaimForm } from './add-claim-form';
import { formatDate } from '../../utils/utils';

describe('<AddClaimForm/>', () => {

  const policies = [{ id: 12345 }, { id: 67890 }];
  it('renders without crashing', () => {
    shallow(<AddClaimForm policies={[]}/>);
  });

  it('initial value of `choice` property in state should be null', () => {
    const wrapper = shallow(<AddClaimForm policies={[]}/>);
    expect(wrapper.state().choice).toEqual(null);

  });

  // it('onAdd should add the item to the added array in state', () => {
  //   const = { policyId: policies[0][] }
  //   const wrapper = shallow(<AddClaimForm/>);
  //   wrapper.instance().onAdd();
  // });

});