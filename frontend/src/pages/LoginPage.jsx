import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { setIsLoggedin, setAuthUser } from '../features/userSlice.js'
import { useDispatch } from 'react-redux';

function LoginPage() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    async function handleLogin() {
        try {
            let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });
            if (response.status === 200) {
                localStorage.setItem("securedToken", response.data.token);
                dispatch(setIsLoggedin(true));
                dispatch(setAuthUser(response.data.user))
                navigate('/customers')
            }
        } catch (error) {
            console.log(error.message);
            setShowError(true);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 pt-16 relative overflow-hidden">
            {/* Background decors */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-8 md:p-10 z-10 relative">
                {/* Logo / Title */}
                <div className="text-center mb-10">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 mb-6">
                        C
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Please sign in to access your dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showError && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                                Invalid email or password
                            </p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                            <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500/50" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-slate-800"></div>
                    <span className="px-4 text-slate-500 text-sm font-medium">New here?</span>
                    <div className="flex-1 border-t border-slate-800"></div>
                </div>

                {/* Signup */}
                <p className="text-center text-sm text-slate-400">
                    Don’t have an account?{" "}
                    <span
                        className="text-white font-semibold hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() => navigate('/sign-up')}
                    >
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginPage