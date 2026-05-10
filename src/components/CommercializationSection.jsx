import { useState, useEffect, useRef } from 'react'
import commercialImg from '../assets/commercializationsectionimage.png'
import SectionTopic from './SectionTopic'

/* ─── CARD DATA ───────────────────────────────────────────────── */
const CARDS = [
  {
    id: 'future-potential',
    bg: '#f0faf0',
    iconBg: '#e8f5e9',
    accentColor: '#2e7d32',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        {/* soil mound */}
        <ellipse cx="22" cy="36" rx="13" ry="5" fill="#8d6e4a" />
        <ellipse cx="22" cy="34" rx="10" ry="4" fill="#a1785c" />
        {/* stem */}
        <path d="M22 34 Q22 22 22 16" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" />
        {/* left leaf */}
        <path d="M22 24 Q16 20 15 14 Q20 16 22 22" fill="#66bb6a" />
        {/* right leaf */}
        <path d="M22 20 Q28 15 30 10 Q25 13 22 19" fill="#43a047" />
        {/* top sprout leaves */}
        <path d="M22 16 Q18 10 19 6 Q23 10 22 16" fill="#81c784" />
        <path d="M22 16 Q26 10 25 6 Q21 10 22 16" fill="#66bb6a" />
      </svg>
    ),
    title: 'Future Potential',
    desc: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>WordGarden can grow from a prototype into a fully deployable product sold to schools, therapy centers, and families.</p>
        <div style={{ padding: '10px 14px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '12px', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
          <strong style={{ color: '#333' }}>🌱 Growing Impact:</strong> As the user base grows, data from sessions can support adaptive learning features, making the platform more valuable over time and opening doors to institutional contracts and grant-funded deployments in underserved communities.
        </div>
      </div>
    ),
  },
  {
    id: 'commercialization-opportunities',
    bg: '#f5f0fa',
    iconBg: '#ede7f6',
    accentColor: '#6a1b9a',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        {/* briefcase body */}
        <rect x="6" y="16" width="32" height="22" rx="4" fill="#9c27b0" />
        <rect x="6" y="16" width="32" height="22" rx="4" fill="url(#briefGrad)" />
        {/* handle */}
        <path d="M15 16 L15 11 Q15 8 22 8 Q29 8 29 11 L29 16" stroke="#6a1b9a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* clasp */}
        <rect x="18" y="24" width="8" height="5" rx="2" fill="#f3e5f5" />
        <rect x="20" y="25.5" width="4" height="2" rx="1" fill="#ce93d8" />
        {/* bottom line */}
        <rect x="6" y="26" width="32" height="2" rx="1" fill="rgba(0,0,0,0.12)" />
        <defs>
          <linearGradient id="briefGrad" x1="6" y1="16" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ab47bc" />
            <stop offset="1" stopColor="#7b1fa2" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Commercialization opportunities',
    desc: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>WordGarden can be monetized through three clear channels:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(156, 39, 176, 0.08)', borderRadius: '10px' }}>
            <span>🏡</span> <div><strong style={{ color: '#333' }}>Free tier for families</strong> — limited sessions to build awareness and trust among parents</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(156, 39, 176, 0.08)', borderRadius: '10px' }}>
            <span>🏫</span> <div><strong style={{ color: '#333' }}>Paid school licenses</strong> — annual institutional license giving teachers and facilitators access to the full platform for classroom use</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(156, 39, 176, 0.08)', borderRadius: '10px' }}>
            <span>🏥</span> <div><strong style={{ color: '#333' }}>Clinic and hospital packages</strong> — sold directly to therapy centers and pediatric hospitals as a session tool used by child psychiatrists and speech-language pathologists during structured interventions</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'target-customers',
    bg: '#fff8f0',
    iconBg: '#fff3e0',
    accentColor: '#e65100',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        {/* back-left person */}
        <circle cx="11" cy="17" r="6" fill="#ff9800" opacity="0.7" />
        <path d="M4 38 Q4 28 11 28 Q18 28 18 38" fill="#ff9800" opacity="0.7" />
        {/* back-right person */}
        <circle cx="33" cy="17" r="6" fill="#ff9800" opacity="0.7" />
        <path d="M26 38 Q26 28 33 28 Q40 28 40 38" fill="#ff9800" opacity="0.7" />
        {/* center person */}
        <circle cx="22" cy="15" r="7" fill="#f57c00" />
        <path d="M13 38 Q13 27 22 27 Q31 27 31 38" fill="#f57c00" />
      </svg>
    ),
    title: 'Target customers',
    desc: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>Four clear customer groups, each with a different entry point:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(230, 81, 0, 0.08)', borderRadius: '10px' }}>
            <span>📚</span> <div><strong style={{ color: '#333' }}>Schools and special education units</strong> — purchase a site license; teachers use it in supervised small-group sessions</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(230, 81, 0, 0.08)', borderRadius: '10px' }}>
            <span>🩺</span> <div><strong style={{ color: '#333' }}>Therapy centers and pediatric hospitals</strong> — buy a clinic package; therapists run it as part of structured dyslexia intervention sessions</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(230, 81, 0, 0.08)', borderRadius: '10px' }}>
            <span>🧑‍🏫</span> <div><strong style={{ color: '#333' }}>Special educators and speech-language pathologists</strong> — individual professional license for one-to-small-group use</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(230, 81, 0, 0.08)', borderRadius: '10px' }}>
            <span>👨‍👩‍👧</span> <div><strong style={{ color: '#333' }}>Parents</strong> — start free, upgrade to a paid plan for unlimited home sessions alongside their child's formal therapy</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'future-improvements',
    bg: '#f5f0ff',
    iconBg: '#ede7f6',
    accentColor: '#4527a0',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        {/* bar chart base */}
        <rect x="6" y="36" width="32" height="2.5" rx="1.2" fill="#7e57c2" opacity="0.4" />
        {/* bars */}
        <rect x="9"  y="28" width="7" height="8" rx="2" fill="#7e57c2" opacity="0.6" />
        <rect x="19" y="22" width="7" height="14" rx="2" fill="#673ab7" opacity="0.75" />
        <rect x="29" y="15" width="7" height="21" rx="2" fill="#512da8" />
        {/* upward arrow */}
        <polyline points="7,30 16,22 25,26 37,12" stroke="#7c4dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polygon points="37,12 32,13 36,17" fill="#7c4dff" />
      </svg>
    ),
    title: 'Future improvements',
    desc: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>Planned upgrades that will directly increase the product's market value:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(69, 39, 160, 0.08)', borderRadius: '10px' }}>
            <span>📊</span> <div><strong style={{ color: '#333' }}>Facilitator dashboard</strong> — lets teachers and therapists monitor each child's session progress, making it a stronger sell to institutions</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(69, 39, 160, 0.08)', borderRadius: '10px' }}>
            <span>⚙️</span> <div><strong style={{ color: '#333' }}>Adaptive difficulty</strong> — tasks adjust to each child's pace automatically, reducing the need for manual facilitator input</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(69, 39, 160, 0.08)', borderRadius: '10px' }}>
            <span>🗂️</span> <div><strong style={{ color: '#333' }}>Expanded task library</strong> — more content types to sustain long-term engagement and justify ongoing subscriptions</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 12px', background: 'rgba(69, 39, 160, 0.08)', borderRadius: '10px' }}>
            <span>🔬</span> <div><strong style={{ color: '#333' }}>Child user trials and clinical validation</strong> — formal Phase 2 evidence to support institutional purchasing decisions and grant applications</div>
          </div>
        </div>
      </div>
    ),
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function CommercializationSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="commercialization"
      ref={ref}
      style={{
        background: '#f6f3ea',
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 80px)',
      }}
    >
      {/* ══════════════════════════════════════════
          MAIN CARD
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: '#fff',
          borderRadius: 32,
          boxShadow: '0 8px 60px rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.04)',
          border: '1.5px solid rgba(93,187,99,0.10)',
          padding: 'clamp(28px, 4vw, 52px)',
          position: 'relative',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionTopic number="06" title="Commercialization" />



        {/* ══════════════════════════════════════════
            TWO-COLUMN LAYOUT: cards LEFT | image RIGHT
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'clamp(24px, 3.5vw, 56px)',
            alignItems: 'stretch',
          }}
        >
          {/* ── LEFT: vertical card list ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.2vw, 28px)' }}>

            {/* Vertical stacked cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vw, 16px)' }}>
              {CARDS.map((card, i) => (
                <CommercialCard
                  key={card.id}
                  {...card}
                  visible={visible}
                  delay={0.18 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: illustration image ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(28px)',
              transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
              flexShrink: 0,
            }}
          >
            <img
              src={commercialImg}
              alt="Commercialization illustration"
              style={{
                width: 'clamp(200px, 28vw, 390px)',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.10))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── HORIZONTAL INFO CARD ───────────────────────────────────── */
function CommercialCard({ id, bg, iconBg, accentColor, icon, title, desc, visible, delay }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      id={id}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? bg : bg,
        border: `1.5px solid ${hov ? accentColor + '44' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 18,
        padding: 'clamp(14px, 1.8vw, 20px) clamp(16px, 2vw, 24px)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'clamp(14px, 2vw, 22px)',
        cursor: 'default',
        position: 'relative',
        boxShadow: hov
          ? `0 8px 28px ${accentColor}20`
          : '0 2px 10px rgba(0,0,0,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(22px)',
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: `0.6s, ${hov ? '0.2s' : '0.6s'}, 0.2s, 0.2s`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}, 0s, 0s`,
        transitionTimingFunction: 'ease',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 'clamp(54px, 6vw, 70px)',
        height: 'clamp(54px, 6vw, 70px)',
        borderRadius: '50%',
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(0,0,0,0.07)',
        transform: hov ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.25s ease',
      }}>
        {icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.92rem, 1.3vw, 1.1rem)',
          color: accentColor,
          marginBottom: 5,
          lineHeight: 1.2,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(0.76rem, 1vw, 0.88rem)',
          color: '#4a5a4a',
          lineHeight: 1.6,
        }}>
          {desc}
        </div>
      </div>

    </div>
  )
}
