import { types } from '../types/types';
import { blankState } from './state';

function reducer(state = {}, action) {
	let draft;
	switch (action.type) {
		case types.signin:
			draft = {
				...state,
				user: action.payload,
			};
			break;

		case types.signout:
			draft = {
				...state,
				user: blankState.user,
			};
			break;

		default:
			throw new Error();
	}
	localStorage.setItem('state', JSON.stringify(draft));
	return draft;
}
export default reducer;
