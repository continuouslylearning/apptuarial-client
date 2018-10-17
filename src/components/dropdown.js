import React from 'react';
import { Link, Router } from 'react-router-dom';
import './dropdown.css';

export default function DropdownMenu(props){

  return (
    <nav className='nav'>
      <ul>
        <Link to='/dashboard/policies/list'>View Policies</Link>
        <Link to='/dashboard/claims/list'>View Claims</Link>
      </ul>
    </nav>

  );
}