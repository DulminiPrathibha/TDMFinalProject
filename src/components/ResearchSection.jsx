import { useState, useEffect, useRef } from 'react'
import researcherImg from '../assets/researchsectionimage.png'
import SectionTopic from './SectionTopic'

/* ─── RESEARCH CARD DATA ──────────────────────────────────────── */
const CARDS = [
  {
    id: 'literature-survey',
    icon: '📚',
    label: 'Literature\nSurvey',
    bg: '#fffde7',
    accentColor: '#f59e0b',
    detail: "We reviewed current dyslexia interventions like GraphoGame, Lexia, and Nessy. Most focus heavily on phonics practice but overlook emotional safety and motivation. We also found that many tools are single-user, which can make learning feel isolating. This helped us realize the need for a more engaging, supportive, and social learning experience.",
  },
  {
    id: 'research-gap',
    icon: '🔍',
    label: 'Research\nGap',
    bg: '#f1f8e9',
    accentColor: '#558b2f',
    detail: "Through our research, we found three major gaps. First, most systems are single-player and lack collaboration. Second, emotional aspects like anxiety and confidence are often ignored. Third, multisensory learning is not fully utilized across devices. These gaps inspired us to design a cooperative and emotionally supportive solution.",
  },
  {
    id: 'research-problem',
    icon: '💡',
    label: 'Research\nProblem',
    bg: '#e3f2fd',
    accentColor: '#1976d2',
    detail: "Children with dyslexia often struggle not just with reading, but also with confidence and anxiety. Existing tools focus mainly on skill-building while ignoring emotional well-being. Our challenge was to create a system that supports both literacy development and emotional safety at the same time.",
  },
  {
    id: 'research-objectives',
    icon: '🎯',
    label: 'Research\nObjectives',
    bg: '#f3e5f5',
    accentColor: '#7b1fa2',
    detail: "Our main goal was to design a cooperative learning experience that improves literacy while reducing anxiety. We aimed to create a safe environment where children can practice without fear, use multisensory techniques, and stay motivated through collaboration instead of competition.",
  },
  {
    id: 'methodology',
    icon: '🧪',
    label: 'Methodology',
    bg: '#fce4ec',
    accentColor: '#e91e63',
    detail: "We followed a structured approach starting with research and design, then developing a dual-device system using Unreal Engine and Flutter. We tested the system technically and validated it with experts to ensure it aligns with real-world needs before moving to user testing.",
  },
  {
    id: 'technologies-used',
    icon: '⚙️',
    label: 'Technologies\nUsed',
    bg: '#e0f7fa',
    accentColor: '#00838f',
    detail: "Our system combines multiple technologies. The PC side uses Unreal Engine for the game environment, while the mobile app is built using Flutter. Firebase handles communication between devices, and voice chat enables collaboration. Together, these technologies create a seamless interactive experience.",
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function ResearchSection() {
  const [visible, setVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="research"
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
        <SectionTopic number="05" title="Research" />



        {/* ══════════════════════════════════════════
            TOP AREA: banner + 3×2 grid | researcher image
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'clamp(20px, 3vw, 40px)',
            alignItems: 'stretch',
          }}
        >
          {/* ── LEFT COL: 3×2 grid ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.5vw, 32px)' }}>

            {/* 3×2 card grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'clamp(10px, 1.8vw, 18px)',
              }}
            >
              {CARDS.map((card, i) => (
                <ResearchCard
                  key={card.id}
                  {...card}
                  visible={visible}
                  delay={0.2 + i * 0.08}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT COL: researcher image ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s',
              flexShrink: 0,
            }}
          >
            <img
              src={researcherImg}
              alt="Researcher with tablet"
              style={{
                width: 'clamp(200px, 26vw, 360px)',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.10))',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedCard && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: 600,
              width: '100%',
              background: '#fff',
              borderRadius: 24,
              padding: 'clamp(24px, 4vw, 40px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              animation: 'scaleIn 0.3s ease',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              style={{
                position: 'absolute',
                top: 16, right: 16,
                width: 36, height: 36,
                borderRadius: '50%',
                border: 'none',
                background: '#f1f1f1',
                color: '#555',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'background 0.2s',
              }}
            >
              ×
            </button>
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 12 }}>
              {selectedCard.icon}
            </div>
            <h3 style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
              color: selectedCard.accentColor,
              marginBottom: 16,
              fontWeight: 700,
              whiteSpace: 'pre-line',
            }}>
              {selectedCard.label}
            </h3>
            <p style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              color: '#4a5e4a',
              lineHeight: 1.6,
              fontWeight: 500,
              margin: 0,
            }}>
              {selectedCard.detail}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

/* ─── RESEARCH CARD ──────────────────────────────────────────── */
function ResearchCard({ id, icon, label, bg, accentColor, visible, delay, onClick }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      id={id}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: hov ? bg : bg,
        border: `1.5px solid ${hov ? accentColor + '55' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 20,
        padding: 'clamp(14px, 2vw, 22px) clamp(12px, 1.6vw, 18px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 0,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hov
          ? `0 10px 30px ${accentColor}22`
          : '0 2px 10px rgba(0,0,0,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: `0.6s, ${hov ? '0.2s' : '0.6s'}, 0.2s, 0.2s`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}, 0s, 0s`,
        transitionTimingFunction: 'ease',
        minHeight: 'clamp(140px, 18vw, 185px)',
      }}
    >
      {/* Icon area */}
      <div style={{
        width: 'clamp(50px, 6.5vw, 72px)',
        height: 'clamp(50px, 6.5vw, 72px)',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'clamp(8px, 1.2vw, 14px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
        transform: hov ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        flexShrink: 0,
        overflow: 'hidden',
        fontSize: 'clamp(24px, 3.5vw, 36px)',
      }}>
        {icon}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)',
        color: '#1a2e1a',
        lineHeight: 1.3,
        whiteSpace: 'pre-line',
        marginBottom: 'auto',
        paddingBottom: 28,
      }}>
        {label}
      </div>

      {/* Arrow button — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(10px, 1.4vw, 14px)',
          right: 'clamp(10px, 1.4vw, 14px)',
          width: 26, height: 26,
          borderRadius: '50%',
          border: `1.5px solid ${hov ? accentColor : 'rgba(0,0,0,0.18)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: hov ? accentColor : '#aaa',
          fontWeight: 700,
          background: hov ? `${accentColor}14` : 'transparent',
          transition: 'all 0.2s ease',
          lineHeight: 1,
        }}
      >
        ›
      </div>
    </div>
  )
}
