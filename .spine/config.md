# .spine/config.md — pinned cross-cutting context (asserted before task one)
- Stack:            Vite 7 + React 19 + Tailwind CSS v4 (@tailwindcss/vite), plain JavaScript (JSX), npm
- Test runner:      Vitest + @testing-library/react (jsdom)
- DB / project / env: none — static front-end, no database, no env vars. Source of truth for design: Figma file yfxrF2Xd3ceuZxaZUUvC6X, node 119:43 (Landing Page)
- Auth context:     none
- Conventions:      one component per section in src/components/*.jsx (PascalCase); Tailwind utilities only, brand tokens in @theme in src/index.css; static assets in public/assets referenced as /assets/<name>; no Figma asset URLs in code
- Boot assertion:   `npm run build` must pass and every /assets/* path referenced in src/ must exist in public/assets
