"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { signIn, isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/dashboard';
        }
    }, [isAuthenticated]);

    const validateForm = () => {
        const newErrors = {};

        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await signIn(email, password);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                            Sign in to continue to your dashboard
                        </p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-neutral-600 dark:text-neutral-300">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`mt-2 w-full border-2 rounded-xl focus:ring-4 focus:ring-indigo-200 transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-neutral-300'}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-neutral-600 dark:text-neutral-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`mt-2 w-full border-2 rounded-xl focus:ring-4 focus:ring-indigo-200 transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-neutral-300'}`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a
                                    href="/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl py-3 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}