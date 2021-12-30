import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.signin:
			return {
				...action.payload,
				logged: true,
			};
		case types.signup:
			return {
				...action.payload,
				logged: true,
			};
		default:
			return state;
	}
};
