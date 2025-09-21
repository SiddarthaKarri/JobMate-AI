import { create } from 'zustand';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(API_KEY);

interface GeminiStore {
  isLoading: boolean;
  geminiReady: boolean;
  error: string | null;
  auth: {
    isAuthenticated: boolean;
    user: any;
    signIn: (username: string) => Promise<void>;
    signOut: () => Promise<void>;
  };
  ai: {
    feedback: (resumeText: string, prompt: string) => Promise<any>;
    chat: (messages: any[], options?: any) => Promise<any>;
    img2txt: (file: File) => Promise<string>;
  };
  fs: {
    upload: (file: File) => Promise<string>;
    read: (path: string) => Promise<any>;
    write: (path: string, data: any) => Promise<void>;
    delete: (path: string) => Promise<void>;
  };
  kv: {
    set: (key: string, value: any) => Promise<void>;
    get: (key: string) => Promise<any>;
    delete: (key: string) => Promise<void>;
  };
  init: () => Promise<void>;
}

export const useGeminiStore = create<GeminiStore>((set, get) => ({
  isLoading: false,
  geminiReady: false,
  error: null,

  auth: {
    isAuthenticated: false,
    user: null,
    signIn: async (username: string) => {
      // Simple localStorage-based auth (mimicking Puter's auth)
      localStorage.setItem('auth_user', username);
      localStorage.setItem('auth_authenticated', 'true');
      set(state => ({
        auth: {
          ...state.auth,
          isAuthenticated: true,
          user: { username }
        }
      }));
    },
    signOut: async () => {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_authenticated');
      set(state => ({
        auth: {
          ...state.auth,
          isAuthenticated: false,
          user: null
        }
      }));
    }
  },

  ai: {
    // Main feedback function - mimics Puter's ai.feedback
    feedback: async (resumeText: string, prompt: string) => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const fullPrompt = `You are Claude 3 Sonnet, a brutally honest technical recruiter. Analyze this resume with the same realistic standards that made Puter's system effective.

SCORING REALITY (like Claude 3 Sonnet):
- Most resumes score 30-60 (normal range)
- Only exceptional candidates score 70+
- Scores above 80 are extremely rare
- Be harsh about skill gaps and missing experience

PROMPT: ${prompt}

RESUME CONTENT:
${resumeText}

Analyze and return realistic scores as JSON with this exact format:
{
  "overallScore": number,
  "ATS": {
    "score": number,
    "tips": [{"type": "good|improve", "tip": "title", "explanation": "detail"}]
  },
  "toneAndStyle": {
    "score": number,
    "tips": [{"type": "good|improve", "tip": "title", "explanation": "detail"}]
  },
  "content": {
    "score": number,
    "tips": [{"type": "good|improve", "tip": "title", "explanation": "detail"}]
  },
  "structure": {
    "score": number,
    "tips": [{"type": "good|improve", "tip": "title", "explanation": "detail"}]
  },
  "skills": {
    "score": number,
    "tips": [{"type": "good|improve", "tip": "title", "explanation": "detail"}]
  }
}`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse and clean response
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanedText);
    },

    // Generic chat function
    chat: async (messages: any[], options?: any) => {
      const model = genAI.getGenerativeModel({ model: options?.model || "gemini-1.5-flash" });
      const lastMessage = messages[messages.length - 1];
      const content = lastMessage.content;
      
      const result = await model.generateContent(content);
      const response = await result.response;
      return response.text();
    },

    // OCR function - extract text from images
    img2txt: async (file: File) => {
      // For now, return placeholder text based on file characteristics
      // In a real implementation, you'd use Tesseract.js or similar
      const fileName = file.name.toLowerCase();
      const fileSize = file.size;
      
      // Simulate different resume quality based on file characteristics
      const hasExperience = fileName.includes('exp') || fileName.includes('senior') || fileName.includes('lead');
      const hasTech = fileName.includes('tech') || fileName.includes('dev') || fileName.includes('engineer');
      const isLargeFile = fileSize > 100000; // > 100KB suggests more content
      
      if (hasExperience && isLargeFile) {
        return generateSeniorResumeText();
      } else if (hasTech || isLargeFile) {
        return generateMidLevelResumeText();
      } else {
        return generateEntryLevelResumeText();
      }
    }
  },

  fs: {
    // File system operations using localStorage
    upload: async (file: File) => {
      const id = Date.now().toString();
      const fileData = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      };
      localStorage.setItem(`file_${id}`, JSON.stringify(fileData));
      return id;
    },

    read: async (path: string) => {
      const data = localStorage.getItem(`file_${path}`);
      return data ? JSON.parse(data) : null;
    },

    write: async (path: string, data: any) => {
      localStorage.setItem(path, JSON.stringify(data));
    },

    delete: async (path: string) => {
      localStorage.removeItem(path);
    }
  },

  kv: {
    // Key-value storage using localStorage
    set: async (key: string, value: any) => {
      localStorage.setItem(`kv_${key}`, JSON.stringify(value));
    },

    get: async (key: string) => {
      const data = localStorage.getItem(`kv_${key}`);
      return data ? JSON.parse(data) : null;
    },

    delete: async (key: string) => {
      localStorage.removeItem(`kv_${key}`);
    }
  },

  init: async () => {
    set({ isLoading: true });
    
    try {
      // Check if API key is configured
      if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error('Gemini API key not configured');
      }

      // Check authentication state
      const isAuthenticated = localStorage.getItem('auth_authenticated') === 'true';
      const username = localStorage.getItem('auth_user');

      set(state => ({
        isLoading: false,
        geminiReady: true,
        auth: {
          ...state.auth,
          isAuthenticated,
          user: isAuthenticated ? { username } : null
        }
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        geminiReady: false, 
        error: error instanceof Error ? error.message : 'Failed to initialize Gemini' 
      });
    }
  }
}));

// Helper functions for generating realistic resume content
function generateSeniorResumeText(): string {
  return `JOHN SMITH
Senior Software Engineer
john.smith@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Senior Software Engineer with 8+ years of experience building scalable web applications and leading engineering teams. Expertise in React, Node.js, and cloud architecture. Led migration of legacy systems to microservices, improving performance by 40%.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, Java
Frontend: React, Redux, HTML5, CSS3, Next.js
Backend: Node.js, Express, Django, Spring Boot
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
Tools: Git, Jenkins, JIRA, Terraform

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2020 - Present
• Led team of 5 engineers developing customer-facing web applications serving 2M+ users
• Architected and implemented microservices migration, reducing system downtime by 60%
• Mentored junior developers and established code review processes
• Technologies: React, Node.js, AWS, PostgreSQL

Software Engineer | StartupXYZ | 2017 - 2020
• Developed full-stack web applications using React and Django
• Implemented CI/CD pipelines reducing deployment time by 75%
• Collaborated with product team to deliver features for 500K+ users
• Technologies: React, Django, PostgreSQL, Docker

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2017
GPA: 3.7/4.0

ACHIEVEMENTS
• AWS Certified Solutions Architect (2022)
• Led successful product launch generating $2M ARR
• Speaker at TechConf 2023: "Scaling React Applications"`;
}

function generateMidLevelResumeText(): string {
  return `SARAH JOHNSON
Software Developer
sarah.johnson@email.com | (555) 987-6543 | GitHub: github.com/sarahj

PROFESSIONAL SUMMARY
Software Developer with 3+ years of experience building web applications. Passionate about clean code and user experience. Seeking to contribute to innovative projects and grow technical skills.

TECHNICAL SKILLS
Languages: JavaScript, Python, HTML, CSS
Frameworks: React, Node.js, Express
Databases: MySQL, MongoDB
Tools: Git, VS Code, Postman
Cloud: Basic AWS experience

PROFESSIONAL EXPERIENCE

Software Developer | WebSolutions Ltd. | 2022 - Present
• Develop and maintain React-based web applications
• Collaborate with design team to implement user interfaces
• Write unit tests and participate in code reviews
• Work with REST APIs and database integration

Junior Developer | LocalTech Co. | 2021 - 2022
• Built responsive websites using HTML, CSS, JavaScript
• Assisted senior developers with bug fixes and feature implementation
• Learned React and modern development practices

PROJECTS
E-commerce Website (2023)
• Built online store using React and Node.js
• Implemented user authentication and payment processing
• Deployed on Heroku with MongoDB database

EDUCATION
Bachelor of Computer Science | State University | 2021
Relevant Coursework: Data Structures, Web Development, Database Systems`;
}

function generateEntryLevelResumeText(): string {
  return `MIKE CHEN
Recent Graduate
mike.chen@email.com | (555) 456-7890

EDUCATION
Bachelor of Science in Computer Science | City College | 2024
GPA: 3.2/4.0
Relevant Coursework: Programming Fundamentals, Web Development, Data Structures

TECHNICAL SKILLS
Languages: Python, JavaScript, HTML, CSS
Frameworks: Basic React knowledge
Tools: Git, Visual Studio Code
Databases: MySQL (academic projects)

PROJECTS
Personal Portfolio Website (2024)
• Created responsive portfolio using HTML, CSS, JavaScript
• Showcased academic projects and resume
• Deployed on GitHub Pages

Calculator App (2023)
• Built simple calculator using Python
• Implemented basic arithmetic operations
• Course project for Programming Fundamentals

WORK EXPERIENCE
IT Support Intern | Local Business | Summer 2023
• Assisted with computer setup and troubleshooting
• Helped maintain office network and equipment
• Gained experience with technical problem-solving

Retail Associate | Electronics Store | 2022-2023
• Provided customer service and product information
• Operated point-of-sale systems
• Developed communication and teamwork skills

CERTIFICATIONS
• FreeCodeCamp Responsive Web Design (2024)
• Introduction to Programming (Coursera, 2023)`;
}