# 🚀 JobMate AI

<div align="center">

![JobMate AI](/assets/JobMateLogo.jpg)

**AI-powered resume analysis and job application tracker**

[![GitHub Stars](https://img.shields.io/github/stars/SiddarthaKarri/JobMate-AI?style=for-the-badge&logo=github)](https://github.com/SiddarthaKarri/JobMate-AI)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-Grok--4--Fast-FF6B6B?style=for-the-badge)](https://openrouter.ai/)

[🚀 Live Demo](https://job-mateai.vercel.app) • [🐛 Report Bug](https://github.com/SiddarthaKarri/JobMate-AI/issues)

</div>

---

## ✨ Features

### 🎯 **AI-Powered Resume Analysis**
- **Smart Feedback**: Comprehensive analysis using OpenRouter's Grok-4-Fast model
- **Multi-Category Scoring**: ATS compatibility, content quality, structure, tone, and skills
- **Visual Insights**: Interactive gauges and actionable improvement suggestions
- **PDF Processing**: Seamless upload with text extraction and image preview

### 💼 **Job Application Management**
- **Complete Tracking**: Centralized dashboard for all applications
- **Status Management**: Track Applied → Interviewing → Accepted/Rejected
- **Rich Records**: Store job descriptions, company info, and personal notes
- **Smart Analytics**: Visual statistics and progress insights

### 🔐 **Security & Storage**
- **Privacy-First**: All data stored locally in your browser
- **Secure Authentication**: Browser-based session management
- **Full Control**: Export data or wipe completely anytime

---

## 🛠️ Tech Stack

| Frontend | AI & Processing | Tools |
|----------|-----------------|-------|
| React 19 + TypeScript | OpenRouter (Grok-4-Fast) | Vite |
| React Router v7 | PDF.js | ESLint |
| Tailwind CSS | Custom PDF-to-Image | TypeScript |
| Zustand | LocalStorage API | Modern ES Modules |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- OpenRouter API Key ([Get here](https://openrouter.ai/))

### Installation
```bash
# Clone and install
git clone https://github.com/SiddarthaKarri/JobMate-AI.git
cd JobMate-AI
npm install

# Environment setup
cp .env.example .env
# Add your API key: VITE_OPENROUTER_API_KEY=your_key_here

# Start development
npm run dev
```

Visit `http://localhost:5173` and you're ready to go! 🎉

---

## 💻 Usage

1. **Sign In** → Access all features securely
2. **Upload Resume** → Get AI-powered analysis and scoring
3. **Track Applications** → Manage your job search pipeline
4. **Monitor Progress** → View analytics and insights

---

## 🏗️ Project Structure

```
JobMate-AI/
├── app/
│   ├── components/         # Reusable UI components
│   ├── lib/               # Core utilities (auth, AI, storage)
│   ├── routes/            # Page components (SSR)
│   └── root.tsx           # App root
├── types/                 # TypeScript definitions
└── public/               # Static assets
```

---

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SiddarthaKarri/JobMate-AI)

```bash
# One-click deployment or:
npm run build
vercel

# Don't forget to add VITE_OPENROUTER_API_KEY in Vercel dashboard
```

### Other Platforms
- **Netlify**: Drag & drop the `build` folder
- **Railway**: Connect GitHub repository
- **Render**: Use build command `npm run build`

---

## 🤝 Contributing

We welcome contributions! 

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Submit a pull request

See our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

---

## 🔮 Roadmap

- [ ] **Resume Templates** - Industry-specific templates
- [ ] **Interview Prep** - AI-generated practice questions
- [ ] **Email Integration** - Automated follow-up reminders
- [ ] **Advanced Analytics** - Success rate insights
- [ ] **Mobile App** - Native iOS/Android apps

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Siddartha Karri**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SiddarthaKarri)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/siddarthakarri)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://siddarthakarri.github.io/portfolio/)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

*Built with ❤️ using React Router v7, TypeScript, and OpenRouter AI*

</div>