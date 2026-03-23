import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthUser, setIsLoggedin } from '../features/userSlice.js'

function Navbar() {
    let isLoggedin = useSelector((state) => state.user.isLoggedin);
    let user = useSelector((state) => state.user.authUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    return (
        <nav className="w-full bg-slate-950/80 backdrop-blur-xl fixed top-0 z-50 border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                        C
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        CRM
                    </h1>
                </Link>

                {/* Links */}
                <div className="space-x-8 text-slate-300 font-medium flex justify-center items-center text-sm md:text-base">
                    {
                        !isLoggedin ? (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="hover:text-white transition-colors px-2 py-1">Login</Link>
                                <Link
                                    to="/sign-up"
                                    className="bg-white/10 text-white px-5 py-2 rounded-xl hover:bg-white/20 border border-white/10 transition-all duration-300 backdrop-blur-sm"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className='flex justify-center items-center gap-6'>
                                <div className="text-slate-400 hidden md:block">
                                    <span className="text-slate-500">Welcome,</span> <span className="text-white">{user?.name}</span>
                                </div>
                                <button 
                                    className='text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10'
                                    onClick={() => {
                                        localStorage.removeItem("securedToken");
                                        dispatch(setIsLoggedin(false));
                                        dispatch(setAuthUser(null));
                                        navigate('/login')
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
