'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
  duration: number
}

interface ToastContextValue {
  toasts: ToastItem[]
  toast: (opts: Omit<ToastItem, 'id' | 'duration'> & { duration?: number }) => string
  dismiss: (id: string) => void
}

type Action =
  | { type: 'ADD'; item: ToastItem }
  | { type: 'DISMISS'; id: string }

const MAX_VISIBLE = 4

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.type) {
    case 'ADD':
      return [action.item, ...state].slice(0, MAX_VISIBLE)
    case 'DISMISS':
      return state.filter(t => t.id !== action.id)
    default:
      return state
  }
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, [])

  const dismiss = useCallback((id: string) => {
    dispatch({ type: 'DISMISS', id })
  }, [])

  const toast = useCallback(
    (opts: Omit<ToastItem, 'id' | 'duration'> & { duration?: number }): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const item: ToastItem = { ...opts, id, duration: opts.duration ?? 4000 }
      dispatch({ type: 'ADD', item })
      return id
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastRegion />
    </ToastContext.Provider>
  )
}

const TOAST_CSS = `
@keyframes hi-toast-in {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes hi-toast-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.94); }
}
@media (prefers-reduced-motion: reduce) {
  .hi-toast-item { animation-duration: 1ms !important; }
}
`

const TYPE_CONFIG: Record<
  ToastType,
  { borderColor: string; bg: string; icon: string; ariaLive: 'assertive' | 'polite' }
> = {
  success: { borderColor: '#2A8A55', bg: '#EDF7F1', icon: '✓', ariaLive: 'polite' },
  error:   { borderColor: '#CC3333', bg: '#FFF0F0', icon: '✕', ariaLive: 'assertive' },
  warning: { borderColor: '#B07D10', bg: '#FFF8E8', icon: '⚠', ariaLive: 'assertive' },
  info:    { borderColor: 'var(--blue-mid)', bg: 'var(--sky)', icon: 'ℹ', ariaLive: 'polite' },
}

function ToastItemComponent({ item, dismiss }: { item: ToastItem; dismiss: (id: string) => void }) {
  const { borderColor, bg, icon, ariaLive } = TYPE_CONFIG[item.type]

  useEffect(() => {
    const timer = setTimeout(() => dismiss(item.id), item.duration)
    return () => clearTimeout(timer)
  }, [item.id, item.duration, dismiss])

  return (
    <div
      className="hi-toast-item"
      role="alert"
      aria-live={ariaLive}
      aria-atomic="true"
      style={{
        background: bg,
        borderRadius: '12px',
        padding: '14px 40px 14px 16px',
        boxShadow: '0 4px 20px rgba(15,42,63,0.14)',
        borderLeft: `4px solid ${borderColor}`,
        position: 'relative',
        animation: 'hi-toast-in 0.22s ease forwards',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}
    >
      <span
        style={{
          fontSize: '14px',
          color: borderColor,
          flexShrink: 0,
          marginTop: '1px',
          fontWeight: 600,
        }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4 }}>
          {item.title}
        </p>
        {item.message && (
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#444440', fontWeight: 300, lineHeight: 1.5 }}>
            {item.message}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => dismiss(item.id)}
        aria-label="Dismiss notification"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '14px',
          color: '#8A8A80',
          cursor: 'pointer',
          padding: '2px 5px',
          lineHeight: 1,
          fontFamily: 'inherit',
          borderRadius: '4px',
        }}
      >
        ✕
      </button>
    </div>
  )
}

export function ToastRegion() {
  const [mounted, setMounted] = useState(false)
  const ctx = useContext(ToastContext)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted || !ctx) return null

  const { toasts, dismiss } = ctx

  return createPortal(
    <>
      <style dangerouslySetInnerHTML={{ __html: TOAST_CSS }} />
      <div
        role="region"
        aria-label="Notifications"
        style={{
          position: 'fixed',
          bottom: 'max(24px, env(safe-area-inset-bottom))',
          right: '16px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '8px',
          width: 'min(360px, calc(100vw - 32px))',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(item => (
          <div key={item.id} style={{ pointerEvents: 'auto' }}>
            <ToastItemComponent item={item} dismiss={dismiss} />
          </div>
        ))}
      </div>
    </>,
    document.body,
  )
}
