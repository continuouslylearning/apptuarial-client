import React from 'react';

export default function Input(props){
  const Element = props.element || 'input';
  
  const error = !props.meta.pristine && props.meta.error ? <span class='error'>{props.meta.error}</span> : null;

  return (
    <div class='input'>
      {error}
      <Element {...props.input} id={props.id} type={props.type}/>
    </div>
  );
}

