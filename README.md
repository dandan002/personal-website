# Personal Website

Minimal personal portfolio website built with Next.js 16 and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel
- Might embed my Instagram and GMaps pages later, idk yet.

## Features

- Dynamic GitHub projects
- Scroll-triggered reveal animations
- Resume download, email, LinkedIn, GitHub links

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Run linter
npm run lint
```

## Project Structure

```
app/
├── page.tsx      # Main page (async Server Component)
├── layout.tsx    # Root layout
└── globals.css   # Global styles & Tailwind config
components/
├── Nav.tsx       # Sticky navigation (client component)
└── ScrollReveal.tsx  # IntersectionObserver animation wrapper
lib/
└── data.ts       # All static content (bio, experience, skills)
public/
└── resume.pdf    # Your resume (place here)
```

### GitHub Projects
Projects are fetched from `https://api.github.com/users/dandan002/repos`. Update the username in `app/page.tsx:17` to show your own repositories.

### Styling
Design tokens are defined in `app/globals.css`:
- Color palette (BG, Surface, Border, Text, Muted, Accent)
- Fonts (Syne for headings, DM Mono for body)

## Architecture

- **Server Component**: `page.tsx` fetches GitHub repos at build time with ISR fallback
- **Client Components**: `Nav` and `ScrollReveal` use `"use client"` directive
- **Animations**: CSS transitions triggered by `.visible` class via IntersectionObserver

## Deployment

Deployed to Vercel. Push to main branch for automatic deployment.