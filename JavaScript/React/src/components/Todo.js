import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, clicked, title, onDel }) => (
  <li
    style={ {
      textDecoration: clicked ? 'line-through' : 'none'
    }}
  >
    
    <span onClick={onClick}>{title}</span>
    

    <span onClick={onDel} style={{margin:"0 20px"}}>X</span>
  </li>
);

export default Todo;