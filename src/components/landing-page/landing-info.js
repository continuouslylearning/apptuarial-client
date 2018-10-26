import React from 'react';
import './info.css';

export default function Info(){

  return (
    <section className='info' role='contentinfo'>
      <div className='box'>
        <p>Insert your policy and claims records into the database</p>
      </div>
      <div className='box'>
        <p>View, sort and filter your policy and claims data</p>
      </div>
      <div className='box'>
        <p>Compute premium and loss ratios on your policy and claims data</p>
      </div>
    </section>
  );
}