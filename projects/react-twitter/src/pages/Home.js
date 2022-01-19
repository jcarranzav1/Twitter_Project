import React, { useContext } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import NewTweet from '../components/NewTweet';
import { Tweet } from '../components/Tweet';
import { useTweets } from '../hooks/useTweets';
import Store from '../store/Store';

const Home = () => {
	const [response, , submitTweet] = useTweets();
	const { tweets, loading, error } = response;
	const { state } = useContext(Store);
	const { user } = state;

	return (
		<Container className="my-3">
			<Row className="justify-content-center">
				<Col lg={6}>
					{error && <Alert variant="danger">{error}</Alert>}
					{loading && <Spinner animation="border" />}
					{user?.username && <NewTweet onSubmit={submitTweet} />}
					{tweets.map((tweet) => {
						return <Tweet key={tweet.id} {...tweet} />;
					})}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
