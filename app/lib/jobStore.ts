import { create } from "zustand";

interface JobStore {
    jobs: JobApplication[];
    isLoading: boolean;
    error: string | null;
    
    // Actions
    loadJobs: () => Promise<void>;
    addJob: (jobData: JobFormData) => Promise<void>;
    updateJob: (id: string, jobData: JobFormData) => Promise<void>;
    deleteJob: (id: string) => Promise<void>;
    clearError: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
    jobs: [],
    isLoading: false,
    error: null,

    loadJobs: async () => {
        set({ isLoading: true, error: null });
        
        try {
            const jobsData = localStorage.getItem('jobs');
            const jobs = jobsData ? JSON.parse(jobsData) : [];
            
            // Sort by date applied (newest first)
            jobs.sort((a: JobApplication, b: JobApplication) => 
                new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
            );
            
            set({ jobs, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to load jobs',
                isLoading: false 
            });
        }
    },

    addJob: async (jobData: JobFormData) => {
        set({ isLoading: true, error: null });
        
        try {
            const id = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const now = new Date().toISOString();
            
            const newJob: JobApplication = {
                id,
                ...jobData,
                createdAt: now,
                updatedAt: now,
            };
            
            const currentJobs = get().jobs;
            const updatedJobs = [newJob, ...currentJobs];
            
            localStorage.setItem('jobs', JSON.stringify(updatedJobs));
            set({ jobs: updatedJobs, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to add job',
                isLoading: false 
            });
        }
    },

    updateJob: async (id: string, jobData: JobFormData) => {
        set({ isLoading: true, error: null });
        
        try {
            const currentJobs = get().jobs;
            const existingJob = currentJobs.find(job => job.id === id);
            
            if (!existingJob) {
                throw new Error('Job not found');
            }
            
            const updatedJob: JobApplication = {
                ...existingJob,
                ...jobData,
                updatedAt: new Date().toISOString(),
            };
            
            const updatedJobs = currentJobs.map(job => 
                job.id === id ? updatedJob : job
            );
            
            localStorage.setItem('jobs', JSON.stringify(updatedJobs));
            set({ jobs: updatedJobs, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to update job',
                isLoading: false 
            });
        }
    },

    deleteJob: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
            const currentJobs = get().jobs;
            const updatedJobs = currentJobs.filter(job => job.id !== id);
            
            localStorage.setItem('jobs', JSON.stringify(updatedJobs));
            set({ jobs: updatedJobs, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to delete job',
                isLoading: false 
            });
        }
    },

    clearError: () => set({ error: null }),
}));