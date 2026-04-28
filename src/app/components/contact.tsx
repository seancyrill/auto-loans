"use client"

import { ArrowRight, Check, Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useStatus } from "../context/status-provider"
import { Button } from "../ui/button"
import StripeBG from "./bg/stripe"
import LoadingSpinner from "./loading-spinner"

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

const channels = [
  {
    icon: Phone,
    label: "Call or Text",
    value: "(+63) 962 447 3610",
    note: "Mon–Fri, AM–6PM",
    href: "tel:+69624473610",
  },
]

const initForm = { name: "", email: "", message: "" }

export default function Contact() {
  const { showStatus, clearStatus } = useStatus()
  const { ref, inView } = useInView()
  const [form, setForm] = useState(initForm)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm(initForm)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ data: form }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }

      const data = await res.json()
      setIsLoading(false)

      if (data.success) {
        setSubmitted(true)
      } else {
        throw new Error("Message Unsuccessful")
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err)
      showStatus({
        message: "Something went wrong.",
        isError: true,
        button: {
          text: "Try Again",
          function: () => {
            clearStatus()
            handleSubmit()
          },
        },
      })
    }
  }

  return (
    <section id="contact" ref={ref} className="bg-neutral relative min-h-screen overflow-hidden py-32">
      <StripeBG />

      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-8">
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

        <div
          className={`mx-auto flex max-w-100 flex-col transition-all delay-100 duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          {/* Form */}
          <div
            className={`mb-8 transition-all delay-200 duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
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
                    <Check className="text-accent" />
                  </div>
                  <div>
                    <p className="text-secondary mb-2 font-sans text-lg font-semibold tracking-tight">Message sent</p>
                    <p className="text-secondary/45 max-w-xs font-sans text-sm leading-relaxed">
                      {`We've received your concern and will get back to you within 24 hours.`}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
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

                  <form onSubmit={(e) => (e.preventDefault(), handleSubmit())} className="flex flex-col gap-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                          Full name
                        </label>
                        <input
                          disabled={isLoading}
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
                          disabled={isLoading}
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

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-secondary/40 font-sans text-[0.6rem] tracking-[0.15em] uppercase">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        disabled={isLoading}
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your concern in detail..."
                        className="bg-primary border-secondary/10 text-secondary placeholder:text-secondary/25 focus:border-accent/50 resize-none border px-4 py-3 font-sans text-sm transition-colors duration-200 focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant={"hero1"}
                      size={"lg"}
                      className="sm:text-md text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner block />
                      ) : (
                        <>
                          Send message
                          <ArrowRight size={18} />
                        </>
                      )}
                    </Button>

                    <p className="text-secondary/25 text-center font-sans text-[0.6rem] tracking-wide uppercase">
                      We typically respond within one business day
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Channels */}
          <p className="text-accent mb-5 px-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
            Or reach us directly
          </p>
          <div className="flex flex-col gap-px">
            {channels.map((ch) => {
              const Icon = ch.icon
              return (
                <a
                  key={ch.label}
                  href={ch.href}
                  className="group border-secondary/8 hover:bg-secondary/[0.02] -mx-2 flex items-center gap-5 border-b px-4 py-5 no-underline transition-colors duration-200 sm:px-2"
                >
                  <div className="border-secondary/12 text-secondary/40 group-hover:border-accent/50 group-hover:text-accent flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-200">
                    <Icon />
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
                  <ArrowRight size={12} className="text-accent/60" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
