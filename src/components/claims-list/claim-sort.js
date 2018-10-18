import { connect } from 'react-redux';
import Sort from '../sort';
import { setClaimsSortDirection, setClaimsSortField, toggleStatusFilter } from '../../actions/claims-list';

const mapStateToProps = state => {
  const { isAscending, hide, sortField } = state.claimsList;

  return {
    isAscending,
    hide,
    sortField, 
    title: 'CLAIMS',
    options: [
      { value: 'accidentDate', text: 'Accident Date'},
      { value: 'caseReserve', text: 'Case Reserve'},
      { value: 'paidLoss', text: 'Paid Loss'}
    ],
    checkboxLabel: 'Show only open claims',
    searchPlaceHolder: 'Search by Claim Id'
  };
};

const mapDispatchToProps = dispatch => ({
  setSortField: value => dispatch(setClaimsSortField(value)),
  setDirection: value => dispatch(setClaimsSortDirection(value)),
  toggleFilter: value => dispatch(toggleStatusFilter(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);