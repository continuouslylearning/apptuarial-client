import React from 'react';
import { shallow } from 'enzyme';
import { AddClaimForm } from './add-claim-form';
import { addClaim, fetchClaims } from '../../actions/claims';
import { policies } from '../seed/seed';

jest.mock('../../actions/claims');
addClaim.mockImplementation(() => {
  return {
    type: 'ADD_CLAIM'
  };
});
fetchClaims.mockImplementation(() => {
  return {
    type: 'FETCH_CLAIMS'
  };
});

describe('<AddClaimForm/>', () => {
  const dispatch = jest.fn();
  dispatch.mockImplementation(() => Promise.resolve());

  it('renders without crashing', () => {
    shallow(<AddClaimForm policies={policies}/>);
  });

  it('initial value of `choice` property in state should be null', () => {
    const wrapper = shallow(<AddClaimForm policies={policies}/>);
    expect(wrapper.state().choice).toEqual(null);
  });

  it('addClaim method should dispatch add claim and fetch claims actions', () => {
    const wrapper = shallow(<AddClaimForm policies={policies} dispatch={dispatch}/>);
    wrapper.instance().addClaim({ policyId: policies[0], accidentDate: new Date(), caseReserve: 1000 })
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(addClaim());
        expect(dispatch.mock.calls[1][0]).toEqual(fetchClaims());
      });
  });

  it('addClaim method should set choice state property to null', () => {
    const wrapper = shallow(<AddClaimForm policies={policies} dispatch={dispatch}/>);
    wrapper.instance().addClaim({ policyId: policies[0], accidentDate: new Date(), caseReserve: 1000 })
      .then(() => {
        expect(wrapper.state().choice).toEqual(null);
      });
  });

  it('initial itemId value should be null', () => {
    const wrapper = shallow(<AddClaimForm policies={policies} dispatch={dispatch}/>);
    expect(wrapper.state().itemId).toEqual(null);
  });

  it('display Item method should set itemId state property to claim id', () => {
    const wrapper = shallow(<AddClaimForm policies={policies} dispatch={dispatch}/>);
    wrapper.instance().displayItem('5bc4f03654190e1d702ea47a');
    expect(wrapper.state().itemId).toEqual('5bc4f03654190e1d702ea47a');
  });

});