import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

const Navigation = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	function onSignOut() {
		setUser({ type: types.signout });
		navigate('/');
	}
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand className=" ms-5 fs-3" as={Link} to="/">
					React Twitter
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto me-5 fs-5">
						{user?.logged ? (
							<>
								<Nav.Link as={Link} to="/profile">
									{user.username}
								</Nav.Link>
								<Nav.Link onClick={onSignOut}>
									Sign Out
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={Link} to="/signup">
									Sign Up
								</Nav.Link>
								<Nav.Link as={Link} to="/signin">
									Sign In
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default Navigation;
