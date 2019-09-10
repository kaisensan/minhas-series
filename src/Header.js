import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Header = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <Navbar color='light' light expand='md' className='mb-2'>
      <div className='container'>
        <NavbarBrand tag={Link} to={{
          pathname: '/home',
          state: { user }
        }}>
          Minhas Séries
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpen(!open)}/>
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink onClick={() => setOpen(false)} tag={Link} to={{
                pathname: '/series',
                state: { user }
              }}>
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => setOpen(false)} tag={Link} to={{
                pathname: '/genres',
                state: { user }
              }}>
                Gêneros
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='ml-5 text-light bg-dark' onClick={() => setOpen(false)} tag={Link} to='/'>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
