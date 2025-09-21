import {Link} from "react-router";
import { useAuthStore } from "~/lib/auth";

const Navbar = () => {
    const { isAuthenticated, user, signOut } = useAuthStore();
    
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">JobMate AI</p>
            </Link>
            <div className="flex gap-4 items-center">
                <Link to="/jobs" className="flex items-center px-4 py-2 text-dark-200 hover:text-black transition-colors">
                    Jobs
                </Link>
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Welcome, {user?.username}
                        </span>
                        <button 
                            onClick={signOut}
                            className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link 
                        to="/auth?next=/upload" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Sign In for Details
                    </Link>
                )}
            </div>
        </nav>
    )
}
export default Navbar
