import { useAuthStore } from "~/lib/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Footer from "~/components/Footer";
import HumanCaptcha from "~/components/HumanCaptcha";
import { CAPTCHA_IMAGE_SETS } from "~/lib/captcha";

export const meta = () => ([
    { title: 'JobMate AI | Auth' },
    { name: 'description', content: 'Sign in to access detailed resume insights' },
])

const Auth = () => {
    const { isLoading, isAuthenticated, captchaVerified, error, signIn, signOut, setCaptchaVerified, clearError } = useAuthStore();
    const [username, setUsername] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(true);
    const location = useLocation();
    
    // Better parsing of the next parameter
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(next);
        }
    }, [isAuthenticated, next, navigate]);

    const handleCaptchaSuccess = () => {
        setCaptchaVerified(true);
        setShowCaptcha(false);
    };

    const handleCaptchaFail = () => {
        setCaptchaVerified(false);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaVerified) {
            setShowCaptcha(true);
            return;
        }
        if (username.trim()) {
            await signIn(username.trim());
        }
    };

    return (
        <div className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="gradient-border shadow-lg w-full max-w-md">
                    <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1>Welcome</h1>
                            <h2>Log In to Continue Your Job Journey</h2>
                        </div>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                                <button 
                                    onClick={clearError}
                                    className="ml-2 text-red-800 hover:text-red-900"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        {showCaptcha && !captchaVerified && (
                            <HumanCaptcha
                                imageSets={CAPTCHA_IMAGE_SETS}
                                onSuccess={handleCaptchaSuccess}
                                onFail={handleCaptchaFail}
                            />
                        )}

                        <div>
                            {isLoading ? (
                                <button className="auth-button animate-pulse" disabled>
                                    <p>Signing you in...</p>
                                </button>
                            ) : (
                                <>
                                    {isAuthenticated ? (
                                        <button className="auth-button" onClick={signOut}>
                                            <p>Log Out</p>
                                        </button>
                                    ) : (
                                        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                                            <input
                                                type="text"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <button 
                                                type="submit" 
                                                className="auth-button"
                                                disabled={!captchaVerified}
                                            >
                                                <p>Log In</p>
                                            </button>
                                            {!captchaVerified && (
                                                <p className="text-sm text-gray-600 text-center">
                                                    Complete the captcha to enable login
                                                </p>
                                            )}
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            
            <Footer />
        </div>
    )
}

export default Auth
