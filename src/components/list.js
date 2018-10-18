import React from 'react';

export default () => Component => {

  function List(props){

    const displayItem = props.displayItem;
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    
    const list = props.data.map(item => 
      <li key={item.id} className='item' onClick={() => displayItem(item.id)}>
        <Component item={item} options={options}/>
      </li>
    );

    return(
      <ul>
        {list}
      </ul>
    );
  }
  
  return List;
};