import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	function onAuthStateChanged(_user) {
		console.log('on auth state changed: ', _user);
		setUser(_user);

		if (initializing) {
			setInitializing(false);
		}
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) {
		return null;
	}

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const signInWithEmailAndPassword = async (email, password) => {
	try {
		console.log({ email, password });
		const result = await auth().signInWithEmailAndPassword(email, password);
		console.log('signing in success: ', result);
		return { isSuccess: true };
	} catch (error) {
		console.log(error);
		let errorMessage = '';

		switch (error.code) {
			case 'auth/wrong-password':
				errorMessage = 'Wrong password';
				break;
			case 'auth/user-not-found':
				errorMessage = 'User not found';
				break;
			case 'auth/invalid-email':
				errorMessage = 'Invalid Email';
				break;
			case 'auth/network-request-failed':
				errorMessage = 'No Internet!';
				break;
			case 'auth/too-many-requests':
				errorMessage = 'Too many wrong attempts! Try again later';
				break;
		}
		return { isSuccess: false, errorMessage };
	}
};

export const signOut = async () => {
	try {
		const result = await auth().signOut();
		console.log(result);
		return { isSuccess: true };
	} catch (error) {
		console.log(error);
		return { isSuccess: false, error };
	}
};