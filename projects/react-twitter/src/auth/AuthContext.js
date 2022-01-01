import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';

export const AuthContext = createContext();
export function UserProvider({ children }) {
	const [user, setUser] = useReducer(authReducer, {});
	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
