import React, { createContext, useState } from 'react';

export const AuthenticatedUserContext = createContext({}) as any;

const AuthenticatedUserProvider = ({ children }: any) => {
	const [user, setUser] = useState(null);

	return (
		<AuthenticatedUserContext.Provider value={{ user, setUser }}>
			{children}
		</AuthenticatedUserContext.Provider>
	);
};

export default AuthenticatedUserProvider;
