import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import { useAuthStore } from "~/lib/auth";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import BasicScoreView from "~/components/BasicScoreView";
import LockedContent from "~/components/LockedContent";

export const meta = () => ([
    { title: 'JobMate AI | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { isAuthenticated } = useAuthStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [resumeData, setResumeData] = useState<any>(null);

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (resumeData && resumeData.resumePath) {
            // Convert data URL back to blob and create object URL
            const byteCharacters = atob(resumeData.resumePath.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Open PDF in new tab
            window.open(url, '_blank');
            
            // Clean up the URL after a short delay
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    };

    useEffect(() => {
        const loadResume = async () => {
            // Load from localStorage
            const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
            const resume = resumes.find((r: any) => r.id === id);

            if(!resume) return;

            // Store the resume data for PDF handling
            setResumeData(resume);
            
            // Use the actual resume image and PDF that were converted and stored
            setImageUrl(resume.imagePath); // This is the data URL of the actual resume image
            setResumeUrl(resume.resumePath); // This is the data URL of the actual PDF file
            setFeedback(resume.feedback);

            console.log('Resume Data:', { 
                imageUrl: 'Actual resume image loaded', 
                resumeUrl: 'Actual PDF loaded', 
                feedback: resume.feedback 
            });
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeData && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit p-4">
                            <div onClick={handleImageClick} className="cursor-pointer w-full h-full overflow-hidden rounded-2xl">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain hover:opacity-90 transition-opacity"
                                    alt="Resume preview - Click to open PDF"
                                    title="Click to open PDF"
                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                />
                            </div>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-4xl !text-black font-bold">Resume Review for {resumeData.jobTitle} at {resumeData.companyName}</h2>

                        {!isAuthenticated && (
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Want detailed insights?</p>
                                <Link 
                                    to={`/auth?next=/resume/${id}`}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Sign in for full analysis →
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            {isAuthenticated ? (
                                // Full detailed view for authenticated users
                                <>
                                    <Summary feedback={feedback} />
                                    <ATS 
                                        score={feedback.ATS?.score || feedback.overallScore || 0} 
                                        suggestions={feedback.ATS?.tips || feedback.improvements || []} 
                                    />
                                    <Details feedback={feedback} />
                                </>
                            ) : (
                                // Basic score view for unauthenticated users
                                <>
                                    <BasicScoreView feedback={feedback} />
                                    
                                    {/* Locked detailed sections */}
                                    <LockedContent
                                        title="Detailed Analysis"
                                        description="Get comprehensive insights into your resume's tone, content structure, and skills assessment."
                                        resumeId={id}
                                    >
                                        <Summary feedback={feedback} />
                                    </LockedContent>
                                    
                                    <LockedContent
                                        title="Advanced ATS Insights"
                                        description="Discover specific tips to improve your ATS compatibility and keyword optimization."
                                        resumeId={id}
                                    >
                                        <ATS 
                                            score={feedback.ATS?.score || feedback.overallScore || 0} 
                                            suggestions={feedback.ATS?.tips || feedback.improvements || []} 
                                        />
                                    </LockedContent>
                                    
                                    <LockedContent
                                        title="Professional Breakdown"
                                        description="Get detailed feedback on each section of your resume with actionable improvement suggestions."
                                        resumeId={id}
                                    >
                                        <Details feedback={feedback} />
                                    </LockedContent>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <img src="/images/resume-scan-2.gif" className="w-64 mx-auto" />
                            <p className="mt-4 text-gray-600">Loading resume analysis...</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume
