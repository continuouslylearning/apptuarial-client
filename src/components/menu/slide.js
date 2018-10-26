import React from 'react';
import './slide.css';

export default function Slide(props){
  const { title, desc } = props;
  
  return (
    <div className='slide'>
      <h3>{title}</h3>
      <p>{desc}</p>
      {props.children}
    </div>
  );
}