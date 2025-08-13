import { createContext } from 'react';

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    signIn: async () => { },
    signOut: async () => { },
});

export const AuthContextProvider = AuthContext.Provider;