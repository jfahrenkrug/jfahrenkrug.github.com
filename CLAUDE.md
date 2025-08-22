# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Johannes Fahrenkrug's personal portfolio website built with Astro 5.13.2 and deployed to GitHub Pages via the custom domain `www.springenwerk.com`. The site is a modern portfolio showcasing his freelance full stack development services.

## Tech Stack

- **Astro 5.13.2** - Static site generator with TypeScript support
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **TypeScript 5.9.2** - Configured with strict mode via `astro/tsconfigs/strict`

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build for production (includes type checking with `astro check`) |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Architecture

### Content Management
- Uses Astro Content Collections for structured content
- Work portfolio items defined in `src/content/work/` with schema validation
- Personal recommendations data stored in TypeScript file `src/components/recommendations.ts`
- Large archive of historical blog posts in `parked/src/content/archived_post/` (legacy content)

### Layout Structure
- **BaseLayout.astro** - Main layout with responsive background images and theme system
- Supports light/dark themes with CSS custom properties
- Lazy-loaded background images for performance
- Complex responsive background system with multiple layers

### Key Components
- **Hero.astro** - Main hero section with portrait and taglines
- **Skills.astro** - Professional skills showcase
- **Recommendation.astro** - Client testimonial cards
- **PortfolioPreview.astro** - Work project previews
- Theme system with light/dark mode toggle

### Routing
- Static pages: `/`, `/about`, `/services`, `/imprint`
- Dynamic portfolio routes: `/work/[slug]`
- Legacy post routing: `/[year]/[month]/[slug]` for archived content

### Styling Approach
- Tailwind CSS for utility classes
- Component-scoped CSS in Astro files for complex layouts
- CSS custom properties for theming and responsive backgrounds
- Mobile-first responsive design

## Content Structure

The site uses two main content types:
1. **Work Portfolio** - Projects and case studies in `src/content/work/`
2. **Recommendations** - Client testimonials as TypeScript data

## Deployment

- Builds to `./dist/` directory
- GitHub Pages deployment via CNAME to `www.springenwerk.com`
- Static site optimized for performance with lazy-loaded assets
