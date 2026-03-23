import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!name.trim()) {
            setShowError(true);
            setErrorMessage('Please provide a valid name');
            return;
        } else if (!role.trim() || (role.toUpperCase() !== "ADMIN" && role.toUpperCase() !== "AGENT")) {
            setShowError(true);
            setErrorMessage('Please specify role: ADMIN or AGENT');
            return;
        } else if (!email.trim()) {
            setShowError(true);
            setErrorMessage('Please provide a valid email');
            return;
        } else if (emailRegex.test(email) === false) {
            setShowError(true);
            setErrorMessage("Please provide a valid email format");
            return
        } else {
            try {
                let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, { name, email, password, role: role.toUpperCase(), username });

                if (response.status === 201) {
                    setShowError(false);
                    setName('');
                    setEmail('');
                    setRole('');
                    setUsername('');
                    setPassword('');
                    navigate('/login')
                } else {
                    setShowError(true);
                    setErrorMessage(response.data.message);
                }
            } catch (error) {
                setShowError(true);
                setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-4 py-20 relative overflow-hidden">
            {/* Background decors */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Logo / Title */}
            <div className="text-center mb-10 z-10 w-full max-w-md">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 mb-6">
                    C
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Create your account</h1>
                <p className="text-slate-400 mt-2 text-sm">
                    Start managing your customer relations effectively today
                </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-8 z-10 relative">
                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/*Name*/}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Role */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Role
                            </label>
                            <input
                                type="text"
                                placeholder="ADMIN, AGENT"
                                value={role}
                                className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

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
                            Create Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* error paragraph */}
                    {showError && (
                        <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl mt-4">
                            <p className="text-red-400 text-sm font-medium text-center">
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 mt-6 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-slate-800"></div>
                    <span className="px-4 text-slate-500 text-sm font-medium">Have an account?</span>
                    <div className="flex-1 border-t border-slate-800"></div>
                </div>

                {/* Sign In link */}
                <p className="text-center text-sm text-slate-400">
                    Already registered?{" "}
                    <span
                        className="text-white font-semibold hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Sign In here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage