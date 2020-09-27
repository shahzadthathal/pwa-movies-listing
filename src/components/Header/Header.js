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
			<NavItem>
			  <NavLink href="/">All Movies</NavLink>
			</NavItem>
			<NavItem>
			  <NavLink href="/">All Reviews</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
			  <DropdownToggle nav caret>
				Movies by Category
			  </DropdownToggle>
			  <DropdownMenu right>
				<DropdownItem>
				  Popular Movies
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
				  Top Rated Movies
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
				  Upcoming Movies
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


    //    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	// 	  <a class="navbar-brand" href="#">PWA Movies Listing</a>
	// 	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
	// 	    <span class="navbar-toggler-icon"></span>
	// 	  </button>
	// 	  <div class="collapse navbar-collapse" id="navbarText">
	// 	    <ul class="navbar-nav mr-auto">
	// 	      <li class="nav-item active">
	// 	        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
	// 	      </li>
	// 	      <li class="nav-item">
	// 	        <a class="nav-link" href="#">Signup</a>
	// 	      </li>
	// 	      <li class="nav-item">
	// 	        <a class="nav-link" href="#">Login</a>
	// 	      </li>
	// 	    </ul>
	// 	    <span class="navbar-text">
	// 	      Navbar text with an inline element
	// 	    </span>
	// 	  </div>
	// 	</nav>
    )
}
export default Header;