import React from 'react';
import { shallow } from 'enzyme';
import { PolicyForm } from './policy-form';


describe('<PolicyForm/>', () => {
  const dispatch = jest.fn();

  it('should render without crashing', () => {
    shallow(<PolicyForm/>);
  });
});