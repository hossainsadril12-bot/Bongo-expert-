import { render, screen, within } from '@testing-library/react'
import AboutPage from './AboutPage'
import App from '../App'
import ProjectsPage from './ProjectsPage'

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

describe('about page', () => {
  it('renders the hero, purpose values, services and footer', () => {
    const { container } = render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/The team behind the work/)
    expect(screen.getByRole('heading', { level: 2, name: /Clarity is a design decision/ })).toBeTruthy()
    expect(screen.getAllByTestId('value-card')).toHaveLength(4)
    for (const s of ['Design', 'Web Development', 'App Development', 'AI Consultant']) {
      expect(screen.getByRole('heading', { level: 3, name: s })).toBeTruthy()
    }
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('shows About as the current page and links the rest correctly', () => {
    render(<AboutPage />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    const about = within(nav).getByRole('link', { name: 'About' })
    expect(about.getAttribute('href')).toBe('/about')
    expect(about.getAttribute('aria-current')).toBe('page')
    expect(within(nav).getByRole('link', { name: 'Work' }).getAttribute('href')).toBe('/projects')
    expect(within(nav).getByRole('link', { name: 'Services' }).getAttribute('href')).toBe('/#services')
  })

  it('serves only local assets and has no em-dashes', () => {
    const { container } = render(<AboutPage />)
    container.querySelectorAll('img').forEach((img) => {
      expect(img.getAttribute('src')).toMatch(/^\/assets\//)
    })
    expect(container.textContent).not.toMatch(/[—–]/)
  })
})

describe('About is reachable from every page nav', () => {
  it.each([
    ['home', App],
    ['projects', ProjectsPage],
  ])('%s nav and footer link About to /about', (_, Page) => {
    render(<Page />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(nav).getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about')
    const footer = document.querySelector('footer')
    expect(within(footer).getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about')
  })
})
