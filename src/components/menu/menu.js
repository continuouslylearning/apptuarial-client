import React from 'react';
import Slide from './slide';
import { Link } from 'react-router-dom';
import './menu.css';

export default class Carousel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      slideNumber: 0
    };
  }
  render(){

    return (
      <div className='menu'>
        <h2>Welcome</h2>
        <div className='slides'>
          <Slide title='Store your Insurance Data' desc='Insert your Policy and Claims records into the database'>
            <Link to='/dashboard/policies/add'><button>Add a Policy</button></Link>
            <Link to='/dashboard/claims/add'><button>Add a Claim</button></Link>
          </Slide>
          <Slide title='View your Data' desc='View, sort and filter your policy and claims records'>
            <Link to='/dashboard/policies/list'><button>View Policies</button></Link>
            <Link to='/dashboard/claims/list'><button>View Claims</button></Link>
          </Slide>
          <Slide title='Compute Ratios' desc='Compute loss and premium ratios on the last four years of your policy and claims data'>
            <Link to='/dashboard/ratios/'><button>Compute Ratios</button></Link>
          </Slide>
        </div>
      </div>
    );
  }
}