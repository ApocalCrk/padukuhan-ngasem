'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminByUsername, validatePassword } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = () => {
            return !!localStorage.getItem('admin');
        };

        if (isLoggedIn()) {
            router.push('/administrator/dashboard');
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

            localStorage.setItem('admin', JSON.stringify(admin));

            router.push('/administrator/dashboard');
        } catch (error) {
            setError('An error occurred');
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="login-box">
                            <h2 className="text-center">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}