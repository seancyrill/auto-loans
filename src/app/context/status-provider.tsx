"use client"

import { createContext, useContext, useState } from "react"
import { StatusMessageModal } from "../components/status-message"

export interface StatusMessageState {
  open: boolean
  message: string
  isError?: boolean
  button?: { text: string; function: () => void }
}

interface StatusContextValue {
  showStatus: (state: Omit<StatusMessageState, "open">) => void
  clearStatus: () => void
}

const StatusContext = createContext<StatusContextValue | null>(null)

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StatusMessageState>({
    open: false,
    message: "",
  })

  const showStatus = (state: Omit<StatusMessageState, "open">) => {
    setStatus({ ...state, open: true })
  }

  const clearStatus = () => {
    setStatus({ open: false, message: "" })
  }

  return (
    <StatusContext.Provider value={{ showStatus, clearStatus }}>
      {children}
      <StatusMessageModal {...status} onClose={clearStatus} />
    </StatusContext.Provider>
  )
}

export function useStatus() {
  const ctx = useContext(StatusContext)
  if (!ctx) throw new Error("useStatus must be used within a <StatusProvider>")
  return ctx
}
