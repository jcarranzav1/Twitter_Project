import React from 'react';
import {
	Alert,
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';

import { useUsers } from '../../hooks/useUsers';

const SignIn = () => {
	const [data, submitUser] = useUsers();
	const { loading, error } = data;

	const onSubmit = (event) => {
		event.preventDefault();
		const { username, password } = event.target.elements;
		submitUser({
			username: username.value,
			password: password.value,
		});
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-center m-auto w-75">
				<Col lg={8}>
					<Card className="py-5 px-5">
						{error && <Alert variant="warning">{error}</Alert>}
						<Form onSubmit={onSubmit}>
							<Form.Group className="mb-3">
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" name="username" />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" />
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								disabled={loading}>
								{loading && (
									<Spinner
										animation="border"
										variant="light"
									/>
								)}
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
