import React, { Component } from 'react';

const Filter = props => {
  
  const { category, checked, setCategories } = props;

  const onCheckboxChange = e => {
    setCategories(e.target.name, e.target.checked);
  };

  return (
    <li className="ui checkbox" style={{ display: 'inline-block', width: '33.3333%'}}>
      <input type="checkbox" name={category} onChange={ onCheckboxChange } checked={checked}/>
      <label htmlFor={category}>{category}</label>
    </li>  
  );
};

export default Filter;