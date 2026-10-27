import { render, screen, within } from '@testing-library/react'
import ProjectsPage from './ProjectsPage'
import App from '../App'

beforeAll(() => {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }))
})

describe('projects page', () => {
  it('renders the hero, all four projects and the footer', () => {
    const { container } = render(<ProjectsPage />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/Real-World AI\s*Success\s*Stories/)
    expect(screen.getAllByRole('article')).toHaveLength(4)
    for (const title of [
      'AI Customer Support Bot',
      'Predictive Analytics Platform',
      'Smart Vision System',
      'Workflow Automation System',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeTruthy()
    }
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('shows Work as the current page and links the rest back to the home page', () => {
    render(<ProjectsPage />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    const work = within(nav).getByRole('link', { name: 'Work' })
    expect(work.getAttribute('href')).toBe('/projects')
    expect(work.getAttribute('aria-current')).toBe('page')
    expect(within(nav).getByRole('link', { name: 'Services' }).getAttribute('href')).toBe('/#services')
    expect(within(nav).getByRole('link', { name: 'Bongo home' }).getAttribute('href')).toBe('/')
    const footer = document.querySelector('footer')
    expect(within(footer).getByRole('link', { name: 'Process' }).getAttribute('href')).toBe('/#process')
    expect(within(footer).getByRole('link', { name: 'Start a Project' }).getAttribute('href')).toBe('/#contact')
  })

  it('serves only local assets and has no em-dashes', () => {
    const { container } = render(<ProjectsPage />)
    container.querySelectorAll('img').forEach((img) => {
      expect(img.getAttribute('src')).toMatch(/^\/assets\//)
    })
    expect(container.textContent).not.toMatch(/[—–]/)
  })
})

describe('home page links to the projects page', () => {
  it('points Work and "More" at /projects and keeps the other nav anchors in-page', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /More/ }).getAttribute('href')).toBe('/projects')
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    const work = within(nav).getByRole('link', { name: 'Work' })
    expect(work.getAttribute('href')).toBe('/projects')
    expect(work.getAttribute('aria-current')).toBeNull()
    expect(within(nav).getByRole('link', { name: 'Services' }).getAttribute('href')).toBe('#services')
    const footer = document.querySelector('footer')
    expect(within(footer).getByRole('link', { name: 'Work' }).getAttribute('href')).toBe('/projects')
  })
})
