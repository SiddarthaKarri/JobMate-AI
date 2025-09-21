import React from 'react';
import { Link } from 'react-router';

interface LockedContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
  resumeId?: string; // Optional resume ID for redirect after auth
}

const LockedContent: React.FC<LockedContentProps> = ({ title, description, children, resumeId }) => {
  // Create the auth redirect URL with resume ID if provided
  const authUrl = resumeId ? `/auth?next=/resume/${resumeId}` : '/auth?next=/upload';
  
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
      
      {/* Lock overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
          <div className="mb-4">
            <img src="/icons/pin.svg" alt="Lock" className="w-12 h-12 mx-auto opacity-60" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6 text-sm">{description}</p>
          <div className="space-y-3">
            <Link 
              to={authUrl}
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In to Unlock
            </Link>
            <p className="text-xs text-gray-500">
              Get detailed feedback, improvement tips, and more insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockedContent;