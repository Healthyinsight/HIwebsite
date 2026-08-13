'use client'

import { createContext, useContext } from 'react'
import { useEvidenceIQState } from '@/hooks/useEvidenceIQ'

/**
 * Single instance of the Evidence IQ progress state, shared by every consumer.
 *
 * Before this provider existed, `useEvidenceIQ` was a plain hook and each
 * component that called it got its own state — including its own anonymous
 * Supabase sign-in and its own progress fetch. Nav lives in the root layout, so
 * an article page (Nav + ArticleProgressSection) fired all of that twice per
 * load. Mounting the state once here keeps it to one.
 */

type EvidenceIQValue = ReturnType<typeof useEvidenceIQState>

const EvidenceIQContext = createContext<EvidenceIQValue | null>(null)

export function EvidenceIQProvider({ children }: { children: React.ReactNode }) {
  const value = useEvidenceIQState()
  return (
    <EvidenceIQContext.Provider value={value}>
      {children}
    </EvidenceIQContext.Provider>
  )
}

export function useEvidenceIQ(): EvidenceIQValue {
  const ctx = useContext(EvidenceIQContext)
  if (ctx === null) {
    throw new Error('useEvidenceIQ must be used inside <EvidenceIQProvider> (see src/app/layout.tsx)')
  }
  return ctx
}
