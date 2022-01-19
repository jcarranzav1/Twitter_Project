import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../apis/users';
import { useDispatch } from '../store/Store';
import { types } from '../types/types';

export const useUsers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function submitUser(body) {
		console.log(body);
		try {
			setLoading(true);
			setError('');
			const { data } = await signIn(body);
			console.log(data);
			const action = {
				type: types.signin,
				payload: {
					username: data.username,
					email: data.email,
					name: data.name,
					lastname: data.lastname,
				},
			};

			dispatch(action);
			setLoading(false);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Error');
		} finally {
			setLoading(false);
		}
	}

	return [{ loading, error }, submitUser];
};
