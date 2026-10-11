import BlurWords from './BlurWords'

// Underline draws in from the left on hover and leaves to the right
const underlineLink =
  'relative inline-block py-2 after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-700 after:ease-lux hover:after:origin-left hover:after:scale-x-100'
// Icons lift a touch and brighten
const iconLink = 'opacity-85 transition-[opacity,translate] duration-500 ease-lux hover:-translate-y-0.5 hover:opacity-100'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0a1015] from-[32%] to-[#006ce6] to-[126%] text-white">
      <div className="mx-auto flex min-h-[482px] max-w-[1320px] flex-col justify-between gap-12 px-5 pt-14 pb-10 lg:px-[60px] xl:px-0">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <BlurWords
            as="h2"
            stagger={0.07}
            className="font-manrope text-[48px] leading-[0.95] font-bold tracking-[-1.28px] lg:text-[64px]"
            segments={[{ text: 'Have an idea?' }, { br: true }, { text: 'Let’s Build It' }]}
          />
          <div className="flex w-full max-w-[357px] flex-col items-start gap-[18px]">
            <p className="font-light leading-[1.3] tracking-[-0.32px]">
              We partner with a limited number of brands each quarter to guarantee uncompromised
              focus.
            </p>
            <a
              href="#contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-blue-active px-6 transition-[background-color,scale] duration-500 ease-lux hover:bg-blue-normal active:scale-[0.98]"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-x-12 gap-y-4 lg:w-[816px] lg:justify-between">
                <img src="/assets/logo-footer.svg" alt="Bongo" className="h-[31px] w-[142.8px]" />
                <ul className="flex items-center gap-6 text-lg">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={underlineLink}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="LinkedIn" className={`relative block size-11 p-[2.5px] ${iconLink}`}><span className="relative block size-[39px]">
                  <img src="/assets/social-circle.svg" alt="" className="absolute inset-0 size-full" />
                  <span className="absolute inset-2 block overflow-hidden">
                    <span className="absolute inset-[8.33%_8.33%_12.5%_8.33%]">
                      <img
                        src="/assets/linkedin.svg"
                        alt=""
                        className="absolute inset-[-5.26%_-5%] block size-[calc(100%+10.5%)] max-w-none"
                      />
                    </span>
                  </span>
                  </span>
                </a>
                <a href="#" aria-label="Social profile" className={`flex size-11 items-center justify-center ${iconLink}`}>
                  <img src="/assets/social2.svg" alt="" className="size-[39px]" />
                </a>
                <a href="#" aria-label="Social profile" className={`flex size-11 items-center justify-center ${iconLink}`}>
                  <img src="/assets/social3.svg" alt="" className="size-[39px]" />
                </a>
              </div>
            </div>
            <div className="h-px w-full bg-white/80" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 font-kantumruy text-sm">
            <p>© 2026 Bongo Expert. All rights reserved.</p>
            <div className="flex items-center gap-[14px]">
              <a href="#" className={underlineLink}>
                Terms of Service
              </a>
              <a href="#" className={underlineLink}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
