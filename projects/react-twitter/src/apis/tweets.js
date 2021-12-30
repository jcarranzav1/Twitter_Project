import { BASE_URL } from './consts';

export const getTweets = async () => {
	try {
		const resp = await fetch(`${BASE_URL}/tweets`);
		const payload = await resp.json();
		return payload;
	} catch (err) {
		return err;
	}
};

export const createTweets = async (body) => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjM3MjBjYjQxZGI2YzE2NTU4MWQwZSIsImlhdCI6MTYzOTkzOTMyMiwiZXhwIjoxNjM5OTQyOTIyfQ.ouELKtP-IyMnWMCKU5H5FGkarQz57UqNVb60FEpieGg';
	try {
		const resp = await fetch(`${BASE_URL}/tweets`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		const payload = await resp.json();
		return payload;
	} catch (err) {
		return err;
	}
};
