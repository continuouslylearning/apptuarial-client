import jwt from 'jsonwebtoken';
import { addClaim, deleteClaim, updateClaim, fetchClaims, fetchClaimsSuccess, FETCH_CLAIMS_SUCCESS } from './claims';
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

  describe('Add claim action', () => {

    it('should make a POST fetch request', () => {

      const claim = {
        accidentDate: new Date(),
        caseReserve: 1000
      };
  
      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );
  
      return addClaim(claim)(dispatch, getState)
        .then(() => {
          expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/claims`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(claim)
          });
        });
    });

  });

  describe('Delete claim action', () => {
    const id = '5bd1726682949815a487c46a';

    it('should make a DELETE request with fetch', () => {

      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );

      return deleteClaim(id)(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/claims/${id}`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'DELETE',
            headers: { Authorization: `Bearer ${authToken}`}
          });
        });
    });

  });

  describe('Update claim action', () => {
    const id = '5bd1726682949815a487c46a';

    it('should make PUT request with Fetch', () => {
      const update = {
        id,
        transactions: []
      };
      
      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );

      return updateClaim(update)(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/claims/${id}`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'PUT',
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
          });
        });

    });
  });

  describe('Fetch claims action', () => {
    it('should make GET request with fetch', () => {
      global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json(){
          }
        })
      );
      
      return fetchClaims()(dispatch, getState)
        .then(() => {
          expect(fetch.mock.calls.length).toBe(1);
          expect(fetch.mock.calls[0][0]).toEqual(`${API_BASE_URL}/api/claims`);
          expect(fetch.mock.calls[0][1]).toEqual({
            method: 'GET', 
            headers: { Authorization: `Bearer ${authToken}`}
          });
        });

    });
  });

  describe('Fetch claims succes action', () => {

    it('should return the correction action', () => {
      const claims = [];
      const action = fetchClaimsSuccess(claims);
      expect(action).toEqual({
        type: FETCH_CLAIMS_SUCCESS,
        claims
      });
    });
  });
});

