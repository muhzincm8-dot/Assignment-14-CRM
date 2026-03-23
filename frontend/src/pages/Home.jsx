import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    useEffect(() => {
        async function checkAPI() {
            try {
                let response = await axios.get(`${import.meta.env.VITE_API_URL}`);
                if (response.status === 200) {
                    console.log("API check successful: ", response.data.msg)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        checkAPI()
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="z-10 px-4 max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Next-Gen CRM Platform
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                    Manage relations with <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                        Intelligent Design
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Track interactions, maintain customer relationships, and scale your business with our ultra-fast and modern CRM experience.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/login"
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all duration-300"
                    >
                        Sign In to Dashboard
                        <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors pointer-events-none"></div>
                    </Link>

                    <Link
                        to="/sign-up"
                        className="px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all duration-300 hover:border-slate-600"
                    >
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home