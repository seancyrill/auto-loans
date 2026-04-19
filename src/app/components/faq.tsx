"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useInView } from "../utils/in-view"

const faqs = [
  {
    question: "Who are your partner lenders?",
    answer: "We currently only work with Global Dominion Financing Inc. for now, other lenders are underway.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Most applications are completed in under 15 minutes. Once submitted, our team reviews your documents and typically returns a decision within 24 hours — often sooner.",
  },
  {
    question: "What documents do I need to prepare?",
    answer:
      "You'll need 2 valid government-issued ID, income proof (this would vary depending on the income sources you have selected), and a recent utility bill for address verification. Additional documents may be requested depending on loan type.",
  },
  {
    question: "How are my documents kept secure?",
    answer:
      "All your data and documents are only saved on your device, just so you can continue your application anytime. Then sent to our partner lenders. eg. Global Dominion. But you can always skip sensitive fields if it makes you feel safer. This website is only a pass through system to make the process easier for both you and our Loan Consultants.",
  },
  {
    question: "What loan amounts can I apply for?",
    answer:
      "Loan amounts range from ₱100,000 to ₱2,000,000 depending on loan type, your credit profile, and income verification. You'll see your personalized range during the application.",
  },
  {
    question: "When will I receive the funds after approval?",
    answer:
      "Funds are disbursed to your nominated bank account within one business day of approval and signing. In many cases, transfers are completed the same afternoon.",
  },
  {
    question: "Can I apply if I'm unemployed?",
    answer:
      "Yes. As long as you have any source of income and proofs, we will find a way for you to get a best approval rate.",
  },
]

export default function FAQ() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section
      ref={ref}
      id="faq"
      className="bg-primary relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Decorative block — top right */}
      <div className="border-accent/10 pointer-events-none absolute top-8 right-8 h-40 w-40 border" />
      <div className="border-accent/10 pointer-events-none absolute bottom-16 left-16 h-40 w-40 border" />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* Left — sticky label */}
          <div
            className={`transition-all duration-700 lg:sticky lg:top-32 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <p className="text-accent mb-4 font-sans text-[0.65rem] tracking-[0.25em] uppercase">Support</p>
            <h2
              className="text-secondary mb-6 font-sans leading-[0.95] font-bold tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              Frequently asked questions
            </h2>
            <p className="text-secondary/45 mb-10 font-sans text-sm leading-relaxed">
              {`Everything you need to know about applying for a loan through our portal. Can't find what you're looking for?`}
            </p>
            <a
              href="#contact"
              className="text-secondary border-secondary/20 hover:border-secondary inline-flex items-center gap-2 border-b pb-0.5 font-sans text-xs tracking-widest uppercase no-underline transition-colors duration-200"
            >
              Contact our team
              <ArrowRight size={14} />
            </a>

            {/* Decorative stat */}
            <div className="border-secondary/8 mt-16 hidden border-t pt-10 lg:block">
              <span className="text-secondary mb-1 block font-sans text-4xl font-bold tracking-tight">100%</span>
              <span className="text-secondary/35 font-sans text-[0.65rem] tracking-[0.2em] uppercase">
                Satisfaction target
              </span>
            </div>
          </div>

          {/* Right — accordion */}
          <div
            className={`transition-all delay-200 duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border-b transition-colors duration-300 ${
                    open === i ? "border-accent/25" : "border-secondary/8"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="group flex w-full cursor-pointer items-start justify-between gap-6 border-none bg-transparent py-7 text-left"
                  >
                    <span
                      className={`font-sans text-base leading-snug font-medium tracking-tight transition-colors duration-200 ${
                        open === i ? "text-secondary" : "text-secondary/60 group-hover:text-secondary"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Toggle icon */}
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition-all duration-300 ${
                        open === i
                          ? "border-accent bg-accent/10 rotate-45"
                          : "border-secondary/15 group-hover:border-accent/40 bg-transparent"
                      }`}
                    >
                      <svg
                        viewBox="0 0 10 10"
                        className={`h-2.5 w-2.5 transition-colors duration-200 ${open === i ? "text-accent" : "text-secondary/30"}`}
                        fill="none"
                      >
                        <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: open === i ? "200px" : "0px",
                      opacity: open === i ? 1 : 0,
                    }}
                  >
                    <p className="text-secondary/50 max-w-2xl pb-7 font-sans text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="bg-secondary/8 absolute right-8 bottom-0 left-8 h-px" />
    </section>
  )
}
