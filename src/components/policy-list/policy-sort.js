import React from 'react';
import { connect } from 'react-redux';
import PolicyItem from './policy-item';
import Policy from './policy';
import List from '../list';
import { setFilter, setDirection, toggleCheckbox} from '../../actions/filter';
import '../list.css';

const PolicyList = List()(PolicyItem);

class PoliciesPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      itemId: null, 
      searchTerm: ''
    };
  }

  sort(e){
    const filter = e.target.value;
    this.props.dispatch(setFilter(filter));
  }

  setDirection(e){
    const ascending = e.target.value;
    this.props.dispatch(setDirection(ascending));
  }

  toggleChecked(e){
    const checked = e.target.checked;
    this.props.dispatch(toggleCheckbox(checked));
  }

  displayItem(itemId){
    this.setState({
      itemId
    });
  }

  render(){
    const { filter, checked, ascending, factor, policies } = this.props;

    const itemId = this.state.itemId;
    let list = this.state.searchTerm
      ? policies.filter(({ id }) => id.toLowerCase().includes(this.state.searchTerm.toLowerCase())) 
      : policies.slice();
 
    list = checked 
      ? list.filter(policy => policy.expirationDate >= new Date()) 
      : list;

    if(filter === 'effective') {
      list.sort((a, b) => (b.effectiveDate - a.effectiveDate) * factor);
    } else if(filter === 'premium') {
      list.sort((a, b) => (b.premium - a.premium) * factor);
    } else {
      list.sort((a, b) => (b.exposures - a.exposures) * factor);
    }
 
    return (
      
      <div className='sort-area'>
        <label htmlFor='sort'>Sort By</label>
        <div className='dropdown'>
          <select id='sort' value={filter} onChange={e => this.sort(e)}>
            <option value='effective'>Effective Date</option>
            <option value='premium'>Premium</option>
            <option value='exposure'>Exposure</option>
          </select>
          <select id='direction' value={ascending} onChange={e => this.setDirection(e)}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
          <input type='text' className='search' value={this.state.searchTerm} 
            onChange={e => this.setState({searchTerm : e.target.value })} placeholder='Search by Policy Id'
          />
        </div>

        <label htmlFor='checkbox'>Show only non-expired policies</label>
        <input type='checkbox' id='checkbox' checked={checked} onChange={e=> this.toggleChecked(e)}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { checked, ascending, filter, displayedPolicy } = state.policyFilter;
  return {
    policies: state.policies ? state.policies : [],
    displayedPolicy,
    checked,
    filter,
    ascending,
    factor: ascending === 'true' ? -1 : 1
  };
};

export connect(mapStateToProps)(PoliciesPage);


export default (namespace) => {

  class Sort extends React.Component {
    
    sort(e){
      const filter = e.target.value;
      this.props.dispatch(setFilter(filter));
    }

    setDirection(e){
      const ascending = e.target.value;
      this.props.dispatch(setDirection(ascending));
    }

    toggleChecked(e){
      const checked = e.target.checked;
      this.props.dispatch(toggleCheckbox(checked));
    }

    displayItem(itemId){
      this.setState({
        itemId
      });
    }
    render(){

      return(
        <div className='sort-container'>
          <label htmlFor='sort'>Sort By</label>
          <div className='dropdown'>
            <select id='sort' value={filter} onChange={e => this.sort(e)}>
              <option value='effective'>Effective Date</option>
              <option value='premium'>Premium</option>
              <option value='exposure'>Exposure</option>
            </select>
            <select id='direction' value={ascending} onChange={e => this.setDirection(e)}>
              <option value='true'>Ascending</option>
              <option value='false'>Descending</option>
            </select>
            <input type='text' className='search' value={this.state.searchTerm} 
              onChange={e => this.setState({searchTerm : e.target.value })} placeholder='Search by Policy Id'
            />
          </div>

          <label htmlFor='checkbox'>Show only non-expired policies</label>
          <input type='checkbox' id='checkbox' checked={checked} onChange={e=> this.toggleChecked(e)}/>
        </div>
      );
    }
  }
}