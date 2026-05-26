'use client'
import { useState, useEffect } from 'react'
import EmailWall from './EmailWall'

export default function ArticleEmailGate({
  level,
  children,
}: {
  level: number
  children: React.ReactNode
}) {
  const [showWall, setShowWall] = useState(false)

  useEffect(() => {
    if (level >= 4) {
      const unlocked = localStorage.getItem('hi_email_unlocked') === 'true'
      if (!unlocked) setShowWall(true)
    }
  }, [level])

  const dismiss = () => setShowWall(false)

  return (
    <>
      {children}
      {showWall && <EmailWall onSuccess={dismiss} onClose={dismiss} />}
    </>
  )
}
