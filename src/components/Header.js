import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useRouter } from 'next/router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Expense Tracker</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <div className='d-flex flex-row-reverse mr-2'>
      <Collapse isOpen={isOpen} navbar>
      <Nav navbar>
          <NavItem>
              <NavLink href="/" className={router.pathname === '/' ? 'active' : ''}>Dashboard</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/expense" className={router.pathname === '/expense' ? 'active' : ''}>Expenses</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/categories" className={router.pathname === '/categories' ? 'active' : ''}>Categories</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;