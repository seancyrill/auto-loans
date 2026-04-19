export default function StripeBG() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `repeating-linear-gradient(
            -45deg,
            var(--secondary) 0px,
            var(--secondary) 1px,
            transparent 1px,
            transparent 40px
          )`,
      }}
    />
  )
}
