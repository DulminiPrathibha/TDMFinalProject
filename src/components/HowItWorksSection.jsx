import { useState, useEffect, useRef } from 'react'
import step1 from '../assets/1.png'
import step2 from '../assets/2.png'
import step3 from '../assets/3.png'
import step4 from '../assets/4.png'
import step5 from '../assets/5.png'
import SectionTopic from './SectionTopic'

/* ─── STEPS DATA ─────────────────────────────────────────────── */
const STEPS = [
  {
    num: 1,
    numColor: '#4CAF50',        /* green */
    title: 'Explore\nMagical Islands',
    desc: 'Navigate through portals and discover new learning worlds.',
    img: step1,
    imgAlt: 'Children exploring magical islands through portals',
  },
  {
    num: 2,
    numColor: '#F4A137',        /* orange */
    title: 'Find Hidden\nLetter Chests',
    desc: 'Search together or separately to uncover hidden letter treasures.',
    img: step2,
    imgAlt: 'Children finding hidden letter treasure chests',
  },
  {
    num: 3,
    numColor: '#29B6F6',        /* blue */
    title: 'Trace Letters\non Mobile',
    desc: 'Practice tracing letters through multisensory activities on mobile.',
    img: step3,
    imgAlt: 'Hand tracing letter A on mobile device',
  },
  {
    num: 4,
    numColor: '#7C4DFF',        /* purple */
    title: 'Unlock &\nOrganize Letters',
    desc: 'Unlock collected letters and arrange them in the correct order.',
    img: step4,
    imgAlt: 'Children organizing alphabet blocks in correct order',
  },
  {
    num: 5,
    numColor: '#F44336',        /* red */
    title: 'Earn Rewards\nTogether',
    desc: 'Complete challenges, grow your world, and celebrate success together.',
    img: step5,
    imgAlt: 'Children celebrating with treasure chest and rewards',
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function HowItWorksSection() {
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
      id="how-it-works"
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
        <SectionTopic number="04" title="How It Works" />





        {/* ── 5-STEP ROW: no gap so each card's inline arrow spans full width ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {STEPS.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              visible={visible}
              delay={0.25 + i * 0.1}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>

    </section>
  )
}

/* ─── STEP CARD ───────────────────────────────────────────────── */
function StepCard({ step, visible, delay, isLast }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingRight: isLast ? 0 : 8,   /* breathing room between images */
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(28px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: `0.6s, ${hov ? '0.22s' : '0.6s'}`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}`,
        transitionTimingFunction: 'ease',
      }}
    >
      {/* ── Number circle + arrow in one flex row ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 'clamp(6px, 1vw, 10px)',
        overflow: 'visible',
      }}>
        {/* Circle */}
        <div style={{
          width: 'clamp(32px, 3.2vw, 40px)',
          height: 'clamp(32px, 3.2vw, 40px)',
          borderRadius: '50%',
          background: step.numColor,
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
          boxShadow: `0 4px 14px ${step.numColor}66`,
          flexShrink: 0,
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.22s ease',
          transform: hov ? 'scale(1.1)' : 'scale(1)',
        }}>
          {step.num}
        </div>

        {/* Arrow — starts immediately right of the circle, stretches to card edge */}
        {!isLast && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 6,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${delay + 0.25}s`,
            filter: 'drop-shadow(0 2px 6px rgba(67,160,71,0.55))',
          }}>
            {/* Dashed line — 70% of remaining space so arrow is shorter */}
            <div style={{
              width: '70%',
              height: 4,
              background: `repeating-linear-gradient(
                to right,
                #43A047 0px,
                #43A047 10px,
                transparent 10px,
                transparent 16px
              )`,
              borderRadius: 2,
              position: 'relative',
              flexShrink: 0,
            }}>
              {/* Bold arrowhead */}
              <div style={{
                position: 'absolute',
                right: -18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '11px solid transparent',
                borderBottom: '11px solid transparent',
                borderLeft: '18px solid #43A047',
              }} />
            </div>
          </div>
        )}
      </div>

      {/* ── Title ── */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.78rem, 1.05vw, 0.92rem)',
        color: '#1a2e1a',
        lineHeight: 1.25,
        marginBottom: 5,
        whiteSpace: 'pre-line',
      }}>
        {step.title}
      </div>

      {/* ── Description ── */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(0.62rem, 0.82vw, 0.75rem)',
        color: '#6b7b6b',
        lineHeight: 1.5,
        marginBottom: 'clamp(10px, 1.5vw, 14px)',
      }}>
        {step.desc}
      </div>

      {/* ── Step illustration image ── */}
      <div style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: hov ? '0 12px 36px rgba(0,0,0,0.14)' : '0 4px 18px rgba(0,0,0,0.09)',
        transition: 'box-shadow 0.22s ease',
        background: '#f0f4f0',
        aspectRatio: '1 / 0.85',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={step.img}
          alt={step.imgAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}


