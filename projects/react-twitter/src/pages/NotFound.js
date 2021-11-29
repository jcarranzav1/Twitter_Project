import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const NotFound = () => {
	const LinkWrapper = styled(Link)((props) => ({
		minWidth: '12rem',
		margin: '0 auto 20px',
		padding: props.primary ? 18 : 16,
		borderRadius: 5,
		textDecoration: 'none',
		border: props.primary ? 'none' : '3px solid currentColor',
		background: props.primary && 'linear-gradient(90deg, #D26AC2, #46C9E5)',
		color: props.primary ? '#1D2029' : '#D26AC2',
		'&:hover': {
			opacity: '0.95',
		},
	}));
	return (
		<Container className="my-4">
			<Row className="justify-content-center">
				<Col lg={8}>
					<div className="d-flex flex-column align-items-center">
						<h1 className="mb-4">Not Found</h1>
						<p>
							<LinkWrapper primary to="/">
								Return Home
							</LinkWrapper>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
export default NotFound;
