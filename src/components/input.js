import React from 'react';

export default function Input(props){
  const { element, label, name, type, children, input, min } = props;
  const { touched, error } = props.meta;
  const Element = element || 'input';
  const errorMessage = (touched && error) ? <span className='error'>{error}</span> : null;
  return (
    <div className='input'>
      <label htmlFor={name}>{label}</label>
      {errorMessage}
      <Element className='field' {...input} id={name} min={min} type={type}>{children}</Element>
    </div>
  );
}

