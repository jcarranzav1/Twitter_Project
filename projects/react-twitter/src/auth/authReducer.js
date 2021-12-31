import { signOut } from '../apis/users';
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
		case types.signout:
			signOut();
			return {
				logged: false,
			};
		default:
			return state;
	}
};
