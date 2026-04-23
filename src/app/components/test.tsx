// /form

"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "3 mins", label: "Average application time" },
  { value: "100%", label: "Online — no branch visits" },
  { value: "24hrs", label: "Decision turnaround" },
]

const loanTypes = [
  { icon: "🏠", label: "Home Loan" },
  { icon: "🚗", label: "Auto Loan" },
  { icon: "💼", label: "Business Loan" },
  { icon: "🎓", label: "Education Loan" },
]

export default function Home() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setActive((v) => (v + 1) % loanTypes.length), 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={heroRef} className="bg-negative relative flex min-h-screen flex-col overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* Diagonal accent bar */}
      <div
        className="absolute top-0 right-[18%] h-full w-px opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-8 pt-40 pb-20">
        {/* Top badge */}
        <div
          className={`transition-all delay-100 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="border-accent/30 bg-accent/5 text-accent mb-10 inline-flex items-center gap-2 border px-4 py-2 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
            <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
            Fully Digital Loan Portal
          </span>
        </div>

        {/* Main headline */}
        <div className="grid flex-1 grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <h1
              className={`text-neutral mb-8 font-sans leading-[0.95] font-bold tracking-tight transition-all delay-200 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)" }}
            >
              Apply for a
              <br />
              <span className="relative inline-block">
                <span className="text-accent">loan</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q100 0 200 5" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.5" />
                </svg>
              </span>
              <br />
              from anywhere.
            </h1>

            <p
              className={`text-off mb-12 max-w-lg font-sans text-lg leading-relaxed transition-all delay-300 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              Submit your documents, track your application, and get approved — entirely online. No branch visits. No
              back-and-forth calls. Just a smooth, transparent process built around you.
            </p>

            {/* CTA row */}
            <div
              className={`mb-16 flex flex-wrap items-center gap-4 transition-all delay-[400ms] duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <Link
                href="/apply"
                className="group bg-accent text-negative hover:bg-neutral inline-flex items-center gap-3 px-8 py-4 font-sans text-sm font-semibold tracking-widest uppercase no-underline transition-colors duration-200"
              >
                Start Application
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/how-it-works"
                className="text-off hover:text-neutral border-off/30 hover:border-neutral inline-flex items-center gap-2 border-b pb-0.5 font-sans text-sm tracking-widest uppercase no-underline transition-colors duration-200"
              >
                See how it works
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-wrap gap-px transition-all delay-500 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="border-accent/15 flex flex-col gap-1 border-r pr-10 last:border-none last:pr-0"
                  style={{ animationDelay: `${600 + i * 80}ms` }}
                >
                  <span className="text-neutral font-sans text-2xl font-bold tracking-tight">{s.value}</span>
                  <span className="text-off font-sans text-[0.7rem] tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div
            className={`transition-all delay-[350ms] duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="bg-secondary border-accent/15 relative border p-8">
              {/* Corner accent */}
              <div
                className="bg-accent/10 absolute top-0 right-0 h-12 w-12"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              <p className="text-accent mb-6 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                What are you applying for?
              </p>

              <div className="mb-8 grid grid-cols-2 gap-3">
                {loanTypes.map((loan, i) => (
                  <button
                    key={loan.label}
                    onClick={() => setActive(i)}
                    className={`flex cursor-pointer items-center gap-3 border p-4 text-left transition-all duration-200 ${
                      active === i
                        ? "border-accent bg-accent/10 text-neutral"
                        : "border-neutral/10 bg-negative/40 text-off hover:border-accent/40 hover:text-neutral"
                    }`}
                  >
                    <span className="text-xl">{loan.icon}</span>
                    <span className="font-sans text-xs font-medium tracking-wider uppercase">{loan.label}</span>
                  </button>
                ))}
              </div>

              <div className="border-accent/10 mb-6 border-t pt-6">
                <p className="text-accent mb-4 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                  {`What you'll need`}
                </p>
                <ul className="space-y-3">
                  {["Valid government-issued ID", "Proof of income (payslip / ITR)", "Recent utility bill"].map(
                    (item) => (
                      <li key={item} className="text-off flex items-center gap-3 font-sans text-xs">
                        <span className="border-accent/40 flex h-4 w-4 shrink-0 items-center justify-center border">
                          <svg viewBox="0 0 10 10" className="text-accent h-2.5 w-2.5" fill="none">
                            <path
                              d="M1.5 5l2.5 2.5 4.5-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Link
                href="/apply"
                className="bg-accent text-negative hover:bg-neutral block w-full py-4 text-center font-sans text-xs font-semibold tracking-[0.15em] uppercase no-underline transition-colors duration-200"
              >
                {`Apply Now — It's Free`}
              </Link>

              <p className="text-off/50 mt-4 text-center font-sans text-[0.6rem] tracking-wider uppercase">
                No credit score impact on initial application
              </p>
            </div>

            {/* Trust badge */}
            <div className="mt-4 flex items-center gap-3 px-2">
              <div className="flex -space-x-2">
                {["#b69e74", "#1f2839", "#cccccc"].map((c, i) => (
                  <div
                    key={i}
                    className="border-negative h-7 w-7 rounded-full border-2"
                    style={{ background: c, zIndex: 3 - i }}
                  />
                ))}
              </div>
              <p className="text-off/70 font-sans text-[0.65rem] tracking-wide">
                <span className="text-neutral font-semibold">2,400+</span> applications processed this month
              </p>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div
          className={`mt-16 flex items-center gap-3 transition-all delay-700 duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="border-accent/20 flex h-12 w-8 items-start justify-center rounded-full border pt-2">
            <div className="bg-accent/60 h-2.5 w-0.5 animate-bounce rounded-full" />
          </div>
          <span className="text-off/40 font-sans text-[0.6rem] tracking-[0.25em] uppercase">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
