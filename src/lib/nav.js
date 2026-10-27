// Primary links shared by the nav, mobile menu and footer.
// Work and About are their own pages (/projects, /about) and show as active there.
// Services and Process are home-page sections: in-page anchors on home, links back home elsewhere.
export function navLinks(page = 'home') {
  const home = page === 'home'
  const to = (hash) => (home ? hash : `/${hash}`)
  return [
    { label: 'Work', href: '/projects', active: page === 'projects' },
    { label: 'Services', href: to('#services') },
    { label: 'About', href: '/about', active: page === 'about' },
    { label: 'Process', href: to('#process') },
  ]
}

export function pageHrefs(page = 'home') {
  const home = page === 'home'
  return { home: home ? '#' : '/', contact: home ? '#contact' : '/#contact' }
}
