import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../apis/users';

import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

export const useUsers = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function submitUser(body) {
		try {
			setLoading(true);
			setError('');
			const { data } = await signIn(body);

			const action = {
				type: types.signin,
				payload: {
					username: data.username,
					email: data.email,
					name: data.name,
					lastname: data.lastname,
				},
			};

			setUser(action);

			navigate('/');
		} catch (err) {
			setError(err.message || 'Error');
		} finally {
			setLoading(false);
		}
	}

	return [{ loading, error }, submitUser];
};
