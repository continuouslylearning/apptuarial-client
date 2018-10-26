export const policies = [
  { id: '5bc4f03654190e1d702ea470', effectiveDate: new Date(2017, 0, 1), expirationDate: new Date(2018, 0, 1), premium: 5000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea471', effectiveDate: new Date(2017, 1, 1), expirationDate: new Date(2018, 1, 1), premium: 4000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea472', effectiveDate: new Date(2016, 0, 1), expirationDate: new Date(2017, 0, 1), premium: 3000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea473', effectiveDate: new Date(2015, 0, 1), expirationDate: new Date(2016, 0, 1), premium: 2000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea474', effectiveDate: new Date(2014, 0, 1), expirationDate: new Date(2015, 0, 1), premium: 1500, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea475', effectiveDate: new Date(2014, 6, 1), expirationDate: new Date(2015, 6, 1), premium: 3500, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea476', effectiveDate: new Date(2015, 0, 1), expirationDate: new Date(2016, 0, 1), premium: 6000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea477', effectiveDate: new Date(2016, 0, 1), expirationDate: new Date(2017, 0, 1), premium: 7000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea478', effectiveDate: new Date(2016, 5, 1), expirationDate: new Date(2017, 5, 1), premium: 5500, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea479', effectiveDate: new Date(2017, 0, 1), expirationDate: new Date(2017, 9, 1), premium: 4000, exposures: 1, userId: '5bc174e565a2e61e44079101' },
  { id: '5bc4f03654190e1d702ea47a', effectiveDate: new Date(2018, 0, 1), expirationDate: new Date(2018, 9, 1), premium: 4000, exposures: 1, userId: '5bc174e565a2e61e44079101' }
];

export const claims = [
  { accidentDate: new Date(2018, 5), status: 'CLOSED', policyId: '5bc4f03654190e1d702ea47a',
    transactions: [
      { transactionDate: new Date(2018, 6), caseReserve: 2000, lossPayment: 0 }, 
      { transactionDate: new Date(2019, 0), caseReserve: 0, lossPayment: 1200 },
      { transactionDate: new Date(2018, 9), caseReserve: 1200, lossPayment: 800 }
    ], 
    userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea47a', accidentDate: new Date(2018, 1), status: 'OPEN', transactions: [{ transactionDate: new Date(2018, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea470', accidentDate: new Date(2017, 3), status: 'OPEN', transactions: [{ transactionDate: new Date(2017, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea472', accidentDate: new Date(2016, 2), status: 'OPEN', transactions: [{ transactionDate: new Date(2016, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea473', accidentDate: new Date(2015, 3), status: 'OPEN', transactions: [{ transactionDate: new Date(2015, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea476', accidentDate: new Date(2015, 0), status: 'OPEN', transactions: [{ transactionDate: new Date(2015, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea477', accidentDate: new Date(2016, 1), status: 'OPEN', transactions: [{ transactionDate: new Date(2016, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea479', accidentDate: new Date(2017, 1), status: 'OPEN', transactions: [{ transactionDate: new Date(2017, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea474', accidentDate: new Date(2014, 5), status: 'OPEN', transactions: [{ transactionDate: new Date(2014, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea474', accidentDate: new Date(2014, 1), status: 'OPEN', transactions: [{ transactionDate: new Date(2014, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea478', accidentDate: new Date(2016, 0), status: 'OPEN', transactions: [{ transactionDate: new Date(2016, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea471', accidentDate: new Date(2017, 0), status: 'OPEN', transactions: [{ transactionDate: new Date(2017, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
  { policyId: '5bc4f03654190e1d702ea47a', accidentDate: new Date(2018, 0), status: 'OPEN', transactions: [{ transactionDate: new Date(2018, 6), caseReserve: 1000, lossPayment: 0}], userId: '5bc174e565a2e61e44079101'},
];