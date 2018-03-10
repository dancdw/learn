import React from 'react';
import FilterLink from '../containers/FilterLink';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom'

const Footer = ({ match }) => (
  <p>
    Show:
    {' '}
    <NavLink
      to={'/pageOne/SHOW_ALL'}
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >
      All
    </NavLink>
    {', '}
    <NavLink
      to={'/pageOne/SHOW_ACTIVE'}
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >
      Active
    </NavLink>
    {', '}
    <NavLink
      to={'/pageOne/SHOW_COMPLETED'}
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
    >
      Completed
    </NavLink>
  </p>
);

export default Footer;