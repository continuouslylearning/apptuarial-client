import React from 'react';
import { connect } from 'react-redux';
import Carousel from '../carousel/carousel';
import './menu.css';

function Menu(){

  return (
    <ul className='menu'>
      {
        /* <Link className='item' to='/dashboard/policies/list'>View policies</Link>
      <Link className='item' to='/dashboard/policies/add'>Add a policy</Link>
      <Link className='item' to='/dashboard/claims/list'>View Claims</Link>
      <Link className='item' to='/dashboard/claims/update'>Adjust Claim</Link>
      <Link className='item' to='/dashboard/claims/add'>Add a claim</Link>
      <Link className='item' to='/dashboard/ratios'>Calculate ratios</Link> */}
      <Carousel/>
    </ul>
  );
}

export default connect()(Menu);