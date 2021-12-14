import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const SignIn = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/');
	};
	return (
		<Container className="mt-5">
			<Row className="justify-content-center m-auto w-75">
				<Col lg={8}>
					<Card className="py-5 px-5">
						<Form>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									autoComplete="on"
									type="email"
									placeholder="Enter email"
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									autoComplete="on"
									type="password"
									placeholder="Password"
								/>
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								onClick={handleLogin}>
								Sign In
							</Button>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default SignIn;
