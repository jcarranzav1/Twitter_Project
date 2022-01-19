import { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import initialState from './state';

const Store = createContext({});

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Store.Provider
			value={{
				state,
				dispatch,
			}}>
			{children}
		</Store.Provider>
	);
}
export default Store;
