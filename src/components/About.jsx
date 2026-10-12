import Label from './Label'
import Reveal from './Reveal'
import ScrollText from './ScrollText'
import BlurWords from './BlurWords'

export default function About() {
  return (
    <section id="about" className="w-full bg-[#fdfdfd]">
      <div className="mx-auto grid min-h-[1024px] max-w-[1440px] grid-cols-1 content-between gap-16 px-5 py-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-24 lg:px-[60px] lg:py-32">
        <Label className="text-ink lg:col-span-4 lg:self-start lg:pt-[19px]">About Us</Label>

        <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
          <ScrollText
            text="Great design brings clarity through simplicity. We work with ambitious teams to transform complex ideas into digital products that are intuitive, purposeful, and distinctly modern."
            className="font-manrope text-[32px] leading-[1.3] font-medium tracking-[-0.96px] lg:text-[48px]"
          />
        </div>

        <Reveal className="flex gap-6 lg:col-span-7 lg:self-end" delay={0.15}>
          <img
            src="/assets/work1.png"
            alt="Product interface in blue light"
            loading="lazy"
            className="h-[312px] w-[424px] max-w-[60%] rounded-lg object-cover"
          />
          <img
            src="/assets/about-img2.png"
            alt="Dark abstract portrait"
            loading="lazy"
            className="h-[312px] w-[224px] min-w-0 flex-1 rounded-lg object-cover lg:flex-none"
          />
        </Reveal>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <BlurWords
            stagger={0.03}
            className="text-base leading-[1.5] tracking-[-0.32px] text-ink"
            text="We approach every project with precision, velocity, and longevity, considering every detail while removing anything unnecessary. We move with the focus and speed of a small senior team and create digital experiences designed to stay relevant long after current design trends fade."
          />
        </div>
      </div>
    </section>
  )
}
