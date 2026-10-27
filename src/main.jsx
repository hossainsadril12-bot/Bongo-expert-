import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

// No router: a path gets its page, every other path the home page.
// A production host must rewrite these paths to /index.html (the Vite dev server already does).
const pages = { '/projects': ProjectsPage, '/about': AboutPage }
const Page = pages[window.location.pathname.replace(/\/$/, '')] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
