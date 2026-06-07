'use client'

import {
  useEffect,
  useRef,
  useState,
  useId,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'

type ModalSize = 'sm' | 'md' | 'lg' | 'full'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  showCloseButton?: boolean
  children: ReactNode
  'aria-labelledby'?: string
}

const MODAL_CSS = `
@keyframes hi-modal-in {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes hi-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hi-modal-panel    { animation-duration: 1ms !important; }
  .hi-modal-backdrop { animation-duration: 1ms !important; }
}
`

const MAX_WIDTH: Record<ModalSize, string> = {
  sm:   '400px',
  md:   '520px',
  lg:   '720px',
  full: '100%',
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function Modal({
  open,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  children,
  'aria-labelledby': ariaLabelledBy,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const titleId = ariaLabelledBy ?? `modal-title-${uid.replace(/:/g, '')}`

  useEffect(() => { setMounted(true) }, [])

  // Scroll lock + Escape key
  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()

      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter(el => !el.closest('[aria-hidden="true"]'))
        if (!nodes.length) return
        const first = nodes[0] as HTMLElement
        const last = nodes[nodes.length - 1] as HTMLElement
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  // Move focus to first focusable element on open
  useEffect(() => {
    if (!open || !panelRef.current) return
    const first = panelRef.current.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()
  }, [open])

  if (!mounted || !open) return null

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 400,
    background: 'rgba(15,42,63,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    animation: 'hi-backdrop-in 0.2s ease forwards',
  }

  const panelStyle: CSSProperties = {
    background: 'var(--cream)',
    borderRadius: size === 'full' ? 0 : '24px',
    padding: 'clamp(28px, 6vw, 40px)',
    maxWidth: MAX_WIDTH[size],
    width: '100%',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
    animation: 'hi-modal-panel 0.22s ease forwards',
  }

  return createPortal(
    <>
      <style dangerouslySetInnerHTML={{ __html: MODAL_CSS }} />
      <div
        className="hi-modal-backdrop"
        style={backdropStyle}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        aria-hidden="true"
      >
        <div
          ref={panelRef}
          className="hi-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          style={panelStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#8A8A80',
                padding: '4px 8px',
                lineHeight: 1,
                fontFamily: 'inherit',
                borderRadius: '6px',
              }}
            >
              ✕
            </button>
          )}

          {title && (
            <h2
              id={titleId}
              style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: '22px',
                fontWeight: 400,
                color: 'var(--navy)',
                marginBottom: '20px',
                marginTop: 0,
                lineHeight: 1.25,
                paddingRight: showCloseButton ? '32px' : 0,
              }}
            >
              {title}
            </h2>
          )}

          {children}
        </div>
      </div>
    </>,
    document.body,
  )
}
