"use client"

import { ArrowRight, CheckSquare2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LoanOption } from "../context/form-context-types"
import ScrollHint from "./scroll-hint"

const stats = [
  { value: "24hrs", label: "Decision turnaround" },
  { value: "95%", label: "Less Hassle" },
  { value: "15 mins", label: "Average application time" },
]

const loanTypes: { icon: string; label: LoanOption }[] = [
  { icon: "💵", label: "Sangla ORCR" },
  { icon: "🚗", label: "Financing: Brand New" },
  { icon: "🩺", label: "Doctor's Loan" },
  { icon: "🏠", label: "Real Estate Loan" },
]

const lenderLogos = ["./gdfi-logo.png", "sbfinance-logo.png", "./asialink-logo.png"]

export default function Hero() {
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
    <section ref={heroRef} id="hero" className="bg-primary relative flex min-h-screen flex-col overflow-hidden">
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-8 pt-[18dvh] pb-20">
        {/* Badge */}
        <div
          className={`transition-all delay-100 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="border-secondary/20 bg-secondary/5 text-secondary mb-10 inline-flex items-center gap-2 border px-4 py-2 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
            <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
            Fully Digital Loan Portal
          </span>
        </div>

        <div className="grid flex-1 grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_420px]">
          {/* Left — headline & copy */}
          <div>
            <h1
              className={`text-secondary mb-8 font-sans leading-[0.95] font-bold tracking-tight transition-all delay-200 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)" }}
            >
              Apply for a
              <br />
              <span className="relative mt-1 inline-block">
                <span className="text-accent italic">LOAN</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q100 0 200 5" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.6" />
                </svg>
              </span>
              <br />
              from anywhere.
            </h1>

            <p
              className={`text-secondary/60 mb-12 max-w-lg font-sans text-sm leading-relaxed transition-all delay-300 duration-700 sm:text-lg ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <span className="italic">Generate</span> your documents, or get{" "}
              <span className="italic">Loan Consultants</span> to guide you, and get approved — entirely online.
              Minimize branch visits and back-and-forth calls. Just a smooth, transparent process built around you.
            </p>

            {/* CTAs */}
            <div
              className={`mb-16 flex flex-wrap items-center gap-4 transition-all delay-[400ms] duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <Link
                href="/form"
                className="group bg-secondary text-primary hover:bg-accent hover:text-secondary inline-flex items-center gap-3 px-8 py-4 font-sans text-sm font-semibold tracking-widest uppercase no-underline transition-colors duration-200"
              >
                Start Application
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/how-it-works"
                className="text-secondary/50 hover:text-secondary border-secondary/20 hover:border-secondary/60 inline-flex items-center gap-2 border-b pb-0.5 font-sans text-sm tracking-widest uppercase no-underline transition-colors duration-200"
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
                  className="border-secondary/10 flex flex-col gap-1 border-r pr-10 last:border-none last:pr-0"
                  style={{ animationDelay: `${600 + i * 80}ms` }}
                >
                  <span className="text-secondary font-sans text-2xl font-bold tracking-tight">{s.value}</span>
                  <span className="text-secondary/50 font-sans text-[0.7rem] tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — application card */}
          <div
            className={`transition-all delay-[350ms] duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="bg-neutral border-secondary/10 shadow-secondary/5 relative border p-8 shadow-xl">
              {/* Corner clip */}
              <div
                className="bg-accent/15 absolute top-0 right-0 h-12 w-12"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              <p className="text-accent mb-6 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                What are you applying for?
              </p>

              <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {loanTypes.map((loan, i) => (
                  <button
                    key={loan.label}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-3 border p-4 text-left transition-all duration-200 ${
                      active === i
                        ? "border-accent bg-accent/10 text-secondary"
                        : "border-secondary/10 bg-primary/60 text-secondary/50"
                    }`}
                  >
                    <span className="text-xl">{loan.icon}</span>
                    <span className="font-sans text-xs font-medium tracking-wider uppercase">{loan.label}</span>
                  </button>
                ))}
              </div>

              <div className="border-secondary/8 mb-6 border-t pt-6">
                <p className="text-accent mb-4 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                  {`What you'll need`}
                </p>
                <ul className="space-y-3">
                  {["Valid government-issued ID", "Recent utility bill", "Income Proof (Varies by sources)"].map(
                    (item) => (
                      <li key={item} className="text-secondary/60 flex items-center gap-2 font-sans text-xs">
                        <CheckSquare2 className="text-accent/50" size={17} />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Link
                href="/form"
                className="bg-secondary text-primary hover:bg-accent hover:text-secondary block w-full py-4 text-center font-sans text-xs font-semibold tracking-[0.15em] uppercase no-underline transition-colors duration-200"
              >
                {`Apply Now — It's Easy`}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
