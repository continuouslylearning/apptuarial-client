import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';


describe('<LoginForm/>', () => {
  const dispatch = jest.fn();

  it('should render without crashing', () => {
    shallow(<LoginForm/>);
  });
});