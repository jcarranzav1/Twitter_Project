import { useEffect, useState } from 'react';
import { createTweets, getTweets } from '../apis/tweets';

export const useTweets = () => {
	const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function loadTweets() {
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

	async function submitTweet(body) {
		try {
			setLoading(true);
			setError('');
			await createTweets(body);
		} catch (err) {
			setError(err.message || 'Error');
		} finally {
			setLoading(false);
			await loadTweets();
		}
	}

	useEffect(() => {
		loadTweets();
	}, []);

	return [{ tweets, loading, error }, loadTweets, submitTweet];
};
