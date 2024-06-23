'use client';
import React, { useEffect, useState } from 'react';
import { getAdminByUsername, validatePassword } from '@/utils/auth';
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isLoggedIn = () => {
            return !!localStorage.getItem('admin');
        };

        if (isLoggedIn()) {
            const data = localStorage.getItem('admin');
            const parsedData = JSON.parse(data as string);
            Cookies.set('token', parsedData?.uid);
            window.location.href = '/administrator/dashboard';
        }
    }, []);

    const handleLogin = async () => {
        try {
            const admin = await getAdminByUsername(username);
            if (!admin) {
            setError('Invalid username or password');
            return;
            }

            const isValidPassword = await validatePassword(password, admin.password);
            if (!isValidPassword) {
            setError('Invalid username or password');
            return;
            }

            if (admin && 'password' in admin) {
                delete (admin as { password?: string }).password;
            }
            
            const data = JSON.stringify(admin);
            localStorage.setItem('admin', data);
            
            const parsedData = JSON.parse(data);
            Cookies.set('token', parsedData?.uid);

            window.location.href = '/administrator/dashboard';
        } catch (error) {
            setError('An error occurred');
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-96">
                <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white rounded p-2"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    )
}