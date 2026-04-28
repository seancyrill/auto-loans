import { useEffect } from "react"

export function useRepositionNav(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    const update = () => {
      if (!ref.current) return
      const offsetFromBottom = window.innerHeight - (viewport.height + viewport.offsetTop)
      // Only lift if keyboard is actually open
      ref.current.style.transform = offsetFromBottom > 50 ? `translateY(-${offsetFromBottom}px)` : `translateY(0px)` // reset when keyboard closes
    }

    viewport.addEventListener("resize", update)
    viewport.addEventListener("scroll", update)

    return () => {
      viewport.removeEventListener("resize", update)
      viewport.removeEventListener("scroll", update)
    }
  }, [ref])
}
