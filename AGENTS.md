# Repository Guidelines

## Project Structure & Module Organization
Astro 5 + Tailwind site. `src/pages/` defines routes as `.astro` files; `src/layouts/` hosts shared wrappers. UI fragments live in `src/components/`, while global styles belong in `src/styles/`. Content collections (talks, posts) live under `src/content/` as Markdown or MDX; update collection schemas when adding new fields. Static assets reside in `public/` and are referenced with absolute paths (e.g., `/images/avatar.png`). Built artifacts are emitted to `dist/` and should not be committed.

## Build, Test, and Development Commands
`npm install` synchronizes dependencies. `npm run dev` launches the dev server on `http://localhost:4321` with hot reload. `npm run build` runs `astro check` and produces the optimized site in `dist/`. `npm run preview` serves the production build for final smoke tests. `npm run astro -- check` runs the validator without building when you want a quick schema/type sanity check.

## Coding Style & Naming Conventions
Rely on the default Astro/Prettier formatting (2-space indent, trailing semicolons in TypeScript). Name components and layouts with PascalCase (`HeroBanner.astro`), content entries with kebab-case filenames, and exported slugs in frontmatter. Keep Tailwind utility classes inline; extract shared styles into `src/styles/` only when reuse is clear. Prefer TypeScript types for props, and surface data via the content collections API rather than hard-coded paths.

## Testing Guidelines
No dedicated unit suite exists; treat `npm run build` as the required gate before each PR. Use `npm run preview` for manual regression checks and attach screenshots or notes when visual changes differ. When altering content schemas, run `npm run astro -- check` to confirm all entries pass validation; add temporary fixtures when introducing new required fields.

## Commit & Pull Request Guidelines
Follow the conventional commit patterns already in history (`feat`, `fix`, `chore`, optional scope). Keep subject lines under 72 characters and written in the imperative mood. PRs should describe what changed, why it matters, reference related issues, and include screenshots or links for UI/UX updates. Squash or rebase before merge to maintain a linear history, and confirm the build or preview output before requesting review.

## Content Authoring Tips
Add new posts or talks in the relevant folder within `src/content/`; include frontmatter that matches the collection schema. Place media in `public/images/` and reference them with `/images/...` paths. Update highlights or navigation via the corresponding component in `src/components/` to keep the site in sync with new content.

## ExecPlans
For complex features or significant refactors, create and maintain an ExecPlan per `.agent/PLANS.md`. Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` up to date during implementation.
