import React from 'react';

export default class Sort extends React.Component {
  
  sort(e){
    this.props.setSortField(e.target.value);
  }

  setDirection(e){
    this.props.setDirection(e.target.value);
  }

  toggleFilter(e){
    this.props.toggleFilter(e.target.checked);
  }

  search(e){
    this.props.search(e.target.value);
  }

  render(){
    const { sortField, isAscending, hide, title, searchPlaceHolder, checkboxLabel, searchTerm } = this.props;
    const options = this.props.options.map(({ text, value}, index) => <option key={index} value={value}>{text}</option>);
    
    return (
      <div>
        <h2>{title}</h2>
        <div className='sort-area'>
          <label htmlFor='sort'>Sort By</label>
          <div className='dropdown'>
            <select id='sort' value={sortField} onChange={e => this.sort(e)}>
              {options}
            </select>
            <select id='direction' value={isAscending} onChange={e => this.setDirection(e)}>
              <option value='true'>Ascending</option>
              <option value='false'>Descending</option>
            </select>
            <input type='text' className='search' value={searchTerm} onChange={e => this.search(e)}placeholder={searchPlaceHolder}/>
          </div>
          <label htmlFor='checkbox'>{checkboxLabel}</label>
          <input type='checkbox' id='checkbox' checked={hide} onChange={e=> this.toggleFilter(e)}/>
        </div>
      </div>
    );
  }
}