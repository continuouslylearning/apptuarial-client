import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';


describe('<Input/>', () => {
  const dispatch = jest.fn();

  it('should render without crashing', () => {
    shallow(<Input/>);
  });
});