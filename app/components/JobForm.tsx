import { useState, useEffect } from "react";

interface JobFormProps {
    job?: JobApplication;
    onSubmit: (data: JobFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

const JobForm = ({ job, onSubmit, onCancel, isLoading = false }: JobFormProps) => {
    const [formData, setFormData] = useState<JobFormData>({
        jobTitle: "",
        company: "",
        location: "",
        dateApplied: new Date().toISOString().split('T')[0],
        status: "Applied",
        jobDescription: "",
    });

    const [errors, setErrors] = useState<Partial<JobFormData>>({});

    useEffect(() => {
        if (job) {
            setFormData({
                jobTitle: job.jobTitle,
                company: job.company,
                location: job.location,
                dateApplied: job.dateApplied,
                status: job.status,
                jobDescription: job.jobDescription,
            });
        }
    }, [job]);

    const validateForm = (): boolean => {
        const newErrors: Partial<JobFormData> = {};

        if (!formData.jobTitle.trim()) {
            newErrors.jobTitle = "Job title is required";
        }

        if (!formData.company.trim()) {
            newErrors.company = "Company is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (!formData.dateApplied) {
            newErrors.dateApplied = "Date applied is required";
        }

        if (!formData.jobDescription.trim()) {
            newErrors.jobDescription = "Job description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        await onSubmit(formData);
    };

    const handleChange = (field: keyof JobFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="gradient-border">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6">
                    {job ? "Edit Job Application" : "Add New Job Application"}
                </h2>

                <div className="form-div">
                    <label htmlFor="jobTitle">Job Title *</label>
                    <input
                        id="jobTitle"
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => handleChange("jobTitle", e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className={errors.jobTitle ? "border-red-500" : ""}
                    />
                    {errors.jobTitle && (
                        <span className="text-red-500 text-sm">{errors.jobTitle}</span>
                    )}
                </div>

                <div className="form-div">
                    <label htmlFor="company">Company *</label>
                    <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="e.g. Google"
                        className={errors.company ? "border-red-500" : ""}
                    />
                    {errors.company && (
                        <span className="text-red-500 text-sm">{errors.company}</span>
                    )}
                </div>

                <div className="form-div">
                    <label htmlFor="location">Location *</label>
                    <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                        <span className="text-red-500 text-sm">{errors.location}</span>
                    )}
                </div>

                <div className="flex gap-4 max-md:flex-col">
                    <div className="form-div flex-1">
                        <label htmlFor="dateApplied">Date Applied *</label>
                        <input
                            id="dateApplied"
                            type="date"
                            value={formData.dateApplied}
                            onChange={(e) => handleChange("dateApplied", e.target.value)}
                            className={errors.dateApplied ? "border-red-500" : ""}
                        />
                        {errors.dateApplied && (
                            <span className="text-red-500 text-sm">{errors.dateApplied}</span>
                        )}
                    </div>

                    <div className="form-div flex-1">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value as JobFormData["status"])}
                            className="w-full p-4 inset-shadow rounded-2xl focus:outline-none bg-white"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Accepted">Accepted</option>
                        </select>
                    </div>
                </div>

                <div className="form-div">
                    <label htmlFor="jobDescription">Job Description *</label>
                    <textarea
                        id="jobDescription"
                        value={formData.jobDescription}
                        onChange={(e) => handleChange("jobDescription", e.target.value)}
                        placeholder="Paste the job description here..."
                        rows={6}
                        className={errors.jobDescription ? "border-red-500" : ""}
                    />
                    {errors.jobDescription && (
                        <span className="text-red-500 text-sm">{errors.jobDescription}</span>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="primary-button flex-1 disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : job ? "Update Job" : "Add Job"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-50 transition-colors flex-1 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;