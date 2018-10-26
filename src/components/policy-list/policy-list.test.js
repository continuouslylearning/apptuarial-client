import React from 'react';
import { shallow } from 'enzyme';
import { PoliciesPage } from './policy-list';

describe('<PoliciesPage/>', () => {

  it('should render wihout crashing', () => {
    shallow(<PoliciesPage  policies={[]}/>);

  });
  
  it('item Id should initially be null', () => {
    const wrapper = shallow(<PoliciesPage policies={[]}/>);
    expect(wrapper.state().itemId).toBe(null);
  });

  it('should set value on item id state property when displayItem method called', () => {
    const wrapper = shallow(<PoliciesPage policies={[]}/>);
    wrapper.instance().displayItem('123456');
    expect(wrapper.state().itemId).toEqual('123456');

  });

  it('should render Policy component when itemId is non null', () => {
    const wrapper = shallow(<PoliciesPage policies={[]}/>);
    wrapper.instance().displayItem('123456');
    wrapper.update();
    expect(wrapper.find('Connect(Policy)').length).toBe(1);
  });

  it('should not render Policy component initially', () => {
    const wrapper = shallow(<PoliciesPage policies={[]}/>);
    expect(wrapper.find('Connect(Policy)').length).toBe(0);
  });

});