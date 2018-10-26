import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../../actions/auth';
import './dropdown.css';

class DropdownMenu extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }

  
  logout(){
    this.props.dispatch(clearAuth());
    localStorage.removeItem('authToken');
  }

  toggle(){
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render(){
    const open = this.state.open;

    return (
      <nav role='navigation' className='nav' onMouseLeave={() => this.toggle()}>
        <button className='menu-toggle' onClick={() => this.toggle()}>MENU</button> 
        <ul className={open ? 'open' : 'closed'}>
          <Link to='/dashboard/policies/list'>VIEW POLICIES</Link>
          <Link to='/dashboard/claims/list'>VIEW CLAIMS</Link>
          <Link to='/dashboard/policies/add'>ADD POLICY</Link>
          <Link to='/dashboard/claims/add'>CREATE CLAIM</Link>
          <Link to='/dashboard/claims/update'>ADJUST CLAIM</Link>
          <Link to='/dashboard/ratios'>COMPUTE RATIOS</Link>
          <button className='logout' onClick={() => this.logout()}>LOGOUT</button>
        </ul>
      </nav>

    );

  }
}

export default connect()(DropdownMenu);