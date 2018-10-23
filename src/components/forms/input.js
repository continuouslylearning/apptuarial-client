import React from 'react';

export default function Input(props){
  
  const { element, label, type, children, input, min } = props;
  const name = input.name;
  const { touched, error } = props.meta;
  const Element = element || 'input';
  const errorMessage = (touched && error) ? <span className='error'>{error}</span> : null;

  return (
    <div className='input' aria-live='polite'>
      <label htmlFor={name}>{label}</label>
      {errorMessage}
      <Element className='field' {...input} id={name} min={min} type={type}>{children}</Element>
    </div>
  );
}

