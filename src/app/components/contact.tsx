"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import StripeBG from "./bg/stripe"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const concerns = [
  { icon: "📋", label: "Application Status", desc: "Check where your loan stands" },
  { icon: "📄", label: "Document Issues", desc: "Help with uploads or requirements" },
  { icon: "💳", label: "Repayment Concerns", desc: "Payment schedules and options" },
  { icon: "🔒", label: "Account & Security", desc: "Login, access, and data privacy" },
]

const channels = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Email us",
    value: "support@loanportal.ph",
    note: "We reply within 24 hours",
    href: "mailto:support@loanportal.ph",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Call us",
    value: "(02) 8123-4567",
    note: "Mon–Fri, 8AM–6PM",
    href: "tel:+6328123456",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Live chat",
    value: "Available in the portal",
    note: "Fastest response",
    href: "/portal/chat",
  },
]

export default function Contact() {
  const { ref, inView } = useInView()
  const [selected, setSelected] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", email: "", concern: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="bg-neutral relative min-h-screen overflow-hidden py-32">
      <StripeBG />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-accent mb-4 font-sans text-[0.65rem] tracking-[0.25em] uppercase">Get in touch</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="text-secondary font-sans leading-[0.95] font-bold tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {`We're here to help`}
            </h2>
            <p className="text-secondary/50 max-w-sm font-sans text-base leading-relaxed lg:text-right">
              Have a question about your application or need assistance? Reach out — our team responds fast.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_480px]">
          {/* Left col */}
          <div
            className={`transition-all delay-100 duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            {/* Concern picker */}
            <p className="text-accent mb-5 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
              {`What's your concern?`}
            </p>
            <div className="mb-12 grid grid-cols-2 gap-3">
              {concerns.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setSelected(selected === i ? null : i)}
                  className={`group flex cursor-pointer items-start gap-3 border p-5 text-left transition-all duration-200 ${
                    selected === i
                      ? "border-accent bg-accent/8 text-secondary"
                      : "border-secondary/10 bg-neutral/40 text-secondary/50 hover:border-accent/40 hover:text-secondary"
                  }`}
                >
                  <span className="mt-0.5 shrink-0 text-2xl">{c.icon}</span>
                  <div>
                    <p className="mb-1 font-sans text-xs font-semibold tracking-wide uppercase">{c.label}</p>
                    <p className="text-secondary/40 font-sans text-[0.7rem] leading-snug">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Channels */}
            <p className="text-accent mb-5 font-sans text-[0.65rem] tracking-[0.2em] uppercase">Or reach us directly</p>
            <div className="flex flex-col gap-px">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  className="group border-secondary/8 hover:bg-secondary/[0.02] -mx-2 flex items-center gap-5 border-b px-2 py-5 no-underline transition-colors duration-200"
                >
                  <div className="border-secondary/12 text-secondary/40 group-hover:border-accent/50 group-hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-200">
                    {ch.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-secondary/35 mb-0.5 font-sans text-[0.65rem] tracking-[0.15em] uppercase">
                      {ch.label}
                    </p>
                    <p className="text-secondary/70 group-hover:text-secondary font-sans text-sm font-medium transition-colors duration-200">
                      {ch.value}
                    </p>
                  </div>
                  <span className="text-accent/60 hidden font-sans text-[0.6rem] tracking-widest uppercase sm:block">
                    {ch.note}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="text-secondary/15 group-hover:text-secondary/30 h-3.5 w-3.5 transition-all duration-200 group-hover:translate-x-0.5"
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
                </a>
              ))}
            </div>
          </div>

          {/* Right col — form */}
          <div
            className={`transition-all delay-200 duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="bg-neutral border-secondary/10 shadow-secondary/5 relative border p-8 shadow-xl">
              {/* Corner accent */}
              <div
                className="bg-accent/12 absolute top-0 right-0 h-12 w-12"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="border-accent/30 bg-accent/8 flex h-14 w-14 items-center justify-center border">
                    <svg viewBox="0 0 20 20" className="text-accent h-6 w-6" fill="none">
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-secondary mb-2 font-sans text-lg font-semibold tracking-tight">Message sent</p>
                    <p className="text-secondary/45 max-w-xs font-sans text-sm leading-relaxed">
                      {`We've received your concern and will get back to you within 24 hours.`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: "", email: "", concern: "", message: "" })
                      setSelected(null)
                    }}
                    className="text-accent border-accent/30 hover:border-accent cursor-pointer border-b bg-transparent pb-0.5 font-sans text-xs tracking-widest uppercase transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-accent mb-8 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                    Send us a message
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Juan dela Cruz"
                          className="bg-primary border-secondary/10 text-secondary placeholder:text-secondary/25 focus:border-accent/50 border px-4 py-3 font-sans text-sm transition-colors duration-200 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="juan@email.com"
                          className="bg-primary border-secondary/10 text-secondary placeholder:text-secondary/25 focus:border-accent/50 border px-4 py-3 font-sans text-sm transition-colors duration-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="concern"
                        required
                        value={selected !== null ? concerns[selected].label : form.concern}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className="bg-primary border-secondary/10 text-secondary placeholder:text-secondary/25 focus:border-accent/50 border px-4 py-3 font-sans text-sm transition-colors duration-200 focus:outline-none"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your concern in detail..."
                        className="bg-primary border-secondary/10 text-secondary placeholder:text-secondary/25 focus:border-accent/50 resize-none border px-4 py-3 font-sans text-sm transition-colors duration-200 focus:outline-none"
                      />
                    </div>

                    <Button type="submit" variant={"hero1"} size={"lg"}>
                      Send message
                      <ArrowRight size={18} />
                    </Button>

                    <p className="text-secondary/25 text-center font-sans text-[0.6rem] tracking-wide uppercase">
                      We typically respond within one business day
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
