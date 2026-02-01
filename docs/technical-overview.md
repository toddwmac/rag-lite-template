# Project Summary: RAG-Lite Gold Standard Template
**Date**: January 31, 2026
**Status**: FINALIZED - TEMPLATE READY

## 1. Modular Technical Architecture
- **Framework**: Next.js 15+ (Turbopack)
- **State Management**: Custom React Hooks (`useFiles`, `usePersona`)
- **Service Layer**: Decoupled file parsing (`file-service.ts`) and prompt engineering (`ai-prompt.ts`).
- **Validation**: Zod schema-based API protection.
- **AI Model**: Claude 3 Haiku (Configurable via `siteConfig`).

## 2. Intelligence Features
- **Dynamic Context**: Prioritizes local documents with user-controlled selection.
- **Zero-Hallucination Policy**: Strict system rules ensuring accuracy over creativity.
- **Persona Tuning Lab**: Real-time instruction adjustment with browser persistence.
- **Multi-format Support**: Integrated parsing for Markdown, Text, and PDF.

## 3. Template Benefits
- **Identity Swapping**: `src/config/site.ts` allows instant rebranding.
- **Type Safety**: No more `any` types; full schema validation for robust API interactions.
- **Clean UI**: Highly decomposed components (`Header`, `Sidebar`, `ChatInput`) for easy modification.

## 4. Maintenance
- **CI/CD**: Fully compatible with Vercel and GitHub Actions.
- **Code Quality**: Passes strict ESLint checks.
