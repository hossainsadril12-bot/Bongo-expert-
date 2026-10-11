// One motion language for the whole page: unhurried, soft deceleration, no bounce.
// CSS hovers use the matching tokens in index.css (`ease-lux`, `ease-lux-in-out`).

export const ease = {
  // Arrivals: moves straight away, then a long silky settle
  out: [0.22, 1, 0.36, 1],
  // Things travelling or drawing across the screen
  inOut: [0.65, 0, 0.35, 1],
}

export const dur = {
  text: 1.1, // a word or line arriving
  block: 1.2, // paragraphs, buttons, cards
  image: 1.6, // image wipes and crossfades
  line: 1.8, // rules drawing across the page
  exit: 0.6, // leaving is always quicker than arriving
}

export const stagger = {
  words: 0.06,
  lines: 0.14,
  items: 0.1,
}
