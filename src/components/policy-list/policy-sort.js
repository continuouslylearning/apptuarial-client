import { connect } from 'react-redux';
import Sort from '../sort';
import { setPolicySortDirection, setPolicySortField, togglePolicyStatusFilter, policySearch } from '../../actions/policy-list';

const mapStateToProps = state => ({
  isAscending: state.policyList.isAscending,
  hide: state.policyList.hide,
  sortField: state.policyList.sortField, 
  searchTerm: state.policyList.searchTerm,
  title: 'POLICIES',
  options: [
    { value: 'effectiveDate', text: 'Effective Date'},
    { value: 'premium', text: 'Premium'},
    { value: 'exposures', text: 'Exposures'}
  ],
  checkboxLabel: 'Show only non-expired policies',
  searchPlaceHolder: 'Search by Policy Id'
});

const mapDispatchToProps = dispatch => ({
  setSortField: value => dispatch(setPolicySortField(value)),
  setDirection: value => dispatch(setPolicySortDirection(value)),
  toggleFilter: value => dispatch(togglePolicyStatusFilter(value)),
  search: value => dispatch(policySearch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);