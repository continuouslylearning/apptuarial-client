import React from 'react';
import { shallow } from 'enzyme';
import { Claim } from './claim';
import { formatDate } from '../../utils/utils';

describe('<Claim/>', () => {

  const id = '1234';
  const policyId = '5678';
  const status = 'OPEN';
  const accidentDate = new Date();
  const caseReserve = 1000;
  const paidLoss = 1000;

  const claimInfo = {
    id,
    policyId,
    status,
    accidentDate,
    caseReserve,
    paidLoss  
  };

  const transactions = [{
    transactionDate: new Date(),
    lossPayment: 1000,
    caseReserve: 1000
  }];

  it('renders without crashing', () => {
    shallow(<Claim claim={claimInfo} transactions={transactions}/>);
  });

  it('renders a close button and delete button', () => {
    const wrapper = shallow(<Claim claim={claimInfo} transactions={transactions}/>);
    const closeButtons = wrapper.find('button.close');
    const deleteButtons = wrapper.find('button.delete');
    expect(closeButtons.length).toBe(1);
    expect(deleteButtons.length).toBe(1);
  });

  it('renders 1 h2 and 6 p\'s', () => {
    const wrapper = shallow(<Claim claim={claimInfo} transactions={[]}/>);
    const h2s = wrapper.find('h2');
    const ps = wrapper.find('p');
    expect(h2s.length).toBe(1);
    expect(ps.length).toBe(6);
  });

  it('renders correct claim info', () => {
    const wrapper = shallow(<Claim claim={claimInfo} transactions={transactions}/>);
    const h2s = wrapper.find('h2');
    const ps = wrapper.find('p');
    expect(h2s.text()).toEqual(`Claim #${id}`);
    expect(ps.at(0).text()).toEqual(`Policy Id: ${policyId}`);
    expect(ps.at(1).text()).toEqual(`Accident Date: ${formatDate(accidentDate)}`);
    expect(ps.at(2).text()).toEqual(`Status: ${status}`);
    expect(ps.at(3).text()).toEqual(`Paid Loss: ${paidLoss}`);
    expect(ps.at(4).text()).toEqual(`Case Reserve: ${caseReserve}`);
    expect(ps.at(5).text()).toEqual(`Number of Transactions: ${transactions.length}`);
  });
});