// Bongo type scale, taken from the home page sections so new pages read as the same site.
// Headings: Manrope. Body: Inter (the body default). Colour is left to the caller.

export const type = {
  // Hero headline (Hero.jsx): regular weight, tight, very large
  display: 'font-manrope text-[56px] leading-none font-normal tracking-[-1.28px] sm:text-[72px] lg:text-[80px] lg:tracking-[-2.56px]',
  // Section headline (Projects "Selected Projects", Design, Footer)
  h2: 'font-manrope text-[40px] leading-[1.1] font-semibold tracking-[-1.28px] lg:text-[64px]',
  // Same size, regular weight: for pages whose H1 is the regular-weight display (About)
  h2Regular: 'font-manrope text-[40px] leading-[1.1] font-normal tracking-[-1.28px] lg:text-[64px]',
  // Card / item title (Projects row title)
  h3: 'font-manrope text-[28px] leading-[1.3] font-medium tracking-[-0.64px] lg:text-[32px]',
  // Body copy (About, Projects)
  body: 'text-base leading-[1.5] tracking-[-0.32px]',
  // Small metadata (Projects deliverable/industry labels)
  meta: 'text-xs leading-[1.5] tracking-[-0.24px]',
}
