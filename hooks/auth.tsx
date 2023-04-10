import { useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../config';

const AuthContext = React.createContext(null) as any;

// This hook can be used to access the user info.
export function useAuth() {
	return React.useContext(AuthContext) as any;
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
	const segments = useSegments();
	const router = useRouter();

	React.useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)';

		if (
			// If the user is not signed in and the initial segment is not anything in the auth group.
			!user &&
			!inAuthGroup
		) {
			// Redirect to the sign-in page.

			router.replace('/sign-in');
		} else if (user && inAuthGroup) {
			// Redirect away from the sign-in page.
			router.replace('/');
		}
	}, [user, segments]);
}

export function Provider(props: any) {
	const [user, setAuth] = React.useState(null) as any;
	const [isLoading, setIsLoading] = React.useState(true);

	useProtectedRoute(user);

	useEffect(() => {
		// onAuthStateChanged returns an unsubscriber
		const unsubscribeAuthStateChanged = onAuthStateChanged(
			auth,
			(authenticatedUser) => {
				authenticatedUser ? setAuth(authenticatedUser) : setAuth(null);
				setIsLoading(false);
			}
		);

		// unsubscribe auth listener on unmount
		return unsubscribeAuthStateChanged;
	}, [user]);

	console.log('user: ', user);

	return (
		<AuthContext.Provider
			value={{
				signIn: (user: any) => setAuth(user),
				signOut: () =>
					signOut(auth).catch((error) =>
						console.log('Error logging out: ', error)
					),
				user,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
