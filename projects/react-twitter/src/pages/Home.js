import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { createTweets, getTweets } from '../apis/tweets';
import NewTweet from '../components/NewTweet';
import { Tweet } from '../components/Tweet';

const Home = () => {
	const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function load() {
		try {
			setLoading(true);
			setError('');

			const { data } = await getTweets();
			setTweets(data);
		} catch (err) {
			setError(err.message || 'Error');
		} finally {
			setLoading(false);
		}
	}
	async function onSubmit(body) {
		try {
			setLoading(true);
			setError('');
			await createTweets(body);
		} catch (err) {
			setError(err.message || 'Error');
		} finally {
			setLoading(false);
			load();
		}
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<Container className="my-3">
			<Row className="justify-content-center">
				<Col lg={6}>
					{error && <Alert variant="danger">{error}</Alert>}
					{loading && <Spinner animation="border" />}
					<NewTweet onSubmit={onSubmit} />
					{tweets.map((tweet) => {
						return <Tweet key={tweet.id} {...tweet} />;
					})}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
