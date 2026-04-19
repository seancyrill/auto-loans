"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useInView } from "../utils/in-view"
import StripeBG from "./bg/stripe"

const steps = [
  {
    number: "01",
    title: "Enter basic information",
    description:
      "Your name and mobile number will be the only fields required to apply. You can continue to on to generate the rest of the documents you will need. Or end it there, our Loan Consultants will call and guide you.",
    detail: "Any missing field or documents will be requested by our Loan Consultants, so rest assured.",
  },
  {
    number: "02",
    title: "Try to answer everything",
    description:
      "You can skip any field anytime, but the forms you'll be answering is specifically designed to help you boost approval. The fields will be used to fill up necessary documents so don't have to do it yourself. You can leave and come back anytime, your form is always saved on you device so take your time.",
    detail:
      "Your data will only exist in your device, and forwarded to our partner lenders. eg. Global Dominion. But you can always skip sensitive fields if it makes you feel safer.",
  },
  {
    number: "03",
    title: "Submit your documents",
    description:
      "You can take a picture using your phones camera, or upload the images so you don't have to provide them later.",
    detail: "Except for documents that need original copies",
  },
  {
    number: "04",
    title: "Get contacted",
    description:
      "Wait for our Loan Consultants to check and verify if everything is in order, they will make sure you have the best chances to get approved. They will keep you updated.",
    detail: "They will text or call you.",
  },
  {
    number: "05",
    title: "Get approved & funded",
    description:
      "Once approved, funds are given to you by cheque on the nearest branch — typically within one business day.",
    detail: "Average approval decision: under 24 hours.",
  },
]

export default function HowItWorks() {
  const { ref: sectionRef, inView } = useInView(0.1)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      id="howitworks"
      className="bg-neutral relative min-h-screen overflow-hidden py-16 sm:py-32"
    >
      <StripeBG />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-8">
        {/* Section header */}
        <div
          className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-accent mb-4 font-sans text-[0.65rem] tracking-[0.25em] uppercase">The process</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="text-secondary font-sans leading-[0.95] font-bold tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              How it works
            </h2>
            <p className="text-secondary/50 max-w-sm font-sans text-base leading-relaxed lg:text-right">
              From application to funding — everything handled online, at your own pace.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical spine line */}
          <div className="bg-secondary/8 absolute top-0 bottom-0 left-[52px] hidden w-px lg:block" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className={`group relative grid cursor-pointer grid-cols-1 gap-0 transition-all duration-300 lg:grid-cols-[104px_1fr] ${
                    activeStep === i ? "bg-secondary/[0.03]" : "hover:bg-secondary/[0.02]"
                  }`}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  {/* Number column */}
                  <div className="flex items-center justify-start gap-4 px-0 pt-8 pb-0 lg:flex-col lg:items-center lg:justify-start lg:gap-0 lg:px-0 lg:pt-10 lg:pb-0">
                    <div
                      className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center border transition-all duration-300 ${
                        activeStep === i
                          ? "bg-accent border-accent text-secondary"
                          : "bg-primary border-secondary/15 text-secondary/40 group-hover:border-accent/50 group-hover:text-accent"
                      }`}
                    >
                      <span className="font-sans text-xs font-semibold tracking-widest">{step.number}</span>
                    </div>
                    {/* Mobile step label */}
                    <span className="text-secondary/30 font-sans text-[0.6rem] tracking-[0.2em] uppercase lg:hidden">
                      Step {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`border-b px-0 pt-8 pb-10 transition-all duration-300 lg:px-12 ${
                      activeStep === i ? "border-accent/20" : "border-secondary/6"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1">
                        <h3
                          className={`mb-3 font-sans text-xl font-semibold tracking-tight transition-colors duration-300 ${activeStep === i ? "text-secondary" : "text-secondary/70 group-hover:text-secondary"}`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-secondary/50 max-w-xl font-sans text-sm leading-relaxed">
                          {step.description}
                        </p>

                        {/* Expandable detail */}
                        <div
                          className="overflow-hidden transition-all duration-500"
                          style={{ maxHeight: activeStep === i ? "80px" : "0px", opacity: activeStep === i ? 1 : 0 }}
                        >
                          <div className="border-accent/15 mt-5 flex items-center gap-2 border-t pt-5">
                            <svg viewBox="0 0 12 12" className="text-accent h-3 w-3 shrink-0" fill="none">
                              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M6 5v3M6 4v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <p className="text-secondary/40 font-sans text-xs tracking-wide">{step.detail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className={`border-secondary/8 bg-neutral/60 flex flex-col items-center justify-between gap-6 border p-8 transition-all delay-700 duration-700 sm:flex-row ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div>
            <p className="text-secondary mb-1 font-sans text-lg font-semibold tracking-tight">Ready to get started?</p>
            <p className="text-secondary/40 font-sans text-sm">The whole process takes less than 15 minutes.</p>
          </div>
          <Link
            href="/form"
            className="group bg-secondary text-primary hover:bg-accent hover:text-secondary flex shrink-0 flex-nowrap items-center gap-3 px-8 py-4 font-sans text-xs font-semibold tracking-widest uppercase no-underline transition-colors duration-200"
          >
            Start your application
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
