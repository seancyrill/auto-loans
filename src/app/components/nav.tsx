"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { buttonVariants } from "../ui/button"

const links = [
  { label: "How it Works", href: "#howitworks" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-secondary/90 border-accent/15 text-primary border-b shadow-lg shadow-black/20 backdrop-blur-xs"
            : "bg-primary text-negative border-b border-transparent"
        }`}
      >
        <nav className="h-s mx-auto flex h-17 max-w-7xl items-center justify-between px-8">
          {/* Logo */}
          <a
            href={pathname === "/" ? "#hero" : "/#hero"}
            target={pathname.startsWith("/form") ? "_blank" : "_self"}
            className="group flex items-center gap-2 no-underline"
          >
            <span className="bg-accent group-hover:bg-secondary h-6 w-6 shrink-0 rotate-45 transition-all duration-500 group-hover:rotate-[135deg]" />
            <span className="group-hover:text-accent font-sans text-xl font-semibold tracking-widest uppercase">
              Auto Loans
            </span>
          </a>

          {/* Desktop links */}
          <ul className="m-0 hidden list-none items-center gap-10 p-0 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={`${pathname === "/" ? "" : "/"}${link.href}`}
                  target={pathname.startsWith("/form") ? "_blank" : "_self"}
                  className={buttonVariants({ variant: "herolink", size: "herosm" })}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {!pathname.startsWith("/form") && (
              <li>
                <Link
                  href={"/form"}
                  target={pathname.startsWith("/form") ? "_blank" : "_self"}
                  className={buttonVariants({ variant: "hero2", size: "herosm" })}
                >
                  Apply now
                </Link>
              </li>
            )}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex cursor-pointer flex-col items-end gap-1.25 border-none bg-transparent p-1.5 md:hidden"
          >
            <span
              className={`block h-px transition-all duration-300 ${open ? "w-6 translate-y-[6.5px] rotate-45" : "w-6"} ${scrolled ? "bg-primary" : "bg-secondary"}`}
            />
            <span
              className={`block h-px transition-all duration-300 ${open ? "w-6 opacity-0" : "w-4"} ${scrolled ? "bg-primary" : "bg-secondary"}`}
            />
            <span
              className={`block h-px transition-all duration-300 ${open ? "w-6 -translate-y-[6.5px] -rotate-45" : "w-5"} ${scrolled ? "bg-primary" : "bg-secondary"}`}
            />
          </button>
        </nav>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`bg-negative/60 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        className={`bg-primary border-accent/20 fixed top-0 right-0 bottom-0 z-[45] flex w-[min(320px,90vw)] flex-col border-l px-10 pt-20 pb-10 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <p className="mb-6 font-sans text-[0.65rem] tracking-[0.2em] uppercase">Navigation</p>
        <ul className="m-0 flex-1 list-none p-0">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={`${pathname === "/" ? "" : "/"}${link.href}`}
                target={pathname.startsWith("/form") ? "_blank" : "_self"}
                onClick={() => setOpen(false)}
                className="hover:text-accent border-secondary/5 block border-b py-3 font-sans text-3xl font-medium tracking-tight no-underline transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {!pathname.startsWith("/form") && (
          <Link
            href="/form"
            onClick={() => setOpen(false)}
            className={buttonVariants({ variant: "hero2", size: "hero" })}
          >
            Apply Now
          </Link>
        )}
      </aside>
    </>
  )
}
