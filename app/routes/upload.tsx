import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FileUploader from "~/components/FileUploader";
import {OpenRouterService} from "~/lib/openrouter";
import {AI_CONFIG} from "~/lib/config";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";

const Upload = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    
    // OpenRouter service with API key
    const openRouterService = new OpenRouterService(AI_CONFIG.OPENROUTER_API_KEY);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        // Convert image to data URL for storage
        const imageDataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(imageFile.file!);
        });

        // Convert PDF to data URL for storage
        const pdfDataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
        });

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: pdfDataUrl, // Store the actual PDF data URL
            imagePath: imageDataUrl, // Store the actual image data URL
            companyName, jobTitle, jobDescription,
            feedback: null as Feedback | null,
        }

        setStatusText('Analyzing with Grok-4-Fast (OpenRouter)...');

        let feedback: Feedback | null = null;

        try {
            setStatusText('Extracting text from PDF...');
            const { extractTextFromPDF } = await import('~/lib/pdfExtractor');
            const pdfText = await extractTextFromPDF(file);
            
            setStatusText('Analyzing with OpenRouter (Grok-4-Fast)...');
            feedback = await openRouterService.analyzeResume(pdfText, jobTitle, jobDescription);
            
            if (feedback) {
                console.log('OpenRouter analysis successful');
            }
        } catch (error) {
            console.error('OpenRouter failed:', error);
            feedback = null;
        }

        if (!feedback) {
            return setStatusText('Error: OpenRouter failed to analyze resume');
        }

        data.feedback = feedback;
        
        // Store in localStorage
        const existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        existingResumes.push(data);
        localStorage.setItem('resumes', JSON.stringify(existingResumes));
        
        setStatusText('Analysis complete, redirecting...');
        console.log('OpenRouter Analysis Result:', data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
            
            <Footer />
        </main>
    )
}
export default Upload
