import { useEffect, useState } from "react";
import type { Route } from "./+types/jobs";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import JobCard from "~/components/JobCard";
import JobForm from "~/components/JobForm";
import { useJobStore } from "~/lib/jobStore";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Jobs - JobMate AI" },
        { name: "description", content: "Track and manage your job applications" },
    ];
}

export default function Jobs() {
    const { jobs, isLoading, error, loadJobs, addJob, updateJob, deleteJob, clearError } = useJobStore();
    
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
    const [sortBy, setSortBy] = useState<"date" | "status">("date");

    useEffect(() => {
        loadJobs();
    }, []);

    const handleAddJob = async (jobData: JobFormData) => {
        await addJob(jobData);
        setShowForm(false);
    };

    const handleUpdateJob = async (jobData: JobFormData) => {
        if (editingJob) {
            await updateJob(editingJob.id, jobData);
            setEditingJob(null);
            setShowForm(false);
        }
    };

    const handleEditJob = (job: JobApplication) => {
        setEditingJob(job);
        setShowForm(true);
    };

    const handleDeleteJob = async (id: string) => {
        await deleteJob(id);
    };

    const handleStatusUpdate = async (id: string, status: JobApplication['status']) => {
        const job = jobs.find(j => j.id === id);
        if (job) {
            await updateJob(id, { ...job, status });
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingJob(null);
    };

    const sortedJobs = [...jobs].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
        } else {
            const statusOrder: Record<JobApplication['status'], number> = { "Interviewing": 0, "Applied": 1, "Accepted": 2, "Rejected": 3 };
            return statusOrder[a.status] - statusOrder[b.status];
        }
    });

    const getJobStats = () => {
        const total = jobs.length;
        const applied = jobs.filter((job: JobApplication) => job.status === "Applied").length;
        const interviewing = jobs.filter((job: JobApplication) => job.status === "Interviewing").length;
        const accepted = jobs.filter((job: JobApplication) => job.status === "Accepted").length;
        const rejected = jobs.filter((job: JobApplication) => job.status === "Rejected").length;

        return { total, applied, interviewing, accepted, rejected };
    };

    const stats = getJobStats();

    return (
        <div className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <section className="main-section">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-4xl">
                            <p className="text-red-800">{error}</p>
                            <button 
                                onClick={clearError}
                                className="text-red-600 underline text-sm mt-2"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}

                {!showForm && (
                    <>
                        <div className="page-heading py-16">
                            <h1>Job Applications</h1>
                            <h2>Track and manage your job applications in one place</h2>
                        </div>

                        {/* Stats Dashboard */}
                        {jobs.length > 0 && (
                            <div className="w-full max-w-4xl mb-8">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-gradient">{stats.total}</div>
                                        <div className="text-sm text-dark-200">Total</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
                                        <div className="text-sm text-dark-200">Applied</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-badge-yellow-text">{stats.interviewing}</div>
                                        <div className="text-sm text-dark-200">Interviewing</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-badge-green-text">{stats.accepted}</div>
                                        <div className="text-sm text-dark-200">Accepted</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-bold text-badge-red-text">{stats.rejected}</div>
                                        <div className="text-sm text-dark-200">Rejected</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex justify-between items-center w-full max-w-[1850px] mb-6 max-md:flex-col max-md:gap-4">
                            <div className="flex items-center gap-4 max-md:flex-col max-md:w-full">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="primary-button w-fit max-md:w-full"
                                >
                                    Add New Job
                                </button>
                                
                                {jobs.length > 1 && (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-dark-200">Sort by:</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as "date" | "status")}
                                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="date">Date Applied</option>
                                            <option value="status">Status</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            
                            {jobs.length > 0 && (
                                <div className="text-sm text-dark-200 max-md:w-full max-md:text-center">
                                    {jobs.length} application{jobs.length !== 1 ? 's' : ''} total
                                </div>
                            )}
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading" />
                                <p className="text-dark-200 mt-4">Loading your job applications...</p>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && jobs.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-6xl mb-4">💼</div>
                                <h3 className="text-xl font-semibold mb-2">No job applications yet</h3>
                                <p className="text-dark-200 mb-6 max-w-md">
                                    Start tracking your job applications to stay organized and never miss a follow-up.
                                </p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="primary-button w-fit"
                                >
                                    Add Your First Job
                                </button>
                            </div>
                        )}

                        {/* Jobs Grid */}
                        {!isLoading && sortedJobs.length > 0 && (
                            <div className="resumes-section">
                                {sortedJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onEdit={handleEditJob}
                                        onDelete={handleDeleteJob}
                                        onStatusUpdate={handleStatusUpdate}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Job Form */}
                {showForm && (
                    <div className="w-full max-w-2xl">
                        <JobForm
                            job={editingJob || undefined}
                            onSubmit={editingJob ? handleUpdateJob : handleAddJob}
                            onCancel={handleCancelForm}
                            isLoading={isLoading}
                        />
                    </div>
                )}
            </section>
            </main>
            
            <Footer />
        </div>
    );
}