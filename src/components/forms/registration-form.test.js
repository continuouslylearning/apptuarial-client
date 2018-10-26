import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationForm} from './registration-form';
import { login } from '../../actions/auth';
import { registerUser } from '../../actions/users';

jest.mock('../../actions/auth');
jest.mock('../../actions/users');
login.mockImplementation(() => {
  return {
    type: 'LOGIN'
  };
});
registerUser.mockImplementation(() => {
  return {
    type: 'REGISTER_USER'
  };
});


describe('<RegistrationForm/>', () => {
  const dispatch = jest.fn().mockImplementation(() => Promise.resolve());

  it('should render without crashing', () => {
    shallow(<RegistrationForm/>);
  });
  
  it('should render the form when loggedIn prop is false', () => {
    const wrapper = shallow(<RegistrationForm loggedIn={false}/>);
    const form = wrapper.find('ReduxForm');
    expect(form.length).toBe(1);
  });

  it('should render Redirect component when loggedIn is true', () => {
    const wrapper = shallow(<RegistrationForm loggedIn={true}/>);
    const redirect = wrapper.find('Redirect');
    expect(redirect.length).toBe(1);
  });

  it('should dispatch register user and login actions when registerUser method is called', () => {
    const user = { username: 'anonymous', password: 'password'};
    const wrapper = shallow(<RegistrationForm loggedIn={false} dispatch={dispatch}/>);
    return wrapper.instance().registerUser(user)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: 'REGISTER_USER'
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: 'LOGIN'
        });
      });
  });
});