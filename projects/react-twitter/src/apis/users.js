import { BASE_URL } from './consts';

export async function signIn(payload) {
	try {
		const resp = await fetch(`${BASE_URL}/users/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const data = await resp.json();
		return data;
	} catch (error) {
		return error;
	}
}
