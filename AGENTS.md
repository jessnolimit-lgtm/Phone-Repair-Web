# phonefix-saas

React 19 + Vite 8 + Tailwind CSS v4 SaaS Website Application.

## Development Server

A Vite development server runs on `$PORT` (default 8443).

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component with React Router provider
- `src/routes.ts` - Application route definitions
- `src/pages/` - Page view components (Landing, Login, Register, Dashboard, etc.)
- `src/components/` - Reusable UI components
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing `#root`
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and `@` alias for `src`

## Dependencies

- Runtime: React 19, React DOM 19, React Router 8
- Styling: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through `@tailwindcss/vite`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or custom rules in `src/index.css`.

## Code Quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export components cleanly.
