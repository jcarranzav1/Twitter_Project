import { types } from '../types/types';
import initialState from './state';

export const reducer = (state = {}, action) => {
	switch (action.type) {
		case types.signin:
			return {
				...state,
				user: action.payload,
			};
		case types.signout:
			return {
				...state,
				user: initialState,
			};

		default:
			throw new Error();
	}
};
export default reducer;
