import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../config'; // Import from central config

// NOTE: Creating the context and a custom hook together is good practice.
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token, name;
            try {
                token = await SecureStore.getItemAsync('userToken');
                name = await SecureStore.getItemAsync('username');
            } catch (e) { console.error('Restoring auth state failed', e); }
            setUserToken(token);
            setUsername(name);
            setIsLoading(false);
        };
        bootstrapAsync();
    }, []);

    const authContext = {
        signIn: async (email, password) => {
            try {
                const response = await fetch(`${API_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to login');
                }
                await SecureStore.setItemAsync('userToken', data.token);
                await SecureStore.setItemAsync('username', data.username);
                setUserToken(data.token);
                setUsername(data.username);
                return true; // <-- RETURN TRUE ON SUCCESS
            } catch (error) {
                Alert.alert('Login Failed', error.message);
                return false; // <-- RETURN FALSE ON FAILURE
            }
        },
        signOut: async () => {
            await SecureStore.deleteItemAsync('userToken');
            await SecureStore.deleteItemAsync('username');
            setUserToken(null);
            setUsername(null);
        },
        signUp: async (username, email, password) => {
            try {
                const response = await fetch(`${API_URL}/api/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to create account.');
                }
                // After successful registration, automatically log the user in.
                const loginSuccess = await authContext.signIn(email, password);
                return loginSuccess; // <-- Return the result of the signIn attempt
            } catch (error) {
                Alert.alert('Sign Up Failed', error.message);
                return false;
            }
        },
        userToken,
        username,
        isLoading,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;