import React from 'react'
import {Link} from 'react-router';
import {AppBar, Tabs, Tab, Navbar, NavItem} from 'react-materialize';

export default class Nav extends React.Component {
  render() {
    return (
      <Navbar brand='logo' right >
        <NavItem href='get-started.html'>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
    </Navbar>
    )
  }
}