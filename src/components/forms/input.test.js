import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';


describe('<Input/>', () => {

  it('should render without crashing', () => {
    shallow(<Input input={{}} meta={{}}/>);
  });

  it('should not render an error span element if error prop is null', () => {
    const wrapper = shallow(<Input input={{}} meta={{}} />);
    expect(wrapper.find('.error').length).toBe(0);
  });

  it('should render an error span element when touched and error prop is passed', () => {
    const wrapper = shallow(<Input input={{}} meta={{ touched: true, error: 'error' }} />);
    expect(wrapper.find('.error').length).toBe(1);
  });
});