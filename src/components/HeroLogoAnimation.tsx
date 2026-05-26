import Image from 'next/image'

export default function HeroLogoAnimation() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        .hi-logo-float {
          animation: hi-logo-float 7s ease-in-out infinite;
        }
        .hi-logo-glow {
          animation: hi-logo-glow 4s ease-in-out infinite;
        }
        .hi-orbit-p1 {
          transform-origin: 0 0;
          animation: hi-orbit-p1 11s linear infinite;
        }
        .hi-orbit-p2 {
          transform-origin: 0 0;
          animation: hi-orbit-p2 14s linear infinite;
        }
        .hi-orbit-p3 {
          transform-origin: 0 0;
          animation: hi-orbit-p3 9s linear infinite;
        }
        .hi-orbit-p4 {
          transform-origin: 0 0;
          animation: hi-orbit-p4 17s linear infinite;
        }
        @keyframes hi-logo-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(-16px) rotate(1.1deg); }
          70%       { transform: translateY(-7px) rotate(-0.5deg); }
        }
        @keyframes hi-logo-glow {
          0%, 100% { opacity: 0.50; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.1); }
        }
        @keyframes hi-orbit-p1 {
          from { transform: rotate(0deg)   translateX(140px); }
          to   { transform: rotate(360deg) translateX(140px); }
        }
        @keyframes hi-orbit-p2 {
          from { transform: rotate(72deg)   translateX(158px); }
          to   { transform: rotate(-288deg) translateX(158px); }
        }
        @keyframes hi-orbit-p3 {
          from { transform: rotate(144deg) translateX(128px); }
          to   { transform: rotate(504deg) translateX(128px); }
        }
        @keyframes hi-orbit-p4 {
          from { transform: rotate(216deg)  translateX(152px); }
          to   { transform: rotate(-144deg) translateX(152px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hi-logo-float, .hi-logo-glow,
          .hi-orbit-p1, .hi-orbit-p2, .hi-orbit-p3, .hi-orbit-p4 {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      {/* Static orbit trace rings */}
      <svg
        aria-hidden="true"
        viewBox="0 0 420 420"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
      >
        <circle cx="210" cy="210" r="134" fill="none" stroke="rgba(45,125,168,0.08)" strokeWidth="1" />
        <circle cx="210" cy="210" r="155" fill="none" stroke="rgba(45,125,168,0.05)" strokeWidth="1" strokeDasharray="3 9" />
      </svg>

      {/* Pulsing radial glow behind logo */}
      <div
        className="hi-logo-glow"
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          top: '12.5%',
          left: '12.5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,125,168,0.22) 0%, rgba(45,125,168,0) 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbit particles — zero-size divs anchored at container centre,
          rotated outward; inner span is the visible dot */}
      {[
        { cls: 'hi-orbit-p1', r: 6,   color: '#A8CCE0', opacity: 0.55 },
        { cls: 'hi-orbit-p2', r: 5,   color: '#5095AC', opacity: 0.45 },
        { cls: 'hi-orbit-p3', r: 4.5, color: '#A8CCE0', opacity: 0.38 },
        { cls: 'hi-orbit-p4', r: 3.5, color: '#2D7DA8', opacity: 0.50 },
      ].map(({ cls, r, color, opacity }) => (
        <div
          key={cls}
          className={cls}
          style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none' }}
        >
          <span style={{
            position: 'absolute',
            top: `-${r}px`,
            left: `-${r}px`,
            width: `${r * 2}px`,
            height: `${r * 2}px`,
            borderRadius: '50%',
            background: color,
            opacity,
          }} />
        </div>
      ))}

      {/* Floating logo */}
      <div className="hi-logo-float" style={{ position: 'relative', zIndex: 1 }}>
        <Image
          src="/logo.png"
          alt=""
          width={280}
          height={280}
          priority={false}
          style={{
            width: 'clamp(200px, 60%, 280px)',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 28px rgba(45,125,168,0.32)) drop-shadow(0 8px 24px rgba(15,42,63,0.12))',
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  )
}
