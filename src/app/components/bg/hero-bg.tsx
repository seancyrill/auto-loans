export default function HeroBG() {
  return (
    <>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(var(--secondary) 1px, transparent 1px), linear-gradient(90deg, var(--secondary) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Soft radial wash — top right */}
      <div
        className="pointer-events-none absolute top-[-15%] right-[-8%] h-[640px] w-[640px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)" }}
      />

      {/* Soft radial wash — bottom left */}
      <div
        className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[480px] w-[480px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)" }}
      />

      {/* Vertical hairline */}
      <div
        className="absolute top-0 right-[18%] h-full w-px opacity-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--secondary), transparent)" }}
      />
    </>
  )
}
