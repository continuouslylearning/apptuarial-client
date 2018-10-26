import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';
import { fetchPolicies } from '../actions/policies';
import { fetchClaims } from '../actions/claims';
jest.mock('../actions/policies');
jest.mock('../actions/claims');

describe('<Dashboard/>', () => {

  const dispatch = jest.fn();
   
  fetchClaims.mockImplementation(() => {
    return {
      type: 'FETCH_CLAIMS'
    };
  });

  fetchPolicies.mockImplementation(() => {
    return {
      type: 'FETCH_POLICIES'
    };
  });

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('should render without crashing', () => {
    shallow(<Dashboard dispatch={dispatch}/>);
  });

  it('should call fetchPolicies and fetchClaims', () => {
    shallow(<Dashboard dispatch={dispatch}/>);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'FETCH_POLICIES'
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'FETCH_CLAIMS'
    });
  });
});