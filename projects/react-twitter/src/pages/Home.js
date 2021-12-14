import React from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Tweet } from '../components/Tweet';
import useTweets from '../hooks/useTweets';

const Home = () => {
	const { data: tweets = [], loading = false, error = '' } = useTweets();
	console.log(tweets);
	return (
		<Container className="my-4">
			<Row className="justify-content-center">
				<Col lg={6}>
					{loading && <Spinner animation="border" />}
					{error && <Alert variant="danger">{error}</Alert>}
					{tweets.map((tweet) => {
						return <Tweet key={tweet.id} title={tweet.title} />;
					})}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
