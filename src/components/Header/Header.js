import React, { useState } from 'react';
import logo from '../../logo.svg';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
  } from 'reactstrap';
import { Link, Route, Switch } from "react-router-dom";


function Header(props) {
	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);
    return(

		<Navbar color="light" light expand="md">
		<NavbarBrand href="/"><img src={logo}  alt="PWA App 2020" width="60" height="40" /></NavbarBrand>
		<NavbarToggler onClick={toggleNavbar} />
		<Collapse isOpen={!collapsed} navbar>
		  <Nav className="mr-auto" navbar>
			<UncontrolledDropdown nav inNavbar>
			  <DropdownToggle nav caret>
				Movies by Category
			  </DropdownToggle>
			  <DropdownMenu right>
			  	<DropdownItem>
					<NavLink  href="/latest-movies">Latest Movie</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<NavLink  href="/popular-movies">Popular Movies</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
					<NavLink  href="/top-rated-movies">Top Rated Movies</NavLink>
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
				  <NavLink  href="/upcoming-movies">Upcoming Movies</NavLink>
				</DropdownItem>
			  </DropdownMenu>
			</UncontrolledDropdown>

		  </Nav>
		  <Nav className="ml-auto" navbar>
			<NavItem>
				<NavLink  href="/signup">Signup</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink href="/login">Login</NavLink>
			  </NavItem>
		  </Nav>
		</Collapse>
	  </Navbar>


    )
}
export default Header;