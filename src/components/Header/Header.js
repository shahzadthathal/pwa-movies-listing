import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import logo from '../../logo.svg';
import {ACCESS_TOKEN_NAME} from '../../constants/constants';

import {
	Container,
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
//import { Link, Route, Switch } from "react-router-dom";


function Header(props) {
	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	function renderOnBoardMethods() {
		//APPLY OTHER LOGIC
		if(localStorage.getItem(ACCESS_TOKEN_NAME)){
			return(
				<Nav className="ml-auto" navbar>
	            	<NavItem>
						<NavLink href="#" onClick={() => handleProfile()}>Profile</NavLink>
				  	</NavItem>
				  	<NavItem>
						<NavLink href="#" onClick={() => handleLogout()}>Logout</NavLink>
				  	</NavItem>
				</Nav>
            )
		}else{
			return(
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink  href="/signup">Signup</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/login">Login</NavLink>
					</NavItem>
				</Nav>
			 )
		}

        //if(props.location.pathname === '/profile'){}


    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/home')
    }
    function handleProfile() {
        props.history.push('/profile')
    }
    

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
					{renderOnBoardMethods()}
				</Collapse>
		 </Navbar>
    )
}

export default withRouter(Header);
