export default function HeroOrb() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <style>{`
        .hi-group {
          transform-box: fill-box;
          transform-origin: center;
          animation: hi-float 7s ease-in-out infinite;
        }
        .hi-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: hi-ring-spin 32s linear infinite;
        }
        .hi-breathe {
          transform-box: fill-box;
          transform-origin: center;
          animation: hi-breathe 4s ease-in-out infinite;
        }
        .hi-n1 { transform-box: fill-box; transform-origin: center; animation: hi-pulse 3.5s ease-in-out infinite 0s; }
        .hi-n2 { transform-box: fill-box; transform-origin: center; animation: hi-pulse 3.5s ease-in-out infinite 0.875s; }
        .hi-n3 { transform-box: fill-box; transform-origin: center; animation: hi-pulse 3.5s ease-in-out infinite 1.75s; }
        .hi-n4 { transform-box: fill-box; transform-origin: center; animation: hi-pulse 3.5s ease-in-out infinite 2.625s; }
        @keyframes hi-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          38% { transform: translateY(-14px) rotate(1.2deg); }
          68% { transform: translateY(-6px) rotate(-0.6deg); }
        }
        @keyframes hi-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hi-pulse {
          0%, 100% { opacity: 0.38; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes hi-breathe {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50% { transform: scale(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hi-group, .hi-ring, .hi-breathe,
          .hi-n1, .hi-n2, .hi-n3, .hi-n4 {
            animation: none !important;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="hi-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2D7DA8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2D7DA8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hi-center-fill" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#1A4D6E" />
            <stop offset="100%" stopColor="#0F2A3F" />
          </radialGradient>
        </defs>

        {/* Background halo */}
        <circle cx="200" cy="200" r="174" fill="url(#hi-bg-glow)" />

        <g className="hi-group">
          {/* Outer dashed ring — rotates slowly */}
          <circle
            className="hi-ring"
            cx="200" cy="200" r="122"
            fill="none"
            stroke="rgba(45,125,168,0.20)"
            strokeWidth="1"
            strokeDasharray="5 13"
          />

          {/* Primary spoke lines (cardinal) */}
          <line x1="200" y1="200" x2="322" y2="200" stroke="rgba(45,125,168,0.26)" strokeWidth="0.75" />
          <line x1="200" y1="200" x2="200" y2="322" stroke="rgba(45,125,168,0.26)" strokeWidth="0.75" />
          <line x1="200" y1="200" x2="78"  y2="200" stroke="rgba(45,125,168,0.26)" strokeWidth="0.75" />
          <line x1="200" y1="200" x2="200" y2="78"  stroke="rgba(45,125,168,0.26)" strokeWidth="0.75" />

          {/* Secondary spoke lines (diagonal) */}
          <line x1="200" y1="200" x2="259" y2="259" stroke="rgba(45,125,168,0.12)" strokeWidth="0.5" />
          <line x1="200" y1="200" x2="141" y2="259" stroke="rgba(45,125,168,0.12)" strokeWidth="0.5" />
          <line x1="200" y1="200" x2="141" y2="141" stroke="rgba(45,125,168,0.12)" strokeWidth="0.5" />
          <line x1="200" y1="200" x2="259" y2="141" stroke="rgba(45,125,168,0.12)" strokeWidth="0.5" />

          {/* 4 primary pillar nodes — pulsing with staggered delay */}
          <circle className="hi-n1" cx="322" cy="200" r="8" fill="#2D7DA8" />
          <circle className="hi-n2" cx="200" cy="322" r="8" fill="#5095AC" />
          <circle className="hi-n3" cx="78"  cy="200" r="8" fill="#2D7DA8" />
          <circle className="hi-n4" cx="200" cy="78"  r="8" fill="#5095AC" />

          {/* Secondary micro-nodes (diagonal positions) */}
          <circle cx="259" cy="259" r="4" fill="rgba(168,204,224,0.52)" />
          <circle cx="141" cy="259" r="4" fill="rgba(168,204,224,0.52)" />
          <circle cx="141" cy="141" r="4" fill="rgba(168,204,224,0.52)" />
          <circle cx="259" cy="141" r="4" fill="rgba(168,204,224,0.52)" />

          {/* Breathing ring — expands and fades */}
          <circle
            className="hi-breathe"
            cx="200" cy="200" r="66"
            fill="none"
            stroke="rgba(45,125,168,0.38)"
            strokeWidth="1"
          />

          {/* Center disc */}
          <circle cx="200" cy="200" r="52" fill="url(#hi-center-fill)" />
          <circle cx="200" cy="200" r="52" fill="none" stroke="rgba(45,125,168,0.38)" strokeWidth="1" />

          {/* HI monogram */}
          <text
            x="200"
            y="210"
            textAnchor="middle"
            fill="#F5F2EC"
            fontFamily="DM Serif Display, serif"
            fontSize="26"
            fontWeight="400"
            letterSpacing="4"
          >
            HI
          </text>
        </g>
      </svg>
    </div>
  )
}
