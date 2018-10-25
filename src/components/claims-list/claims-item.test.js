import React from 'react';
import { shallow } from 'enzyme';
import { ClaimItem } from './claim-item';
import { formatDate } from '../../utils/utils';

describe('<ClaimItem/>', () => {

  const claimInfo = {
    id: '1234',
    policyId: '5678',
    status: 'OPEN',
    accidentDate: new Date(),
    caseReserve: 1000,
    paidLoss: 1000
  };

  it('renders without crashing', () => {
    shallow(<ClaimItem item={claimInfo}/>);
  });

  it('should render one h3 and 5 p elements', () => {
    const wrapper = shallow(<ClaimItem item={claimInfo}/>);
    const h3 = wrapper.find('h3');
    const ps = wrapper.find('p');
    expect(h3.length).toBe(1);
    expect(ps.length).toBe(5);
  });

  it('should render info passed in as prop', () => {
    const { id, policyId, status, accidentDate, caseReserve, paidLoss } = claimInfo;
    const wrapper = shallow(<ClaimItem item={claimInfo}/>);
    const h3 = wrapper.find('h3');
    const ps = wrapper.find('p');
    expect(h3.text()).toEqual(`Claim Id: ${id}`);
    expect(ps.at(0).text()).toEqual(`Policy Id: ${policyId}`);
    expect(ps.at(1).text()).toEqual(`Status: ${status}`);
    expect(ps.at(2).text()).toEqual(`Accident Date: ${formatDate(accidentDate)}`);
    expect(ps.at(3).text()).toEqual(`Case Reserve: ${caseReserve}`);
    expect(ps.at(4).text()).toEqual(`Paid Loss: ${paidLoss}`);
  });
});