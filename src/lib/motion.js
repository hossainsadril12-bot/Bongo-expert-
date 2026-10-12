// One motion language for the whole page: unhurried, soft deceleration, no bounce.
// CSS hovers use the matching tokens in index.css (`ease-lux`, `ease-lux-in-out`).

export const ease = {
  // Arrivals: eases off the mark (no snap), then a long silky settle.
  // A steeper start like [0.22, 1, 0.36, 1] covers most of the distance in the first quarter and reads as fast.
  out: [0.3, 0.55, 0.15, 1],
  // Things travelling or drawing across the screen
  inOut: [0.65, 0, 0.35, 1],
}

export const dur = {
  text: 1.6, // a word or line arriving
  block: 1.7, // paragraphs, buttons, cards
  image: 2.2, // image wipes and crossfades
  line: 2.4, // rules drawing across the page
  exit: 0.8, // leaving is always quicker than arriving
}

export const stagger = {
  words: 0.09,
  lines: 0.2,
  items: 0.15,
}
