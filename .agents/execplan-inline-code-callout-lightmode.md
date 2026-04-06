# Fix inline code contrast inside callouts in light mode

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document is maintained in accordance with `.agents/PLANS.md`.

## Purpose / Big Picture

Readers should be able to read inline code snippets inside `Callout` components in light mode without squinting. Right now those snippets render with very low contrast in light mode, while dark mode is acceptable. After this change, inline code in callouts will use a readable foreground/background combination in both themes, and the fix will be verifiable by running the site and checking an article that includes callouts with inline code.

## Progress

- [x] (2026-02-26 15:46Z) Reviewed `.agents/PLANS.md` requirements and identified the relevant styling files.
- [x] (2026-02-26 15:46Z) Located the callout inline-code selectors in `src/components/Callout.astro` and the global inline-code baseline in `src/styles/global.css`.
- [x] (2026-02-26 15:47Z) Implemented the callout inline-code style fix using existing theme variables only.
- [x] (2026-02-26 15:47Z) Ran repository validation (`npm run build`) and confirmed no build regressions.
- [x] (2026-02-26 15:47Z) Updated this plan with final outcomes and evidence.

## Surprises & Discoveries

Observation: `Callout.astro` references `--gray-999-rgb`, `--gray-800-rgb`, and `--gray-200-rgb`, but those CSS custom properties are not defined in `src/styles/global.css`.
Evidence: Searching the repo for `gray-200-rgb` and `gray-800-rgb` returned only `src/components/Callout.astro`.

Observation: In light mode, the callout-specific inline-code override sets text color to `var(--gray-800)`, which resolves to a very light color in this palette.
Evidence: `src/styles/global.css` defines `--gray-800: #e3e6ee` in light mode.

## Decision Log

- Decision: Keep the fix scoped to `src/components/Callout.astro` and avoid global palette changes.
  Rationale: The user-reported issue is specific to callouts in light mode, and a localized CSS fix minimizes risk to the rest of the site.
  Date/Author: 2026-02-26 / Codex

- Decision: Replace callout inline-code rules so they target only inline code (`:not(pre) > code`) and use existing cross-theme variables (`--gray-900`, `--gray-700`, `--gray-100`).
  Rationale: This removes dependence on undefined `*-rgb` variables and guarantees strong contrast in both light and dark themes.
  Date/Author: 2026-02-26 / Codex

## Outcomes & Retrospective

The change was completed with a narrow scope in `src/components/Callout.astro`. Inline code inside callouts now uses a selector that only targets inline snippets (`:not(pre) > code`) and theme-safe variables that exist in the global palette. This resolves the low-contrast light-mode behavior while preserving readability in dark mode. Build validation passed, so the change integrates cleanly with the existing Astro pipeline.

## Context and Orientation

This site is an Astro project. Global inline-code styling is defined in `src/styles/global.css` using the selector `:not(pre) > code`. The `Callout` component in `src/components/Callout.astro` adds component-scoped styles and currently overrides `code` styling inside callouts. The bug appears because callout-specific light-mode colors produce low contrast and rely on undefined RGB custom properties. The fix should keep dark mode behavior acceptable while improving light mode readability.

## Plan of Work

Edit `src/components/Callout.astro` in the `<style>` block. Replace the current callout-specific `code` rules with a single rule that targets inline code only (`.callout-content :global(:not(pre) > code)`). Set its background, border, and text color using existing variables that are already theme-aware in `src/styles/global.css`. Remove the light-mode-only override that introduces low-contrast text. Do not modify global typography or palette variables.

After editing, run `npm run build` from the repository root to ensure Astro check and production build both pass.

## Concrete Steps

From `/Users/johannes/Code/jfahrenkrug.github.com`:

1. Edit `src/components/Callout.astro` and replace the callout inline-code declarations.
2. Run:

    npm run build

Expected outcome: build completes successfully and reports Astro checks passing.

## Validation and Acceptance

Acceptance is satisfied when all of the following are true:

1. `npm run build` succeeds from the repo root.
2. In light mode, inline code inside callouts is clearly readable (dark text on a light-enough code background with a visible border).
3. In dark mode, inline code inside callouts remains readable and visually consistent.
4. Block code (`pre code`) inside callouts is not restyled as inline code.

A manual visual check can be done by running `npm run dev` and opening any writing page that includes callouts with inline code (for example, `src/content/writing/astro-relaunch.mdx`).

## Idempotence and Recovery

The CSS edits are idempotent: reapplying them results in the same file content. If the visual result is not acceptable, recover by restoring only `src/components/Callout.astro` from git history and then reapply a narrower selector/value adjustment. No data migration or destructive action is involved.

## Artifacts and Notes

Implementation artifact:

    src/components/Callout.astro
    - Replaced `.callout-content :global(code)` and light-mode override with:
      `.callout-content :global(:not(pre) > code)` using `--gray-900`, `--gray-700`, `--gray-100`.

Validation artifact:

    npm run build
    - astro check: 0 errors, 0 warnings, 1 hint
    - astro build: complete
    - built pages: 305

## Interfaces and Dependencies

No new libraries or runtime dependencies are introduced. The change depends only on existing CSS custom properties declared in `src/styles/global.css` and component-scoped styling in `src/components/Callout.astro`.

Plan revision note (2026-02-26): Created initial ExecPlan with repository context, root-cause findings, and concrete implementation/validation steps before applying code changes.
Plan revision note (2026-02-26): Updated living sections after implementation to record the completed CSS selector/value changes and successful `npm run build` evidence.
