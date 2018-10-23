import React from 'react';
import { Bar } from 'react-chartjs';

export default function Chart(props){

  const { labels, label, dataset } = props;
  
  const data = {
    labels,
    datasets: [{
      label,
      fillColor: 'rgba(151,187,205,0.5)',
      data: dataset
    }]
  };

  return (
    <div className='chart'>
      <h3>{label}</h3>
      <Bar data={data} width={330} height={230}/>
    </div>
  );
}