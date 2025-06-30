# 🌍 LinguaVerse - Break Language Barriers

<div align="center">

![LinguaVerse Logo](public/placeholder-logo.svg)

**Connect with anyone, anywhere in the world with our advanced real-time translation technology**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

### 🌟 Core Translation Features
- **🤖 AI-Powered Translation** - Powered by Google Gemini AI for accurate translations
- **🎤 Real-Time Voice Translation** - Speak and get instant voice translations
- **📝 Instant Text Translation** - Translate text messages in real-time
- **📄 Document Translation** - Translate documents while maintaining formatting
- **🌐 100+ Languages Support** - Comprehensive language coverage with continuous updates

### 🔐 Authentication & User Management
- **👤 User Registration & Login** - Secure authentication system
- **📊 Translation History** - Track and review your translation history
- **👤 User Profiles** - Manage your account and preferences
- **🔒 Secure & Private** - Enterprise-grade security and privacy measures

### 🎨 Modern UI/UX
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🌙 Dark Mode** - Beautiful dark theme with smooth transitions
- **⚡ Fast Performance** - Optimized for speed and efficiency
- **🎯 Intuitive Interface** - User-friendly design with clear navigation

### 🛠️ Developer Features
- **🔧 Demo Mode** - Works without API keys for testing
- **📡 API Integration** - Easy integration with Google Gemini AI
- **🎨 Customizable UI** - Built with shadcn/ui components
- **📦 TypeScript** - Full type safety and better development experience

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Google Gemini API key (optional for demo mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/linguaverse-landing.git
   cd linguaverse-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   # or
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

### Translation Features

#### Text Translation
1. Navigate to the **Translate** page
2. Select source and target languages
3. Enter or paste your text
4. Click **Translate** or press Enter
5. Copy or listen to the translation

#### Voice Translation
1. Click the **Microphone** button
2. Speak your text clearly
3. The app will automatically detect your language
4. Get instant voice translation

#### Language Detection
- The app automatically detects the input language
- Manual language selection is also available
- Supports 12+ major languages

### User Management

#### Registration
1. Click **Sign Up** on the homepage
2. Fill in your details
3. Create your account
4. Start translating immediately

#### Translation History
1. Log in to your account
2. Visit the **History** page
3. View all your past translations
4. Reuse previous translations

---

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & AI
- **[Google Gemini AI](https://ai.google.dev/)** - AI-powered translations
- **[AI SDK](https://sdk.vercel.ai/)** - AI integration
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Backend API

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io/)** - CSS vendor prefixes

---

## 📁 Project Structure

```
linguaverse-landing/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── detect-language/
│   │   └── translate/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── translate/         # Translation page
│   ├── signup/            # Registration page
│   ├── login/             # Login page
│   ├── profile/           # User profile
│   └── history/           # Translation history
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-guard.tsx    # Authentication guard
│   ├── header.tsx        # Navigation header
│   └── theme-provider.tsx # Theme management
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── public/               # Static assets
└── styles/               # Additional styles
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini AI (Optional - for real AI translations)
GEMINI_API_KEY=your_gemini_api_key_here
# or
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

**Note:** The app works in demo mode without an API key, but real AI translations require the API key.

---

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component styles in individual component files

### Components
All UI components are from shadcn/ui and can be customized:
- Modify component variants in `components/ui/`
- Add new components using `npx shadcn@latest add [component]`

### Themes
The app supports dark mode by default. You can:
- Modify theme colors in `components/theme-provider.tsx`
- Add new themes in the theme configuration

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Build Commands
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful translation capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

## 📞 Support

- **Email:** support@linguaverse.com
- **Discord:** [Join our community](#)
- **Documentation:** [Read the docs](#)
- **Issues:** [GitHub Issues](https://github.com/yourusername/linguaverse-landing/issues)

---

<div align="center">

**Made with ❤️ by the LinguaVerse Team**

[⭐ Star this repo](#) • [🔄 Follow for updates](#) • [📧 Contact us](#)

</div>
