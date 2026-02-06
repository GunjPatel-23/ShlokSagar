# ShlokSagar - श्लोक सागर

**A devotional platform for Hindu sacred content**

## About

ShlokSagar is a comprehensive devotional platform featuring:
- **Bhajans** - Devotional songs for various deities
- **Aartis** - Traditional prayer ceremonies
- **Chalisas** - 40-verse devotional hymns
- **Stotras** - Sacred hymns and verses
- **Gita Shloks** - Verses from the Bhagavad Gita
- **Daily Gita Sandesh** - Daily spiritual messages from the Gita
- **Spiritual Quotes** - Inspirational quotes from sacred texts
- **Wallpapers** - Divine imagery for devotion
- **Videos** - Devotional video content
- **Festivals** - Information about Hindu festivals

## Tech Stack

This is the public-facing frontend built with:
- **Vite** - Fast build tool
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS

## Features

- 🌏 **Multi-language Support** - Hindi, Gujarati, and English
- 📱 **Responsive Design** - Works on all devices
- ♿ **Elder-Friendly** - Large text, clean design
- 🔍 **SEO Optimized** - Structured data, meta tags, sitemap
- 🔐 **Authentication** - Email OTP & Google OAuth
- 📊 **Analytics** - Privacy-safe tracking
- 💰 **Monetization** - Impression-based ads system

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Backend API running (see `backend-shloksagar/`)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URLs

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api/v1/public
VITE_APP_URL=https://shloksagar.com
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, Language)
├── lib/           # Utilities and API client
├── pages/         # Route components
├── assets/        # Images and static files
└── App.tsx        # Main app component
```

## Key Components

- **Header** - Navigation with language switcher
- **Footer** - Site links and information  
- **SEOHead** - Meta tags and structured data
- **AdDisplay** - Weighted ad rotation
- **AuthDialog** - Sign-in with email OTP or Google

## License

© 2026 ShlokSagar. All rights reserved.

## Support

For issues or questions, please contact the development team.
