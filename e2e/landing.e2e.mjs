// End-to-end QA for the landing page, driven in a real Chromium against the running app.
// Run:  npm run dev   (in one terminal)   then   npm run test:e2e
// Env:  BASE_URL (default http://localhost:5173)
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173/'
const OUT = new URL('./__artifacts__/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const results = []
async function check(name, fn) {
  try {
    await fn()
    results.push({ name, ok: true })
    console.log(`  ✓ ${name}`)
  } catch (e) {
    results.push({ name, ok: false, err: e.message })
    console.log(`  ✗ ${name}\n      ${e.message}`)
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function openPage(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 945 }, ...opts })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  return { ctx, page, errors }
}

// Waits for any running Lenis glide to finish first; a jump issued mid-glide gets overridden by it
const scrollTo = async (page, y) => {
  await settle(page)
  await page.evaluate((y) => window.scrollTo(0, y), y)
}
// Resolves once the page has stopped scrolling (same scrollY across 300ms), up to 6s
const settle = (page) =>
  page.evaluate(
    () =>
      new Promise((done) => {
        let last = -1
        const start = performance.now()
        const tick = () => {
          if (window.scrollY === last || performance.now() - start > 6000) return done()
          last = window.scrollY
          setTimeout(tick, 300)
        }
        tick()
      }),
  )
const docTop = (page, sel) =>
  page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + window.scrollY, sel)
const noOverflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)

const browser = await chromium.launch()

/* ------------------------------------------------------------------ desktop */
console.log('\nDesktop 1920x945')
{
  const { ctx, page, errors } = await openPage(browser)
  const vh = 945

  await check('loads with one h1 and the right title', async () => {
    assert((await page.title()) === 'Bongo Expert', `title was "${await page.title()}"`)
    const h1s = await page.$$eval('h1', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()))
    assert(h1s.length === 1, `expected 1 h1, got ${h1s.length}`)
    assert(/Built for\s*what’s\s*next/.test(h1s[0]), `h1 was "${h1s[0]}"`)
  })

  await check('hero intro settles: headline and CTA fully visible', async () => {
    await page.waitForTimeout(3200)
    const s = await page.evaluate(() => {
      const op = (el) => Number(getComputedStyle(el).opacity)
      const lines = [...document.querySelectorAll('h1 > span')].map(op)
      const cta = [...document.querySelectorAll('a')].find((a) => a.textContent.includes('Start a Project') && a.querySelector('img'))
      return { lines, cta: op(cta.parentElement) }
    })
    assert(s.lines.every((o) => o === 1), `headline line opacities ${s.lines}`)
    assert(s.cta === 1, `CTA opacity ${s.cta}`)
  })

  await check('no nav item is marked active', async () => {
    const n = await page.$$eval('nav[aria-label=Primary] [aria-current]', (e) => e.length)
    assert(n === 0, `${n} nav items carry aria-current`)
  })

  await check('nav hover draws the underline in', async () => {
    const link = page.locator('nav[aria-label=Primary] a', { hasText: 'Services' })
    const before = await link.evaluate((e) => getComputedStyle(e, '::after').scale)
    const bb = await link.boundingBox()
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2)
    await page.waitForTimeout(1200)
    const after = await link.evaluate((e) => getComputedStyle(e, '::after').scale)
    assert(/^0/.test(before) && after === '1', `underline scale ${before} -> ${after}`)
    await page.mouse.move(1800, 900)
  })

  await check('nav anchors land on their sections', async () => {
    for (const [label, sel] of [['Process', '#process'], ['Work', '#work'], ['About', '#about']]) {
      // Poll instead of fixed sleeps: the 2s anchor glide can run long on a busy dev server.
      // Let any running glide finish first, or Lenis carries on toward its old target after the jump.
      await settle(page)
      await scrollTo(page, 0)
      await settle(page)
      await page.locator('nav[aria-label=Primary] a', { hasText: label }).click()
      const landed = await page
        .waitForFunction((s) => Math.abs(document.querySelector(s).getBoundingClientRect().top) <= 40, sel, { timeout: 5000, polling: 100 })
        .then(() => true, () => false)
      const top = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top, sel)
      assert(landed, `${label}: ${sel} top is ${Math.round(top)}px after click`)
    }
  })

  await check('About headline fills grey to blue, first word first', async () => {
    const top = await docTop(page, '#about p[aria-label]')
    const colours = async () =>
      page.$$eval('#about p[aria-label] [aria-hidden] > span', (els) => [
        getComputedStyle(els[0]).color,
        getComputedStyle(els[els.length - 1]).color,
      ])
    await settle(page)
    await scrollTo(page, top - 600)
    await page.waitForTimeout(900)
    const [first, last] = await colours()
    assert(first !== last, `mid-scroll first/last word colours both ${first}`)
    // Resting position: About has fully covered the hero, headline sits 128px from the top
    const aboutTop = await docTop(page, '#about')
    await scrollTo(page, aboutTop)
    await page.waitForTimeout(900)
    const [f2, l2] = await colours()
    assert(f2 === l2, `at rest, first/last word colours differ: ${f2} / ${l2}`)
  })

  await check('project rows reveal their images and they load', async () => {
    const top = await docTop(page, '#work')
    for (let y = top; y < top + 1800; y += 400) {
      await scrollTo(page, y)
      await page.waitForTimeout(500)
    }
    await page.waitForTimeout(2200)
    const s = await page.$$eval('#work article', (rows) =>
      rows.map((r) => ({
        clip: getComputedStyle(r.querySelector('img').closest('[style*="clip-path"]')).clipPath,
        loaded: r.querySelector('img').naturalWidth > 0,
      })),
    )
    assert(s.length === 3, `expected 3 rows, got ${s.length}`)
    s.forEach((r, i) => {
      assert(r.loaded, `row ${i + 1} image did not load`)
      // The wipe ends at inset(-8%) and then drops the clip, so the hover tag can pass the frame edge
      assert(r.clip === 'none', `row ${i + 1} clip stuck at ${r.clip}`)
    })
  })

  await check('project image tilt ends on scroll and resumes only on a real pointer move', async () => {
    const rowTop = await page.evaluate(() => document.querySelector('#work article').getBoundingClientRect().top + scrollY)
    await scrollTo(page, rowTop - 150)
    await page.waitForTimeout(2200)
    const frame = page.locator('#work article').first().locator('.cursor-pointer')
    const tilt = () => frame.evaluate((d) => getComputedStyle(d).transform)
    // The tilt spring eases out asymptotically, so "flat" means within 0.005 (~0.3°) of identity, not exactly 'none'
    const flat = (t) => t === 'none' || t.slice(t.indexOf('(') + 1, -1).split(',').map(Number)
      .every((v, i) => Math.abs(v - [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1][i]) < 0.005)
    const bb = await frame.boundingBox()
    await page.mouse.move(bb.x + bb.width * 0.9, bb.y + bb.height * 0.2, { steps: 4 })
    await page.waitForTimeout(1500)
    assert(!flat(await tilt()), 'image did not tilt on hover')
    await page.mouse.wheel(0, 900)
    await settle(page)
    await page.waitForTimeout(1200)
    assert(flat(await tilt()), `still tilted after scrolling away: ${await tilt()}`)
    await page.mouse.wheel(0, -900)
    await settle(page)
    await page.waitForTimeout(1200)
    // Scrolling the image back under a still cursor must not re-tilt it (that made passing images flicker)
    assert(flat(await tilt()), `tilted from scrolling alone: ${await tilt()}`)
    await page.mouse.move(bb.x + bb.width * 0.85, bb.y + bb.height * 0.25, { steps: 4 })
    await page.waitForTimeout(1500)
    assert(!flat(await tilt()), 'did not tilt again on pointer move after scrolling back')
    await page.mouse.move(1900, 10)
  })

  await check('services frame pins and switches Design > Web > App > AI, card centred', async () => {
    const top = await docTop(page, '#services')
    const expected = ['Design', 'Web Development', 'App Development', 'AI Consultant']
    for (let i = 0; i < 4; i++) {
      await scrollTo(page, top + i * vh)
      await page.waitForTimeout(3200)
      const s = await page.evaluate(() => {
        const sticky = document.querySelector('#services > .sticky')
        const layers = [...sticky.children].filter((l) => getComputedStyle(l).opacity === '1')
        const card = layers[0]?.querySelector('[class*="h-[400px]"]')
        const r = card?.getBoundingClientRect()
        return {
          stickyTop: Math.round(sticky.getBoundingClientRect().top),
          visible: layers.length,
          title: layers[0]?.querySelector('h2').textContent.replace(/\s+/g, ' ').trim(),
          cx: r && Math.round(r.left + r.width / 2),
          cy: r && Math.round(r.top + r.height / 2),
        }
      })
      assert(s.stickyTop === 0, `slot ${i}: frame not pinned (top ${s.stickyTop})`)
      assert(s.visible === 1, `slot ${i}: ${s.visible} layers visible at once`)
      assert(s.title === expected[i], `slot ${i}: showing "${s.title}"`)
      assert(Math.abs(s.cx - 960) <= 2 && Math.abs(s.cy - 473) <= 3, `slot ${i}: card centre ${s.cx},${s.cy}`)
    }
  })

  await check('process cards rise in while pinned; hover reveals only that card', async () => {
    const top = await docTop(page, '#process')
    const h = await page.$eval('#process', (e) => e.offsetHeight)
    await scrollTo(page, top + h - vh)
    await page.waitForTimeout(1800)
    const ops = await page.$$eval('#process li', (lis) => lis.map((li) => Number(getComputedStyle(li).opacity)))
    assert(ops.length === 4 && ops.every((o) => o === 1), `card opacities at end ${ops}`)
    const cards = page.locator('#process article')
    const bb = await cards.nth(1).boundingBox()
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2)
    await page.waitForTimeout(1300)
    const h3 = await page.$$eval('#process article h3', (els) => els.map((e) => getComputedStyle(e).opacity))
    assert(h3.join(',') === '0,1,0,0', `title opacities while hovering card 2: ${h3}`)
    await page.mouse.move(1900, 10)
  })

  await check('contact frame pins and grows heading and button to full size', async () => {
    const top = await docTop(page, '#contact')
    const h = await page.$eval('#contact', (e) => e.offsetHeight)
    await scrollTo(page, top)
    await page.waitForTimeout(1500)
    const small = await page.$eval('#contact h2', (e) => e.getBoundingClientRect().width)
    await scrollTo(page, top + h - vh)
    await page.waitForTimeout(1500)
    const s = await page.evaluate(() => ({
      sticky: Math.round(document.querySelector('#contact > .sticky').getBoundingClientRect().top),
      h2: document.querySelector('#contact h2').getBoundingClientRect().width,
      btn: document.querySelector('#contact a').getBoundingClientRect().height,
      href: document.querySelector('#contact a').getAttribute('href'),
    }))
    assert(s.sticky === 0, `contact frame not pinned (top ${s.sticky})`)
    assert(s.h2 > small * 1.8, `heading grew only ${Math.round(small)} -> ${Math.round(s.h2)}`)
    assert(s.btn >= 79, `button height ${s.btn}`)
    assert(s.href === 'mailto:hello@bongo.expert', `button href ${s.href}`)
  })

  await check('every image on the page loads', async () => {
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += 700) {
      await scrollTo(page, y)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(1500)
    const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')))
    assert(broken.length === 0, `broken images: ${broken.join(', ')}`)
  })

  await check('footer logo O counters are transparent cut-outs', async () => {
    const svg = await page.evaluate(() => fetch('/assets/logo-footer.svg').then((r) => r.text()))
    assert(!svg.includes('#385975'), 'logo still has the slate counter fill')
    assert((svg.match(/fill-rule="evenodd"/g) || []).length >= 2, 'O paths are not even-odd cut-outs')
  })

  await check('no console errors on desktop', async () => {
    assert(errors.length === 0, errors.slice(0, 3).join(' | '))
  })

  await page.screenshot({ path: new URL('desktop-end.png', OUT).pathname.slice(1) })
  await ctx.close()
}

/* ------------------------------------------------------------------ laptop */
console.log('\nLaptop 1024x768')
{
  const { ctx, page, errors } = await openPage(browser, { viewport: { width: 1024, height: 768 } })
  await check('no horizontal overflow at 1024px', async () => {
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += 900) {
      await scrollTo(page, y)
      await page.waitForTimeout(100)
      assert(await noOverflow(page), `overflow at scroll ${y}`)
    }
  })
  await check('process uses the plain grid below 1280px (not pinned)', async () => {
    const pinned = await page.$('#process > .sticky')
    assert(!pinned, 'process is pinned at 1024px')
  })
  await check('tablet keeps the nav links and header button, no hamburger', async () => {
    assert(!(await page.getByRole('button', { name: 'Open menu' }).isVisible()), 'hamburger visible at 1024px')
    assert(await page.locator('header a', { hasText: 'Start a Project' }).isVisible(), 'header pill hidden at 1024px')
  })
  await check('no console errors at 1024px', async () => assert(errors.length === 0, errors.slice(0, 3).join(' | ')))
  await ctx.close()
}

/* ------------------------------------------------------------------ mobile */
console.log('\nMobile 390x844 (touch)')
{
  const { ctx, page, errors } = await openPage(browser, {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  })
  await check('no horizontal overflow on mobile', async () => {
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += 800) {
      await scrollTo(page, y)
      await page.waitForTimeout(80)
      assert(await noOverflow(page), `overflow at scroll ${y}`)
    }
  })
  await check('services fall back to four stacked sections', async () => {
    const ids = await page.$$eval('#services > section', (s) => s.map((e) => e.id))
    assert(ids.join(',') === 'design,web-development,app-development,ai-consultant', `got ${ids}`)
  })
  await check('process card text is visible without hover on touch', async () => {
    const top = await docTop(page, '#process')
    await scrollTo(page, top + 300)
    await page.waitForTimeout(1800)
    const ops = await page.$$eval('#process article h3', (els) => els.map((e) => getComputedStyle(e).opacity))
    assert(ops.every((o) => o === '1'), `title opacities ${ops}`)
  })
  await check('contact is the plain panel on mobile', async () => {
    assert(!(await page.$('#contact > .sticky')), 'contact is pinned on mobile')
  })
  await check('hamburger menu opens, closes on Escape, and its links scroll to sections', async () => {
    await scrollTo(page, 0)
    await page.waitForTimeout(600)
    const open = page.getByRole('button', { name: 'Open menu' })
    assert(await open.isVisible(), 'hamburger not visible')
    assert(!(await page.locator('header a', { hasText: 'Start a Project' }).isVisible()), 'header pill still visible')
    await open.click()
    await page.waitForTimeout(1500)
    assert(await page.$eval('#mobile-menu', (d) => d.open), 'menu did not open')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(1000)
    assert(!(await page.$eval('#mobile-menu', (d) => d.open)), 'Escape did not close the menu')
    await open.click()
    await page.waitForTimeout(1500)
    await page.locator('#mobile-menu a', { hasText: 'Process' }).click()
    await page.waitForTimeout(3200)
    const top = await page.evaluate(() => document.querySelector('#process').getBoundingClientRect().top)
    assert(Math.abs(top) <= 40, `#process top is ${Math.round(top)}px after menu click`)
    assert((await page.evaluate(() => document.documentElement.style.overflow)) === '', 'page still scroll-locked')
  })
  await check('no console errors on mobile', async () => assert(errors.length === 0, errors.slice(0, 3).join(' | ')))
  await page.screenshot({ path: new URL('mobile-top.png', OUT).pathname.slice(1) })
  await ctx.close()
}

/* ------------------------------------------------------------------ reduced motion */
console.log('\nReduced motion 1920x945')
{
  const { ctx, page, errors } = await openPage(browser, { reducedMotion: 'reduce' })
  await check('headline and text are visible immediately', async () => {
    await page.waitForTimeout(200)
    const s = await page.evaluate(() => ({
      lines: [...document.querySelectorAll('h1 > span')].map((e) => getComputedStyle(e).opacity),
      words: [...document.querySelectorAll('[aria-hidden] > span > .inline-block')].slice(0, 20).map((e) => getComputedStyle(e).opacity),
    }))
    assert(s.lines.every((o) => o === '1'), `headline opacities ${s.lines}`)
    assert(s.words.every((o) => o === '1'), `word opacities ${s.words}`)
  })
  await check('nothing is pinned under reduced motion', async () => {
    const pinned = await page.$$eval('#services > .sticky, #process > .sticky, #contact > .sticky', (e) => e.length)
    assert(pinned === 0, `${pinned} pinned sections`)
  })
  await check('no console errors with reduced motion', async () => assert(errors.length === 0, errors.slice(0, 3).join(' | ')))
  await ctx.close()
}

await browser.close()

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
