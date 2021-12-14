import { BASE_URL } from './consts';

export const getTweets = async () => {
	try {
		const resp = await fetch(`${BASE_URL}/posts`);
		const data = await resp.json();
		return data;
	} catch (err) {
		return err;
	}
};
