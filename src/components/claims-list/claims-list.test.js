import React from 'react';
import { shallow } from 'enzyme';
import { ClaimsPage } from './claims-list';

describe('<ClaimsPage/>', () => {

  it('should render without crashing', () => {
    shallow(<ClaimsPage claims={[]}/>);

  });
  
  it('item Id should initially be null', () => {
    const wrapper = shallow(<ClaimsPage claims={[]}/>);
    expect(wrapper.state().itemId).toBe(null);
  });

  it('should set value on item id state property when displayItem method called', () => {
    const wrapper = shallow(<ClaimsPage claims={[]}/>);
    wrapper.instance().displayItem('123456');
    expect(wrapper.state().itemId).toEqual('123456');

  });

  it('should render Claim component when itemId is non null', () => {
    const wrapper = shallow(<ClaimsPage claims={[]}/>);
    wrapper.instance().displayItem('123456');
    wrapper.update();
    expect(wrapper.find('Connect(Claim)').length).toBe(1);
  });

  it('should not render Claim component initially', () => {
    const wrapper = shallow(<ClaimsPage claims={[]}/>);
    expect(wrapper.find('Connect(Claim)').length).toBe(0);
  });

});