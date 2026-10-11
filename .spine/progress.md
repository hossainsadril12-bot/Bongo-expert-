# .spine/progress.md — ledger (the CONTROLLER writes this, never a subagent)
<!-- One line appended per completed task: [task-id] DONE <short summary> <commit-sha> -->
[landing] DONE Figma landing page (node 119:43) built in Vite + React + Tailwind v4, 7 sections + Label/Reveal/BlurWords/ScrollText/TiltImage
[refine] DONE copy fixes, AA contrast, responsive grids, focus states, footer logo O cut-outs
[motion] DONE Nivora-inspired motion: Lenis, hero pin + intro, blur-word reveals, project reveal + tilt, pinned services crossfade, pinned process cards, pinned contact grow; one motion system in src/lib/motion.js (slow "luxury" timing)
[qa] DONE browser QA 25/25 via e2e/landing.e2e.mjs (npm run test:e2e against dev server)

## Open items for next session
- Services: add real images for Web Development, App Development, AI Consultant (fill `background`, `card`, `cardAlt` in src/components/Design.jsx; placeholders show "Image coming soon")
- Contact email hello@bongo.expert is a placeholder
- Projects 1 and 3 share the same copy (as in Figma)
- Optional: nav highlight for the section in view
