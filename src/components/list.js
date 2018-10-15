import React from 'react';

export default () => Component => {

  function List(props){
    const options = { year: 'numeric', day: 'numeric', month: 'long' };
    const data = props.data;
    const list = data.map(item => <Component item={item} options={options}/>);

    return(
      <ul>
        {list}
      </ul>
    );
  }

  return List;
};