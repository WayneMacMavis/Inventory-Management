import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" activeClassName="active" className="nav-link">Editors Page</NavLink>
      <NavLink to="/stock-take" activeClassName="active" className="nav-link">Stock Take Page</NavLink>
      <NavLink to="/procurement" activeClassName="active" className="nav-link">Procurement Page</NavLink>
    </nav>
  );
}

export default Navigation;
