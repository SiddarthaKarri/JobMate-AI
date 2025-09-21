import { useState, useRef, useEffect } from "react";

interface JobCardProps {
    job: JobApplication;
    onEdit: (job: JobApplication) => void;
    onDelete: (id: string) => void;
    onStatusUpdate?: (jobId: string, newStatus: JobApplication["status"]) => void;
}

const JobCard = ({ job, onEdit, onDelete, onStatusUpdate }: JobCardProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowStatusDropdown(false);
            }
        };

        if (showStatusDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showStatusDropdown]);

    const getStatusBadgeClass = (status: JobApplication["status"]) => {
        switch (status) {
            case "Applied":
                return "bg-blue-100 text-blue-800";
            case "Interviewing":
                return "bg-badge-yellow text-badge-yellow-text";
            case "Accepted":
                return "bg-badge-green text-badge-green-text";
            case "Rejected":
                return "bg-badge-red text-badge-red-text";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const handleStatusChange = (newStatus: JobApplication["status"]) => {
        if (onStatusUpdate) {
            onStatusUpdate(job.id, newStatus);
        }
        setShowStatusDropdown(false);
    };

    const handleDelete = () => {
        onDelete(job.id);
        setShowDeleteConfirm(false);
    };

    return (
        <div className="resume-card">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-semibold text-black">{job.jobTitle}</h3>
                    <p className="text-dark-200 font-medium">{job.company}</p>
                    <p className="text-sm text-dark-200">{job.location}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className={`score-badge ${getStatusBadgeClass(job.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                            {job.status} ▼
                        </button>
                        
                        {showStatusDropdown && onStatusUpdate && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                                {(["Applied", "Interviewing", "Accepted", "Rejected"] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                        className={`w-full text-left px-3 py-2 hover:bg-gray-50 text-sm ${
                                            status === job.status ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-dark-200" title={formatDate(job.dateApplied)}>
                        Applied: {getRelativeTime(job.dateApplied)}
                    </p>
                </div>
            </div>

            <div className="flex-1">
                <h4 className="font-medium text-dark-200 mb-2">Job Description</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                    <p className="text-sm text-dark-200 line-clamp-6">
                        {job.jobDescription.length > 200 
                            ? `${job.jobDescription.substring(0, 200)}...` 
                            : job.jobDescription
                        }
                    </p>
                </div>
            </div>

            <div className="flex gap-2 pt-4">
                <button
                    onClick={() => onEdit(job)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    Edit
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 border border-red-300 text-red-600 rounded-full px-4 py-2 hover:bg-red-50 transition-colors text-sm font-medium"
                >
                    Delete
                </button>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Delete Job Application</h3>
                        <p className="text-dark-200 mb-6">
                            Are you sure you want to delete the application for <strong>{job.jobTitle}</strong> at <strong>{job.company}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCard;