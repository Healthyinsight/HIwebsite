import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Component map for next-mdx-remote rendering of article body content.
 * All elements are inline-styled with HI design tokens (per CLAUDE.md: no Tailwind, no CSS modules).
 * Server-rendered — no 'use client' needed.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      style={{
        fontFamily: 'DM Serif Display, serif',
        fontSize: '1.75rem',
        fontWeight: 400,
        color: 'var(--navy)',
        lineHeight: 1.25,
        letterSpacing: '-0.3px',
        marginTop: '40px',
        marginBottom: '16px',
      }}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '1.25rem',
        fontWeight: 500,
        color: 'var(--navy)',
        lineHeight: 1.4,
        marginTop: '32px',
        marginBottom: '12px',
      }}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p
      style={{
        fontSize: '17px',
        lineHeight: 1.75,
        color: '#444440',
        fontWeight: 300,
        marginBottom: '20px',
      }}
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      style={{
        paddingLeft: '24px',
        marginBottom: '24px',
      }}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      style={{
        paddingLeft: '24px',
        marginBottom: '24px',
      }}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li
      style={{
        fontSize: '16px',
        lineHeight: 1.7,
        color: '#444440',
        fontWeight: 300,
        marginBottom: '8px',
      }}
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong
      style={{
        fontWeight: 500,
        color: 'var(--navy)',
      }}
      {...props}
    />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em
      style={{
        fontStyle: 'italic',
        color: '#666660',
      }}
      {...props}
    />
  ),
  a: ({ href, children, ...rest }: ComponentPropsWithoutRef<'a'> & { children?: ReactNode }) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        style={{
          color: 'var(--blue-mid)',
          textDecoration: 'underline',
        }}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  },
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      style={{
        borderLeft: '3px solid var(--blue-light)',
        paddingLeft: '20px',
        marginTop: '24px',
        marginBottom: '24px',
        fontStyle: 'italic',
        color: '#555550',
      }}
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--sand)',
        marginTop: '32px',
        marginBottom: '32px',
      }}
      {...props}
    />
  ),
}
