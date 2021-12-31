import http from './http';
import { clearSession, setSession } from './session';

export async function signIn(payload) {
	try {
		/* const resp = await fetch(`${BASE_URL}/users/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const data = await resp.json(); */

		const { data: response } = await http.post('/users/signin', payload);
		const { meta } = response;
		const { token } = meta;
		setSession(token);
		return response;
	} catch (error) {
		return error;
	}
}

export function signOut() {
	clearSession();
}
