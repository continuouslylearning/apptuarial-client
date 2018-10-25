import React from 'react';
import { shallow } from 'enzyme';
import { BaseForm } from './form';

describe('<BaseForm/>', () => {

  it('renders without crashing', () => {
    const handleSubmit = jest.fn(); 
    shallow(<BaseForm handleSubmit={handleSubmit}/>);
  });

  it('renders a form and submit button', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit}/>);
    const forms = wrapper.find('form');
    const buttons = wrapper.find('button');
    expect(forms.length).toEqual(1);
    expect(buttons.length).toEqual(1);
  });

  
  it('showSuccess state property is initially false', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit}/>);
    expect(wrapper.state().showSuccess).toEqual(false);
  });

  it('form is disabled initially', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit} pristine={true} submitting={false}/>);
    const button = wrapper.find('button');
    expect(button.props().disabled).toEqual(true);
  });

  it('calls handleSubmit on click event', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit}/>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should render correct title', () => {
    const title = 'correct title';
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit} title={title}/>);
    expect(wrapper.find('h2').text()).toEqual(title);
  });

  it('button should be enabled when pristine is false and submitting is false', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<BaseForm handleSubmit={handleSubmit} pristine={false} submitting={false}/>);
    const button = wrapper.find('button');
    expect(button.props().disabled).toEqual(false);

  });

});