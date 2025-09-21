# AI Analyzer - Resume & Job Application Management System

**An intelligent resume analysis and job application tracking platform powered by AI**

Built with React, TypeScript, and modern web technologies to help job seekers optimize their resumes and manage their application process efficiently.

## 💡 Project Motivation

As a developer, I noticed the challenges job seekers face in optimizing their resumes for different positions and keeping track of multiple applications. This project combines AI-powered resume analysis with comprehensive job application management to create a complete job search toolkit.

The application leverages modern web technologies and AI to provide actionable insights while maintaining a clean, user-friendly interface that makes job searching more organized and effective.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [💻 Usage](#-usage)
- [📱 Screenshots](#-screenshots)
- [🏗️ Project Structure](#️-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## ✨ Features

### 🎯 Resume Analysis
- **AI-Powered Feedback**: Get intelligent insights on your resume using advanced AI models
- **ATS Score**: Receive an Applicant Tracking System compatibility score
- **Multi-Category Analysis**: Detailed feedback on content, structure, tone, style, and skills
- **Visual Scoring**: Interactive score gauges and badges for easy understanding
- **PDF Processing**: Upload and analyze PDF resumes with automatic text extraction

### 💼 Job Application Management
- **Application Tracking**: Keep track of all your job applications in one place
- **Status Management**: Update application status (Applied, Interviewing, Rejected, Accepted)
- **Detailed Records**: Store job title, company, location, application date, and job descriptions
- **Smart Dashboard**: Visual statistics showing your application progress
- **CRUD Operations**: Full create, read, update, and delete functionality
- **Sorting & Filtering**: Sort applications by date or status

### 🔐 Authentication & Storage
- **Secure Authentication**: Browser-based authentication using Puter.js
- **Cloud Storage**: All data stored securely in the cloud
- **User-Specific Data**: Each user's resumes and job applications are private
- **Real-time Sync**: Data syncs across devices automatically

### 🎨 User Experience
- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Built with accessibility best practices

## 🚀 Live Demo

**🔗 [Try AI Analyzer Live](https://ai-job-analyzer-mu.vercel.app/)**

### Quick Start
1. Visit the live application
2. Sign in with Puter authentication
3. Upload a resume to get AI-powered feedback
4. Add job applications to track your progress

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Modern React with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React Router v7](https://reactrouter.com/)** - Advanced routing with SSR support
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management

### Backend & Services
- **[Puter.js](https://puter.com/)** - Serverless backend with AI, storage, and authentication
- **PDF Processing** - Built-in PDF text extraction and analysis capabilities

### Development & Deployment
- **[Vite](https://vite.dev/)** - Fast build tool and development server
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **TypeScript** - Enhanced development experience with type safety

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Clone the Repository
```bash
git clone https://github.com/Anurag03singh/Ai-Job-Analyzer.git
cd Ai-Job-Analyzer
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Setup
The application uses Puter.js for backend services, which requires no additional configuration for basic usage. However, you can customize:

1. **Puter.js Settings**: Modify `app/lib/puter.ts` for custom configurations
2. **Styling**: Update `app/app.css` and Tailwind config for custom themes
3. **AI Models**: Configure AI model preferences in the Puter store

### Build for Production
```bash
npm run build
# or
yarn build
```

### Type Checking
```bash
npm run typecheck
# or
yarn typecheck
```

## 💻 Usage

### 1. Authentication
- Click "Sign In" to authenticate with Puter
- No registration required - uses secure browser-based auth

### 2. Resume Analysis
- Navigate to "Upload Resume"
- Fill in job details (company, position, job description)
- Upload your PDF resume
- Get instant AI-powered feedback with scores and suggestions

### 3. Job Application Management
- Go to the "Jobs" section
- Click "Add New Job" to track a new application
- Fill in job details and current status
- Edit or delete applications as needed
- View your application statistics on the dashboard

### 4. Data Management
- All data is automatically saved to the cloud
- Access your data from any device after signing in
- Use the "Wipe" feature to clear all data if needed

## 📱 Application Features

### Resume Analysis Dashboard
- Upload PDF resumes and get instant AI feedback
- View detailed scores for ATS compatibility, content quality, and structure
- Get actionable suggestions for improvement

### Job Application Tracker
- Comprehensive dashboard showing application statistics
- Track applications across different stages (Applied, Interviewing, Rejected, Accepted)
- Manage job details including company, position, location, and descriptions

### User Interface
- Clean, modern design optimized for productivity
- Responsive layout that works on all devices
- Intuitive navigation and user-friendly forms

## 🏗️ Project Structure

```
ai-job-analyzer/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── JobCard.tsx     # Job application card
│   │   ├── JobForm.tsx     # Job application form
│   │   ├── Navbar.tsx      # Navigation component
│   │   └── ...
│   ├── lib/                # Utility libraries
│   │   ├── jobStore.ts     # Job management state
│   │   ├── puter.ts        # Puter.js integration
│   │   └── utils.ts        # Helper functions
│   ├── routes/             # Page components
│   │   ├── home.tsx        # Dashboard page
│   │   ├── jobs.tsx        # Job management page
│   │   ├── upload.tsx      # Resume upload page
│   │   └── ...
│   ├── app.css            # Global styles
│   └── root.tsx           # App root component
├── types/                 # TypeScript definitions
├── public/               # Static assets
├── constants/            # App constants
└── package.json         # Dependencies and scripts
```

### Key Components

#### Job Management
- **JobStore** (`app/lib/jobStore.ts`): Zustand store for job application state
- **JobCard** (`app/components/JobCard.tsx`): Individual job application display
- **JobForm** (`app/components/JobForm.tsx`): Add/edit job application form

#### Resume Analysis
- **FileUploader** (`app/components/FileUploader.tsx`): PDF upload component
- **ATS** (`app/components/ATS.tsx`): ATS score display
- **ScoreGauge** (`app/components/ScoreGauge.tsx`): Visual score representation

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run typecheck`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain consistent code style
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

### Issues
- 🐛 **Bug Reports**: Use the bug report template
- 💡 **Feature Requests**: Use the feature request template
- 📚 **Documentation**: Help improve our docs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anurag Singh**
- GitHub: [@Anurag03singh](https://github.com/Anurag03singh)
- Portfolio: [AI Analyzer](https://ai-job-analyzer-mu.vercel.app/)
- Project Repository: [Ai-Job-Analyzer](https://github.com/Anurag03singh/Ai-Job-Analyzer)

---

**⭐ Star this repository if you found it helpful!**

**🔗 [Live Application](https://ai-job-analyzer-mu.vercel.app/) | [GitHub Repository](https://github.com/Anurag03singh/Ai-Job-Analyzer)**

## 🔮 Future Enhancements

- **Resume Templates**: Pre-built resume templates for different industries
- **Interview Preparation**: AI-generated interview questions based on job descriptions
- **Application Reminders**: Automated follow-up reminders for pending applications
- **Analytics Dashboard**: Advanced insights into application success rates
- **Resume Comparison**: Side-by-side comparison of multiple resume versions

---

*Built with ❤️ by [Anurag Singh](https://github.com/Anurag03singh)*