type ScrollHintParams = {
  visible: boolean
}

export default function ScrollHint({ visible }: ScrollHintParams) {
  return (
    <div
      className={`mt-16 flex items-center gap-3 transition-all delay-700 duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="border-secondary/15 flex h-12 w-8 items-start justify-center rounded-full border pt-2">
        <div className="bg-secondary/30 h-2.5 w-0.5 animate-bounce rounded-full" />
      </div>
      <span className="text-secondary/30 font-sans text-[0.6rem] tracking-[0.25em] uppercase">Scroll to explore</span>
    </div>
  )
}
