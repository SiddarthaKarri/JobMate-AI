import { GoogleGenerativeAI } from '@google/generative-ai';
import { prepareInstructions } from '../../constants';

// Initialize Gemini with your API key
// Get your API key from https://aistudio.google.com/app/apikey
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';

if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('⚠️  Gemini API key not found. Using fallback analysis. Please set VITE_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

interface AnalysisInput {
    fileName: string;
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    resumeText?: string; // Optional if you want to pass actual extracted text
}

// Function to extract text from PDF (placeholder - you'd implement actual PDF text extraction)
async function extractTextFromPDF(file: File): Promise<string> {
    // This is a placeholder that simulates realistic resume content
    // In a real implementation, you would use libraries like:
    // - pdf-parse for Node.js backend
    // - PDF.js for browser-based extraction
    // - Or send the file to a server endpoint for processing
    
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    
    // Simulate different resume quality based on file characteristics
    const hasKeywords = fileName.includes('resume') || fileName.includes('cv');
    const hasExperience = fileName.includes('exp') || fileName.includes('senior') || fileName.includes('lead');
    const hasTech = fileName.includes('tech') || fileName.includes('dev') || fileName.includes('engineer');
    const isLargeFile = fileSize > 100000; // > 100KB suggests more content
    
    // Create different resume personas for more realistic AI analysis
    let resumeText = `RESUME DOCUMENT\n\n`;
    
    if (hasExperience && isLargeFile) {
        // Senior professional resume
        resumeText += generateSeniorResumeText();
    } else if (hasTech || hasKeywords) {
        // Mid-level professional resume
        resumeText += generateMidLevelResumeText();
    } else if (isLargeFile) {
        // Detailed but entry-level resume
        resumeText += generateDetailedEntryResumeText();
    } else {
        // Basic entry-level resume
        resumeText += generateBasicEntryResumeText();
    }
    
    return resumeText;
}

function generateSeniorResumeText(): string {
    return `
CONTACT INFORMATION
Sarah Chen, P.E.
Senior Software Engineering Manager
Email: sarah.chen@email.com
Phone: (415) 555-0123
LinkedIn: linkedin.com/in/sarahchen
Location: San Francisco Bay Area, CA

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineering Manager with 8+ years of experience leading high-performing engineering teams and delivering scalable software solutions. Proven track record of managing $2M+ budgets, mentoring 15+ engineers, and driving technical strategy for Fortune 500 companies. Expert in cloud architecture, microservices, and agile methodologies.

CORE COMPETENCIES
• Team Leadership & Management (15+ direct reports)
• System Architecture & Design
• Cloud Technologies (AWS, Azure, GCP)
• Microservices & Distributed Systems
• DevOps & CI/CD Implementation
• Agile/Scrum Methodologies
• Budget Management ($2M+ annual budgets)
• Cross-functional Collaboration

PROFESSIONAL EXPERIENCE

Senior Engineering Manager | TechGiant Corp | 2020 - Present
• Lead engineering organization of 15+ developers across 3 product teams
• Delivered 5 major product releases, increasing user engagement by 40%
• Implemented DevOps practices reducing deployment time from 4 hours to 15 minutes
• Managed annual engineering budget of $2.3M, optimizing costs by 18%
• Established technical roadmap aligned with business objectives
• Mentored 8 engineers, with 6 receiving promotions during tenure

Lead Software Engineer | InnovateNow Solutions | 2018 - 2020
• Architected microservices platform handling 50M+ daily requests
• Led technical migration from monolithic to distributed architecture
• Reduced system downtime by 85% through improved monitoring and alerting
• Collaborated with product managers to define technical requirements
• Conducted technical interviews and grew team from 5 to 12 engineers

Senior Software Engineer | StartupTech Inc | 2016 - 2018
• Developed core platform features serving 1M+ active users
• Optimized database performance, improving query response time by 60%
• Implemented real-time analytics dashboard used by C-level executives
• Led code review process and established engineering best practices
• Mentored junior developers and conducted technical training sessions

Software Engineer | WebSolutions LLC | 2015 - 2016
• Built responsive web applications using React, Node.js, and MongoDB
• Integrated third-party APIs including payment processing and CRM systems
• Participated in agile development process with 2-week sprint cycles
• Collaborated with designers to implement pixel-perfect UI components

TECHNICAL SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java, Go
Frontend Technologies: React, Vue.js, Angular, HTML5, CSS3, SASS
Backend Technologies: Node.js, Express, Django, Spring Boot, .NET Core
Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
Cloud Platforms: AWS (EC2, S3, Lambda, RDS), Azure, Google Cloud
DevOps Tools: Docker, Kubernetes, Jenkins, GitLab CI, Terraform
Monitoring: New Relic, DataDog, Grafana, ELK Stack
Version Control: Git, GitHub, GitLab

EDUCATION
Master of Science in Computer Science | Stanford University | 2015
Bachelor of Science in Computer Engineering | UC Berkeley | 2013
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Solutions Architect - Professional (2022)
• Google Cloud Professional Cloud Architect (2021)
• Certified Scrum Master (CSM) (2020)
• Project Management Professional (PMP) (2019)

ACHIEVEMENTS & AWARDS
• "Engineering Excellence Award" - TechGiant Corp (2022)
• "Innovation Leadership Award" - InnovateNow Solutions (2019)
• Featured speaker at DevCon 2021: "Scaling Engineering Teams"
• Published article in IEEE Software: "Microservices Best Practices"

PATENTS & PUBLICATIONS
• US Patent #10,123,456: "System for Real-time Data Processing" (2021)
• "Distributed System Design Patterns" - ACM Computing Surveys (2020)

LANGUAGES
• English (Native)
• Mandarin (Professional)
• Spanish (Conversational)
`;
}

function generateMidLevelResumeText(): string {
    return `
CONTACT INFORMATION
Michael Rodriguez
Software Engineer
Email: m.rodriguez@email.com
Phone: (512) 555-0187
GitHub: github.com/mrodriguez
Location: Austin, TX

PROFESSIONAL SUMMARY
Dedicated Software Engineer with 3+ years of experience developing web applications and APIs. Passionate about clean code, test-driven development, and collaborative problem-solving. Seeking to contribute technical expertise and grow within a dynamic engineering team.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, HTML5, CSS3
Frameworks: React, Node.js, Express, Django
Databases: PostgreSQL, MongoDB, MySQL
Tools: Git, Docker, VS Code, Postman, JIRA
Cloud: AWS (S3, EC2, Lambda), Heroku
Testing: Jest, Cypress, Pytest

PROFESSIONAL EXPERIENCE

Software Engineer | TechStart Solutions | 2022 - Present
• Develop and maintain React-based web applications serving 10,000+ monthly users
• Built REST APIs using Node.js and Express, handling 1,000+ daily requests
• Implemented automated testing suite, improving code coverage from 45% to 80%
• Collaborated with design team to create responsive, mobile-first interfaces
• Participated in code reviews and maintained coding standards across team
• Fixed 50+ bugs and implemented 20+ new features in past year

Junior Software Developer | WebDev Inc | 2021 - 2022
• Assisted in development of e-commerce platform using React and Node.js
• Worked with senior developers to implement new payment processing features
• Wrote unit tests using Jest, maintaining 70%+ test coverage
• Participated in daily standups and sprint planning meetings
• Learned agile methodologies and collaborative development practices
• Contributed to documentation and knowledge sharing initiatives

Frontend Developer Intern | DigitalAgency LLC | Summer 2021
• Built responsive websites using HTML, CSS, and JavaScript
• Converted design mockups into functional web components
• Learned version control with Git and collaborative workflows
• Assisted with website maintenance and content updates
• Gained experience with modern frontend build tools and processes

PROJECTS

Personal Finance Tracker | 2023
• Full-stack web application built with React, Node.js, and PostgreSQL
• Implemented user authentication and data visualization features
• Deployed using Docker containers on AWS EC2
• Technologies: React, Node.js, PostgreSQL, Chart.js, JWT

Weather Dashboard API | 2022
• RESTful API providing weather data aggregation from multiple sources
• Implemented caching and rate limiting for optimal performance
• Comprehensive test suite with 90%+ coverage
• Technologies: Python, Django, Redis, PostgreSQL

Task Management App | 2021
• Mobile-responsive todo application with real-time updates
• Features include task categorization, due dates, and progress tracking
• Local storage implementation for offline functionality
• Technologies: React, CSS3, Local Storage API

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin | 2021
GPA: 3.6/4.0
Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Web Development

ADDITIONAL EXPERIENCE
• Completed 3 technical coding challenges on HackerRank (Gold level)
• Volunteer web developer for local nonprofit organization
• Active participant in Austin JavaScript meetup group
• Completed online courses in AWS and DevOps fundamentals

INTERESTS
• Contributing to open source projects
• Learning new programming languages and frameworks
• Attending tech conferences and workshops
• Building side projects and experimenting with new technologies
`;
}

function generateDetailedEntryResumeText(): string {
    return `
CONTACT INFORMATION
Jennifer Kim
Junior Web Developer
Email: jennifer.kim.dev@gmail.com
Phone: (206) 555-0145
Portfolio: jenniferkimdev.com
GitHub: github.com/jenkim
Location: Seattle, WA

OBJECTIVE
Recent Computer Science graduate seeking an entry-level web developer position to apply technical skills and contribute to innovative projects. Eager to learn from experienced developers and grow within a collaborative team environment.

EDUCATION
Bachelor of Science in Computer Science | University of Washington | 2024
GPA: 3.4/4.0
Dean's List: Fall 2022, Spring 2023
Relevant Coursework:
• Data Structures and Algorithms
• Object-Oriented Programming
• Database Design and Implementation
• Web Development Fundamentals
• Software Engineering Principles
• Computer Networks
• Human-Computer Interaction

TECHNICAL SKILLS
Programming Languages: JavaScript, Python, Java, HTML5, CSS3, SQL
Frameworks & Libraries: React (learning), jQuery, Bootstrap
Databases: MySQL, PostgreSQL (academic projects)
Tools & Technologies: Git, GitHub, VS Code, Chrome DevTools, Figma
Operating Systems: Windows, macOS, Linux (Ubuntu)
Version Control: Git, GitHub workflow

ACADEMIC PROJECTS

E-Commerce Website Prototype | Senior Capstone Project | 2024
• Developed full-stack web application for online marketplace
• Implemented user registration, product catalog, and shopping cart functionality
• Built responsive frontend using HTML5, CSS3, and JavaScript
• Created MySQL database schema and wrote SQL queries for data management
• Collaborated with team of 4 students using agile development methodology
• Technologies: HTML5, CSS3, JavaScript, PHP, MySQL

Student Grade Management System | Database Course Project | 2023
• Designed and implemented database system for tracking student grades
• Created normalized database schema with proper relationships
• Developed command-line interface for CRUD operations
• Implemented data validation and error handling
• Technologies: Python, PostgreSQL, SQL

Personal Portfolio Website | 2023
• Designed and built responsive personal website to showcase projects
• Implemented modern CSS techniques including Flexbox and Grid
• Added interactive elements using vanilla JavaScript
• Optimized for mobile devices and cross-browser compatibility
• Technologies: HTML5, CSS3, JavaScript, Responsive Design

Simple Calculator Application | Intro Programming Course | 2022
• Built basic calculator with standard arithmetic operations
• Implemented clean user interface with event handling
• Added memory functions and operation history
• Technologies: Java, Swing GUI

WORK EXPERIENCE

Computer Lab Assistant | University of Washington | 2022 - 2024
• Provided technical support to students in computer lab environment
• Assisted with software installation and troubleshooting
• Maintained computer equipment and ensured lab functionality
• Helped students with basic programming questions and debugging
• Developed strong communication and problem-solving skills

Retail Associate | TechGear Store | Summer 2023
• Assisted customers with technology product selection and purchases
• Learned about various software and hardware products
• Provided basic technical support and product demonstrations
• Developed customer service skills and technical communication abilities

EXTRACURRICULAR ACTIVITIES

Women in Computer Science Club | Member | 2022 - 2024
• Participated in monthly technical workshops and networking events
• Volunteered at local high schools to promote STEM education
• Collaborated on group coding projects and study sessions

Programming Club | Active Member | 2021 - 2024
• Participated in weekly coding challenges and hackathons
• Contributed to open-source projects maintained by the club
• Mentored underclassmen in programming fundamentals

Volunteer Web Developer | Local Animal Shelter | 2023
• Updated and maintained nonprofit organization's website
• Added online adoption form and volunteer registration features
• Learned about content management systems and basic SEO
• Technologies: WordPress, HTML, CSS

CERTIFICATIONS & LEARNING
• Completed freeCodeCamp Responsive Web Design Certification (2023)
• Completed online course: "JavaScript Fundamentals" on Coursera (2023)
• Currently pursuing: AWS Cloud Practitioner Certification
• Active learner on platforms: LeetCode, HackerRank, Codecademy

ADDITIONAL SKILLS
• Strong analytical and problem-solving abilities
• Excellent written and verbal communication
• Detail-oriented with strong organizational skills
• Quick learner with passion for new technologies
• Team collaboration and leadership experience
• Bilingual: English (Native), Korean (Fluent)

INTERESTS
• Learning new programming languages and frameworks
• Contributing to open-source projects
• Attending local tech meetups and conferences
• Building personal projects and experimenting with new technologies
• Reading tech blogs and staying current with industry trends
`;
}

function generateBasicEntryResumeText(): string {
    return `
CONTACT INFORMATION
David Thompson
Recent Graduate
Email: david.thompson2024@email.com
Phone: (303) 555-0192
Location: Denver, CO

OBJECTIVE
Recent college graduate with foundational knowledge in computer programming seeking entry-level position in software development. Eager to learn and contribute to a technology team.

EDUCATION
Bachelor of Arts in Computer Science | Colorado State University | 2024
GPA: 3.1/4.0
Relevant Coursework: Introduction to Programming, Web Development Basics, Database Fundamentals

TECHNICAL SKILLS
Programming Languages: Python (basic), JavaScript (learning), HTML, CSS
Tools: Microsoft Office, Google Workspace, basic Git knowledge
Operating Systems: Windows, some experience with Mac

ACADEMIC PROJECTS

Basic Website Project | Web Development Course | 2023
• Created simple personal website using HTML and CSS
• Learned basic web design principles
• Added contact form with basic JavaScript validation
• Technologies: HTML, CSS, JavaScript

Python Calculator | Programming Course | 2023
• Built simple calculator program using Python
• Implemented basic arithmetic operations
• Learned fundamental programming concepts
• Technologies: Python

WORK EXPERIENCE

Customer Service Representative | RetailMart | 2022 - 2024
• Assisted customers with purchases and returns
• Operated cash register and handled transactions
• Maintained store organization and cleanliness
• Developed communication and customer service skills

Tutor | Campus Learning Center | 2023 - 2024
• Helped fellow students with mathematics and basic computer skills
• Explained concepts clearly and patiently
• Developed teaching and communication abilities

ADDITIONAL INFORMATION
• Completed basic online courses in programming
• Familiar with Microsoft Office applications
• Strong work ethic and willingness to learn
• Good communication skills
• Team player with positive attitude

INTERESTS
• Learning about new technology
• Playing video games
• Sports and outdoor activities
• Reading about programming and technology trends
`;
}

export async function analyzeResumeWithAI(input: AnalysisInput, file: File): Promise<any> {
    try {
        // Check if API key is properly configured
        if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            console.log('🔄 Using fallback analysis - API key not configured');
            const resumeText = await extractTextFromPDF(file);
            return getFallbackAnalysis(resumeText, input);
        }

        // Extract text from PDF
        const resumeText = await extractTextFromPDF(file);
        
        // Prepare the AI prompt using Puter's simple approach
        const prompt = `${prepareInstructions({ jobTitle: input.jobTitle, jobDescription: input.jobDescription })}

RESUME CONTENT TO ANALYZE:
${resumeText}`;

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the JSON response
        try {
            // Clean the response text (remove any markdown formatting)
            const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const feedback = JSON.parse(cleanedText);
            
            // APPLY REALISTIC SCORING CONSTRAINTS
            // AI tends to be too optimistic, so we apply reality constraints
            let adjustedOverallScore = feedback.overallScore || 50;
            
            // Apply harsh reality adjustments based on context
            const isTopTierCompany = input.companyName.toLowerCase().includes('google') || 
                                   input.companyName.toLowerCase().includes('meta') || 
                                   input.companyName.toLowerCase().includes('amazon') ||
                                   input.companyName.toLowerCase().includes('apple') ||
                                   input.companyName.toLowerCase().includes('microsoft');
            
            // If AI gave unrealistically high scores, bring them down to reality
            if (adjustedOverallScore > 75 && isTopTierCompany) {
                adjustedOverallScore = Math.round(adjustedOverallScore * 0.7); // 30% penalty for top companies
            } else if (adjustedOverallScore > 80) {
                adjustedOverallScore = Math.round(adjustedOverallScore * 0.8); // 20% penalty for high scores
            }
            
            // Ensure component scores are consistent and realistic
            const atsScore = Math.min(feedback.ATS?.score || 50, adjustedOverallScore + 10);
            const toneScore = Math.min(feedback.toneAndStyle?.score || 50, adjustedOverallScore + 5);
            const contentScore = Math.min(feedback.content?.score || 50, adjustedOverallScore);
            const structureScore = Math.min(feedback.structure?.score || 50, adjustedOverallScore + 10);
            const skillsScore = Math.min(feedback.skills?.score || 50, adjustedOverallScore);
            
            // Ensure all required fields are present with realistic scores
            return {
                overallScore: adjustedOverallScore,
                strengths: extractStrengthsFromFeedback(feedback),
                improvements: extractImprovementsFromFeedback(feedback),
                compatibility: getCompatibilityFromScore(adjustedOverallScore),
                ATS: {
                    score: atsScore,
                    tips: feedback.ATS?.tips || [{ type: "improve", tip: "Add more relevant keywords from the job description" }]
                },
                toneAndStyle: {
                    score: toneScore,
                    tips: feedback.toneAndStyle?.tips || [{ type: "improve", tip: "Use more confident language", explanation: "Replace weak phrases with strong action verbs" }]
                },
                content: {
                    score: contentScore,
                    tips: feedback.content?.tips || [{ type: "improve", tip: "Add more detailed descriptions", explanation: "Include specific achievements and quantifiable results" }]
                },
                structure: {
                    score: structureScore,
                    tips: feedback.structure?.tips || [{ type: "improve", tip: "Improve formatting consistency", explanation: "Ensure consistent spacing and section organization" }]
                },
                skills: {
                    score: skillsScore,
                    tips: feedback.skills?.tips || [{ type: "improve", tip: "Expand technical skill set", explanation: "Learn more technologies relevant to your target role" }]
                }
            };
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            console.error('AI Response:', text);
            
            // Fallback to a basic analysis if AI response can't be parsed
            return getFallbackAnalysis(resumeText, input);
        }
        
    } catch (error) {
        console.error('AI Analysis failed:', error);
        
        // Check if it's an API key issue
        if (error instanceof Error && error.message && error.message.includes('API key')) {
            console.log('🔑 API Key issue detected, using fallback analysis');
        } else {
            console.log('🔄 AI service unavailable, using fallback analysis');
        }
        
        // Fallback to basic analysis if AI fails
        const resumeText = await extractTextFromPDF(file);
        return getFallbackAnalysis(resumeText, input);
    }
}

function extractStrengthsFromFeedback(feedback: any): string[] {
    const strengths: string[] = [];
    
    ['ATS', 'toneAndStyle', 'content', 'structure', 'skills'].forEach(category => {
        if (feedback[category]?.tips) {
            feedback[category].tips.forEach((tip: any) => {
                if (tip.type === 'good') {
                    strengths.push(tip.tip);
                }
            });
        }
    });
    
    return strengths.slice(0, 4); // Return top 4 strengths
}

function extractImprovementsFromFeedback(feedback: any): string[] {
    const improvements: string[] = [];
    
    ['ATS', 'toneAndStyle', 'content', 'structure', 'skills'].forEach(category => {
        if (feedback[category]?.tips) {
            feedback[category].tips.forEach((tip: any) => {
                if (tip.type === 'improve') {
                    improvements.push(tip.tip);
                }
            });
        }
    });
    
    return improvements.slice(0, 4); // Return top 4 improvements
}

function getCompatibilityFromScore(score: number): string {
    if (score >= 85) {
        return "Excellent match for the position - your resume strongly aligns with the requirements";
    } else if (score >= 70) {
        return "Good match for the position with some areas for improvement";
    } else if (score >= 55) {
        return "Moderate match - consider strengthening key areas before applying";
    } else {
        return "Significant improvements needed to be competitive for this position";
    }
}

function getFallbackAnalysis(resumeText: string, input: AnalysisInput): any {
    // Simple fallback analysis like Puter's approach
    const text = resumeText.toLowerCase();
    const jobTitle = input.jobTitle.toLowerCase();
    const companyName = input.companyName.toLowerCase();
    const jobDescription = input.jobDescription.toLowerCase();
    
    // Check basic resume characteristics
    const hasYearsExperience = text.match(/(\d+)[\+\s]*years?/i);
    const experienceYears = hasYearsExperience ? parseInt(hasYearsExperience[1]) : 0;
    const hasEducation = text.includes('bachelor') || text.includes('master') || text.includes('phd');
    const hasInternship = text.includes('intern');
    const hasTechSkills = text.includes('javascript') || text.includes('python') || text.includes('react') || text.includes('java');
    const hasProjects = text.includes('project') || text.includes('built') || text.includes('developed');
    
    // Simple scoring based on basic criteria
    let baseScore = 40; // Start with neutral score
    
    // Experience points
    if (experienceYears >= 5) baseScore += 20;
    else if (experienceYears >= 3) baseScore += 15;
    else if (experienceYears >= 1) baseScore += 10;
    else if (hasInternship) baseScore += 5;
    
    // Education and skills
    if (hasEducation) baseScore += 5;
    if (hasTechSkills) baseScore += 10;
    if (hasProjects) baseScore += 8;
    
    // Basic adjustments for company tier
    if (companyName.includes('google') || companyName.includes('meta') || companyName.includes('amazon')) {
        baseScore = Math.round(baseScore * 0.8); // Slightly lower for top companies
    }
    
    // Keep score in reasonable range
    baseScore = Math.max(25, Math.min(baseScore, 80));
    
    return {
        overallScore: baseScore,
        strengths: generateSimpleStrengths(experienceYears, hasTechSkills, hasEducation),
        improvements: generateSimpleImprovements(experienceYears, hasTechSkills),
        compatibility: getCompatibilityFromScore(baseScore),
        ATS: {
            score: Math.max(baseScore - 5, 30),
            tips: [
                { type: "improve", tip: "Add more relevant keywords from the job description" },
                { type: "improve", tip: "Ensure proper formatting for ATS readability" },
                { type: "improve", tip: "Include standard section headers" }
            ]
        },
        toneAndStyle: {
            score: Math.max(baseScore, 35),
            tips: [
                { type: "improve", tip: "Use stronger action verbs", explanation: "Replace weak phrases with confident statements" },
                { type: "improve", tip: "Add professional summary", explanation: "Include a brief summary of your key qualifications" }
            ]
        },
        content: {
            score: Math.max(baseScore - 10, 25),
            tips: [
                { type: "improve", tip: "Add more detailed descriptions", explanation: "Include specific achievements and quantifiable results" },
                { type: "improve", tip: "Expand on technical projects", explanation: "Provide more details about technologies used and impact achieved" }
            ]
        },
        structure: {
            score: Math.max(baseScore + 5, 40),
            tips: [
                { type: "good", tip: "Clear section organization", explanation: "Resume follows a logical structure" },
                { type: "improve", tip: "Improve formatting consistency", explanation: "Ensure consistent spacing and section formatting" }
            ]
        },
        skills: {
            score: hasTechSkills ? Math.max(baseScore, 45) : Math.max(baseScore - 15, 25),
            tips: [
                { type: hasTechSkills ? "good" : "improve", tip: hasTechSkills ? "Relevant technical skills listed" : "Add more relevant technical skills", explanation: hasTechSkills ? "Good technical skills for the role" : `Learn technologies mentioned in the ${jobTitle} job requirements` },
                { type: "improve", tip: "Demonstrate skill application", explanation: "Show how you've used these skills in real projects or work" }
            ]
        }
    };
}

function generateSimpleStrengths(experienceYears: number, hasTechSkills: boolean, hasEducation: boolean): string[] {
    const strengths: string[] = [];
    
    if (experienceYears >= 3) strengths.push("Good work experience");
    else if (experienceYears >= 1) strengths.push("Some relevant experience");
    
    if (hasTechSkills) strengths.push("Technical skills present");
    if (hasEducation) strengths.push("Educational background");
    
    if (strengths.length === 0) strengths.push("Room for improvement");
    
    return strengths.slice(0, 3);
}

function generateSimpleImprovements(experienceYears: number, hasTechSkills: boolean): string[] {
    const improvements: string[] = [];
    
    if (experienceYears < 2) improvements.push("Gain more work experience");
    if (!hasTechSkills) improvements.push("Add relevant technical skills");
    
    improvements.push("Add quantifiable achievements");
    improvements.push("Include specific project details");
    
    return improvements.slice(0, 4);
}

function checkRelevantSkills(text: string, jobTitle: string, jobDescription: string): {advanced: boolean, intermediate: boolean, basic: boolean} {
    const jobRequirements = (jobTitle + ' ' + jobDescription).toLowerCase();
    
    // Define skill levels for different roles
    const skillSets = {
        frontend: {
            advanced: ['react', 'vue', 'angular', 'typescript', 'next.js', 'graphql', 'webpack'],
            intermediate: ['javascript', 'html5', 'css3', 'sass', 'bootstrap'],
            basic: ['html', 'css', 'jquery']
        },
        backend: {
            advanced: ['microservices', 'kubernetes', 'docker', 'aws', 'system design', 'scalability'],
            intermediate: ['node.js', 'python', 'java', 'databases', 'api', 'rest'],
            basic: ['programming', 'coding', 'development']
        },
        data: {
            advanced: ['machine learning', 'tensorflow', 'pytorch', 'spark', 'hadoop', 'deep learning'],
            intermediate: ['python', 'r', 'sql', 'pandas', 'numpy', 'statistics'],
            basic: ['excel', 'data analysis', 'visualization']
        }
    };
    
    const role = jobTitle.includes('frontend') ? 'frontend' : 
                 jobTitle.includes('backend') || jobTitle.includes('server') ? 'backend' :
                 jobTitle.includes('data') || jobTitle.includes('analyst') ? 'data' : 'frontend';
    
    const relevantSkills = skillSets[role];
    
    const hasAdvanced = relevantSkills.advanced.some(skill => text.includes(skill) || jobRequirements.includes(skill));
    const hasIntermediate = relevantSkills.intermediate.some(skill => text.includes(skill));
    const hasBasic = relevantSkills.basic.some(skill => text.includes(skill));
    
    return {
        advanced: hasAdvanced,
        intermediate: hasIntermediate && !hasAdvanced,
        basic: hasBasic && !hasIntermediate && !hasAdvanced
    };
}

function generateRealisticFeedback(score: number, experienceYears: number, skillLevel: any, isTopTier: boolean, input: AnalysisInput) {
    const companyType = isTopTier ? "a top-tier tech company like Google/Meta/Amazon" : "this company";
    
    let strengths: string[] = [];
    let improvements: string[] = [];
    
    if (score < 30) {
        // Brutal feedback for low scores
        strengths = experienceYears > 0 ? ["Some work experience"] : ["Educational background"];
        improvements = [
            `Your skills are not competitive for ${companyType}`,
            "Gain 2-3 years of relevant experience before applying",
            "Learn modern technologies required for this role",
            "Build projects that demonstrate real-world skills"
        ];
    } else if (score < 50) {
        strengths = ["Basic technical foundation", "Some relevant experience"];
        improvements = [
            `Need stronger technical skills for ${companyType}`,
            "Add more quantifiable achievements",
            "Expand expertise in required technologies",
            "Consider gaining more experience before applying to top companies"
        ];
    } else if (score < 70) {
        strengths = ["Solid technical skills", "Good experience level", "Clear career progression"];
        improvements = [
            "Add more leadership examples",
            "Include specific metrics and impact",
            "Demonstrate system design experience for senior roles"
        ];
    } else {
        strengths = ["Strong technical expertise", "Proven leadership", "Quantifiable impact"];
        improvements = [
            "Consider highlighting unique innovations",
            "Add more architectural design experience"
        ];
    }
    
    return {
        strengths: strengths.slice(0, 2),
        improvements: improvements.slice(0, 3),
        atsTips: [{ type: score > 40 ? "good" : "improve", tip: score > 40 ? "Good keyword usage" : "Add more relevant keywords from job description" }],
        toneTips: [{ type: "improve", tip: "Use stronger action verbs", explanation: "Replace weak language with confident statements" }],
        contentTips: [{ type: score > 50 ? "good" : "improve", tip: score > 50 ? "Good content depth" : "Add more detailed achievements with metrics", explanation: score > 50 ? "Good level of detail" : "Include specific numbers, percentages, and impact metrics" }],
        structureTips: [{ type: "good", tip: "Clear resume structure", explanation: "Resume follows a logical organization" }],
        skillsTips: [{ 
            type: skillLevel.advanced ? "good" : "improve", 
            tip: skillLevel.advanced ? "Strong technical skills" : "Develop more advanced technical skills", 
            explanation: skillLevel.advanced ? "Good technical expertise for the role" : `Learn technologies specifically mentioned in ${input.jobTitle} job requirements`
        }]
    };
}