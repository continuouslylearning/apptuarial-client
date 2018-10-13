import React from 'react';

export default function Input(props){
  const Element = props.element || 'input';
  
  const error = props.meta.error ? <div>{props.meta.error}</div> : null;

  return (
    <div>
      {error}
      <Element {...props.input} id={props.id} type={props.type}/>
    </div>
  );
}

