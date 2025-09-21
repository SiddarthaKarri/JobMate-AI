import { useEffect, useState } from "react";
import { useAuthStore } from "~/lib/auth";

const WipeApp = () => {
    const { user, isAuthenticated, isLoading, error, clearError } = useAuthStore();
    const [dataCleared, setDataCleared] = useState(false);

    const handleDelete = async () => {
        // Clear localStorage data instead of Puter files/KV store
        localStorage.removeItem('resumes');
        localStorage.removeItem('auth_user');
        setDataCleared(true);
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Data Management</h1>
            {isAuthenticated && (
                <div className="mb-4">
                    Authenticated as: {user?.username}
                </div>
            )}
            
            {dataCleared ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    All app data has been cleared! Redirecting to home...
                </div>
            ) : (
                <div>
                    <p className="mb-4">This will permanently delete all your uploaded resumes and account data.</p>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600"
                        onClick={() => handleDelete()}
                    >
                        Wipe All App Data
                    </button>
                </div>
            )}
        </div>
    );
};

export default WipeApp;
