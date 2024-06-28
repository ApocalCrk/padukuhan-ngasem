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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Masuk ke akun Anda
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-0 focus:outline-none" placeholder="Masukkan username anda" required onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-0 focus:outline-none" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Masuk</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Akses ke dashboard administrator
                    </p>
                </form>
            </div>
        </div>
    </div>
    )
}