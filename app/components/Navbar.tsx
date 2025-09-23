import {Link} from "react-router";
import { useAuthStore } from "~/lib/auth";
import { useState } from "react";

const Navbar = () => {
    const { isAuthenticated, user, signOut } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        console.log('Toggle menu clicked, current state:', isMobileMenuOpen);
        setIsMobileMenuOpen(!isMobileMenuOpen);
        console.log('New state will be:', !isMobileMenuOpen);
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <p className="text-xl sm:text-2xl font-bold text-gradient">JobMate AI</p>
                </Link>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link to="/jobs" className="flex items-center px-4 py-2 text-dark-200 hover:text-black transition-colors">
                        Jobs
                    </Link>
                    <Link to="/upload" className="primary-button w-fit text-sm">
                        Upload Resume
                    </Link>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 max-w-[100px] truncate">
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
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu md:hidden">
                    <div className="flex flex-col p-4 gap-3 bg-white rounded-2xl shadow-lg border border-gray-200">
                        {isAuthenticated && (
                            <div className="text-sm text-gray-600 px-4 py-2 bg-gray-50 rounded">
                                Welcome, {user?.username}
                            </div>
                        )}
                        
                        <Link 
                            to="/jobs" 
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Jobs
                        </Link>
                        
                        <Link 
                            to="/upload" 
                            className="primary-button w-full text-center text-sm py-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Upload Resume
                        </Link>
                        
                        {isAuthenticated ? (
                            <button 
                                onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-sm px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 w-full"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link 
                                to="/auth?next=/upload" 
                                className="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In for Details
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Navbar
