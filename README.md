# RAG-Lite Gold Standard Template

A professional-grade, modular "drop-and-go" RAG (Retrieval-Augmented Generation) template built with Next.js 15+, Tailwind CSS 4, and the Vercel AI SDK. 

Designed for quick deployment of context-aware intelligence nodes with zero-friction configuration.

## 🚀 Quick Start

### 1. Configure Your Identity
Open `src/config/site.ts` and update your branding, defaults, and AI model:
```typescript
export const siteConfig = {
  name: "Your App Name",
  company: {
    name: "Your Company",
    logo: "https://your-logo-url.png",
    // ...
  },
  ai: {
    defaultModel: "claude-3-haiku-20240307",
    // ...
  }
};
```

### 2. Add Your Knowledge Base
Drop your `.md`, `.txt`, or `.pdf` files into the `/data` folder. These files are **tracked by Git** as your primary knowledge base and will be automatically discovered and indexed upon deployment.

### 3. Set Your Environment Variables
Create a `.env.local` file:
```bash
ANTHROPIC_API_KEY=your_key_here
```

### 4. Run Locally
```bash
npm install
npm run dev
```

---

## 🛠 Features

- **Modular Architecture**: Clean separation of concerns with dedicated components, hooks, and services.
- **Vercel Optimized**: Pre-configured with a 30-second `maxDuration` for stable streaming on serverless infrastructure.
- **Centralized Config**: One file to rule them all. Update branding and AI settings in seconds.
- **Production-Ready Grounding**: Verified support for Markdown, Plain Text, and PDF parsing.
- **Interactive Knowledge Base**: Users can toggle specific documents on/off for every query via a sidebar.
- **Live Persona Tuning**: A built-in "Command Console" for real-time adjustment of AI behavior with `localStorage` persistence.
- **Robust Type Safety**: Full TypeScript integration with **Zod** schema validation for all API inputs.
- **Modern UI**: Styled with Tailwind CSS 4 and Lucide icons, featuring a premium "Document Intelligence" aesthetic.

## 📁 Project Structure

- `src/config/`: Branding and AI configuration.
- `src/components/`: Reusable UI components (Header, Sidebar, ChatWindow, etc.).
- `src/hooks/`: Custom React hooks for file management and persona state.
- `src/lib/`: Core services (File parsing, Prompt construction, Zod validations).
- `src/app/api/`: Optimized API routes with streaming support.
- `data/`: Your local knowledge base files.

## 🧪 Testing & Quality

- **Linting**: Pass `npm run lint` for code quality checks.
- **Type Checking**: Strict TypeScript mode enabled.
- **Performance**: Optimized images using `next/image` and deferred client-side mounting.

## 📚 Documentation

For more detailed information about the project's background and technical implementation, see the `docs/` folder:

- [Technical Overview](docs/technical-overview.md) - Deep dive into features and architecture.
- [Deployment Guide](docs/deployment-guide.md) - Best practices for Vercel deployment.
- [Project Roadmap](docs/project-roadmap.md) - Implementation history and future ideas.
- [Troubleshooting & Learnings](docs/troubleshooting-learnings.md) - Solutions to common issues encountered during development.
- [Branding Strategy](docs/branding-strategy.md) - Original design and branding goals.

## 🚢 Deployment

Optimized for **Vercel** serverless environments. 
1. **Data Sync**: Ensure your knowledge base files are in `/data`. The system whitelists `.md`, `.txt`, and `.pdf` in `.gitignore` to ensure they sync to your deployment.
2. **Push**: Commit and push your code to GitHub.
3. **Connect**: Link your repository in the Vercel Dashboard.
4. **Environment**: Add your `ANTHROPIC_API_KEY` to the Vercel project environment variables.

---

*Built with ❤️ for rapid AI development.*