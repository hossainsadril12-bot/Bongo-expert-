export default function Label({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <img src="/assets/star.svg" alt="" className="size-3" />
      <p className="font-inter text-base leading-normal">{children}</p>
    </div>
  )
}
