"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setIsAuthenticated(!!currentUser);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();

        const { unsubscribe } = authService.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session?.user || null);
                setIsAuthenticated(true);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setIsAuthenticated(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        try {
            setIsLoading(true);
            const data = await authService.signIn(email, password);
            setUser(data?.user || null);
            setIsAuthenticated(true);
            toast.success('Login successful');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error.message || 'Login failed');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setIsLoading(true);
            await authService.signOut();
            setUser(null);
            setIsAuthenticated(false);
            toast.success('Logged out successfully');
            console.log('Logged out successfully');
            // router.push('/login');
        } catch (error) {
            toast.error(error.message || 'Logout failed');
        } finally {
            setIsLoading(false);
        }
    };

    const authContextValue = {
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signOut
    };

    return (
        <AuthContextProvider value={authContextValue}>
            {children}
        </AuthContextProvider>
    );
}
