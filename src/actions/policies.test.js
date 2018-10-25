import jwt from 'jsonwebtoken';
import { addPolicy, deletePolicy, fetchPolicies, fetchPoliciesSuccess, FETCH_POLICIES_SUCCESS } from './policies';
import { API_BASE_URL } from '../config';

describe('Claims actions', () => {
  const JWT_SECRET = 'secret';
  const user = { username: 'anonymous' };
  const authToken = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
  const dispatch = jest.fn();
  const getState = jest.fn().mockImplementation(() => {
    return {
      auth: {
        authToken
      }
    }; 
  });

  beforeEach(() => {
    dispatch.mockClear();
    getState.mockClear();
  });

  describe('Add policy action', () => {

    it('should make a POST fetch request', () => {

      const policy = {
        effectiveDate: new Date(),
        expirationDate: new Date(2019, 0),
        premium: 1000,
        exposures: 1
      };
  
      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );
  
      return addPolicy(policy)(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/policies`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(policy)
          });
        });
    });

  });

  describe('Delete policy action', () => {
    const id = '5bd1726682949815a487c46a';

    it('should make a DELETE request with fetch', () => {

      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );

      return deletePolicy(id)(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/policies/${id}`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'DELETE',
            headers: { Authorization: `Bearer ${authToken}`}
          });
        });
    });

  });

  describe('Fetch policies action', () => {
    it('should make GET request with fetch', () => {
      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );
      
      return fetchPolicies()(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/policies`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'GET', 
            headers: { Authorization: `Bearer ${authToken}`}
          });
        });

    });
  });

  describe('Fetch policies success action', () => {

    it('should return the correction action', () => {
      const policies = [];
      const action = fetchPoliciesSuccess(policies);
      expect(action).toEqual({
        type: FETCH_POLICIES_SUCCESS,
        policies
      });
    });
  });
});

