import React from 'react';
import { shallow } from 'enzyme';
import { HeaderBar } from './header';


describe('<HeaderBar/>', () => {
  it('should render', () => {
    shallow(<HeaderBar loggedIn={true}/>);
  });

  it('should render h1 element', () => {
    const wrapper = shallow(<HeaderBar loggedIn={true}/>);
    const h1 = wrapper.find('h1');
    expect(h1.length).toBe(1);
  });
});