interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback {
    overallScore: number;
    strengths?: string[];
    improvements?: string[];
    compatibility?: string;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
}

interface JobApplication {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    dateApplied: string;
    status: "Applied" | "Interviewing" | "Rejected" | "Accepted";
    jobDescription: string;
    createdAt: string;
    updatedAt: string;
}

interface JobFormData {
    jobTitle: string;
    company: string;
    location: string;
    dateApplied: string;
    status: "Applied" | "Interviewing" | "Rejected" | "Accepted";
    jobDescription: string;
}
