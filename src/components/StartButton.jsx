// Primary "Start a Project" pill. Compact on phones, full size from `sm` up.
// Hover: the arrow exits right while a twin enters from the left, and the pill brightens.
// No hover scale (it made the text shimmer); only a 0.98 press on click.
export default function StartButton({ href = '#contact', className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`group relative flex w-[232px] max-w-full items-center gap-1 overflow-hidden rounded-full border-2 border-white bg-gradient-to-b from-[#4f84ea] to-[#003498] to-[145%] px-1.5 py-1.5 shadow-[0_0_1px_rgba(0,0,0,0.16)] transition-[scale] duration-150 ease-out active:scale-[0.98] sm:w-[312px] sm:px-2 sm:py-3 ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-700 ease-lux group-hover:bg-white/10"
      />
      <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-[62px]">
        <img
          src="/assets/chevron-right.svg"
          alt=""
          className="size-6 transition-[translate] duration-[800ms] ease-lux-in-out group-hover:translate-x-[150%] motion-reduce:transition-none sm:size-8"
        />
        <img
          src="/assets/chevron-right.svg"
          alt=""
          className="absolute size-6 -translate-x-[150%] transition-[translate] duration-[800ms] ease-lux-in-out group-hover:translate-x-0 group-hover:delay-150 motion-reduce:transition-none sm:size-8"
        />
      </span>
      <span className="relative pl-1 text-[20px] whitespace-nowrap text-blue-light sm:pl-0 sm:text-[32px]">
        Start a Project
      </span>
    </a>
  )
}
