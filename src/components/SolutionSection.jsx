import { useState, useEffect, useRef } from 'react'
import deviceImg from '../assets/solutionsectionimage.png'
import SectionTopic from './SectionTopic'

/* ─── SOLUTION FEATURES ──────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Transforms Learning Into Play',
    desc: 'Makes reading, decoding, and writing feel engaging instead of stressful through interactive adventures.',
    color: '#e91e63',
    bgLight: 'rgba(233, 30, 99, 0.04)',
    bgHov: 'rgba(233, 30, 99, 0.1)',
    border: 'rgba(233, 30, 99, 0.25)',
  },
  {
    title: 'Builds Confidence Through Success',
    desc: 'Encourages small wins that reduce anxiety and help children overcome the fear of failure.',
    color: '#1976d2',
    bgLight: 'rgba(25, 118, 210, 0.04)',
    bgHov: 'rgba(25, 118, 210, 0.1)',
    border: 'rgba(25, 118, 210, 0.25)',
  },
  {
    title: 'Creates Positive Social Interaction',
    desc: 'Uses cooperative activities to help children connect, communicate, and avoid social withdrawal.',
    color: '#f57f17',
    bgLight: 'rgba(245, 127, 23, 0.04)',
    bgHov: 'rgba(245, 127, 23, 0.1)',
    border: 'rgba(245, 127, 23, 0.25)',
  },
  {
    title: 'Provides the Right Support System',
    desc: 'Adapts to each child’s learning style, giving personalized guidance where traditional methods fall short.',
    color: '#388e3c',
    bgLight: 'rgba(56, 142, 60, 0.04)',
    bgHov: 'rgba(56, 142, 60, 0.1)',
    border: 'rgba(56, 142, 60, 0.25)',
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function SolutionSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="solution"
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
          border: '1.5px solid rgba(93,187,99,0.1)',
          padding: 'clamp(28px, 4vw, 52px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          overflow: 'visible',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionTopic number="02" title="Our Solution" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
        }}>
          {/* ── LEFT — device mockup image ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}
          >
            <img
              src={deviceImg}
              alt="WordGarden game on laptop and phone"
              style={{
                width: '100%',
                maxWidth: '900px',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.18))',
              }}
            />
          </div>

          {/* ── RIGHT — feature text blocks ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(14px, 2vw, 24px)',
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureRow
                key={i}
                {...f}
                visible={visible}
                delay={0.3 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



/* ─── FEATURE ROW ────────────────────────────────────────────── */
function FeatureRow({ title, desc, color, bgLight, bgHov, border, visible, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '18px 24px',
        borderRadius: 20,
        background: hov ? bgHov : bgLight,
        border: `1.5px solid ${hov ? border : 'transparent'}`,
        transition: 'all 0.25s ease',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        transitionProperty: 'opacity, transform, background, border',
        transitionDuration: `0.6s, 0.6s, 0.25s, 0.25s`,
        transitionDelay: `${delay}s, ${delay}s, 0s, 0s`,
        transitionTimingFunction: 'ease',
      }}
    >
      <div style={{
        fontWeight: 700,
        fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
        color: color,
        lineHeight: 1.3,
      }}>
        {title}
      </div>
      <div style={{
        fontWeight: 500,
        fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
        color: '#4a5e4a',
        lineHeight: 1.55,
      }}>
        {desc}
      </div>
    </div>
  )
}
