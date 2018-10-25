import { registerUser } from './users';
import { API_BASE_URL } from '../config';

describe('Register user action', () => {

  it('should make post request with Fetch', () => {
    const user = {
      username: 'anonymous',
      password: 'password'
    };

    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json(){
          return user;
        }
      })
    );

    return registerUser(user)()
      .then(() => {
        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
      });
  });

});