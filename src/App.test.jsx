import { render, screen } from '@testing-library/react'
import App from './App'

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

describe('landing page', () => {
  it('renders every section', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/Built for\s*what’s\s*next/)
    expect(screen.getByText('Selected')).toBeTruthy()
    expect(screen.getAllByRole('article')).toHaveLength(7)
    expect(screen.getByText('GET IN TOUCH')).toBeTruthy()
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('has no remote Figma asset URLs and serves assets locally', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).not.toMatch(/figma\.com\/api/)
    container.querySelectorAll('img').forEach((img) => {
      expect(img.getAttribute('src')).toMatch(/^\/assets\//)
    })
  })

  it('has no copy typos or em-dashes', () => {
    const { container } = render(<App />)
    const text = container.textContent
    expect(text).not.toMatch(/compotators|Obtimize|Have and idea|SolarGreen/)
    expect(text).not.toMatch(/[—–]/)
  })

  it('uses one label for the contact intent', () => {
    render(<App />)
    expect(screen.queryByText('Get Consult')).toBeNull()
  })
})
