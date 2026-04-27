import { RefObject, useEffect } from "react"

interface UseFocusFirstEmptyOptions {
  trigger?: unknown
  containerRef?: RefObject<HTMLElement>
  skipSelector?: string
  delay?: number
  enabled?: boolean
}

export function useFocusFirstEmpty(options: UseFocusFirstEmptyOptions = {}) {
  const { trigger, containerRef, skipSelector = "", delay = 50, enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const id = setTimeout(() => {
      const root: Document | HTMLElement = containerRef?.current ?? document

      const shouldSkip = (el: Element) =>
        (skipSelector ? el.matches(skipSelector) : false) ||
        el.getAttribute("aria-hidden") === "true" ||
        (el as HTMLInputElement).disabled ||
        (el as HTMLInputElement).readOnly

      const isHidden = (el: Element) => {
        const style = getComputedStyle(el)
        return (
          style.display === "none" ||
          style.visibility === "hidden" ||
          ((el as HTMLElement).offsetWidth === 0 && (el as HTMLElement).offsetHeight === 0)
        )
      }

      // If the first visible field in the page is a file input, do nothing
      const firstInput = root.querySelector<HTMLElement>(
        "input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset'])",
      )
      if (firstInput instanceof HTMLInputElement && firstInput.type === "file") return

      const groupEls = Array.from(root.querySelectorAll<HTMLElement>('[role="radiogroup"], [role="group"]')).filter(
        (el) => !isHidden(el),
      )

      const isInsideGroup = (el: Element) => groupEls.some((g) => g.contains(el))

      const isGroupFilled = (group: HTMLElement) => {
        const role = group.getAttribute("role")
        if (role === "radiogroup") {
          return Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]')).some(
            (b) => b.getAttribute("aria-checked") === "true",
          )
        }
        if (role === "group") {
          return Array.from(group.querySelectorAll<HTMLElement>('[role="checkbox"]')).some(
            (b) => b.getAttribute("aria-checked") === "true",
          )
        }
        return true
      }

      const TEXT_SELECTOR =
        "input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='file']), textarea"

      type FieldEntry =
        | { kind: "group"; el: HTMLElement }
        | { kind: "text"; el: HTMLInputElement | HTMLTextAreaElement }

      const entries: { order: number; field: FieldEntry }[] = []
      const allEls = Array.from(root.querySelectorAll("*"))
      const orderOf = (el: Element) => allEls.indexOf(el)

      for (const group of groupEls) {
        entries.push({ order: orderOf(group), field: { kind: "group", el: group } })
      }

      for (const el of Array.from(root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(TEXT_SELECTOR))) {
        if (shouldSkip(el) || isHidden(el) || isInsideGroup(el)) continue
        entries.push({ order: orderOf(el), field: { kind: "text", el } })
      }

      entries.sort((a, b) => a.order - b.order)

      for (const { field } of entries) {
        if (field.kind === "group") {
          if (!isGroupFilled(field.el)) return
        } else {
          if (field.el.value.trim() === "") {
            field.el.focus()
            return
          }
        }
      }
    }, delay)

    return () => clearTimeout(id)
  }, [trigger, enabled])
}
