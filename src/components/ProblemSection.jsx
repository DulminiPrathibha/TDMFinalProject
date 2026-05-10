import { useState, useEffect, useRef } from 'react'
import childImg from '../assets/problemsectionimage.png'
import SectionTopic from './SectionTopic'

/* ─── THOUGHT BUBBLES ────────────────────────────────────────── */
const THOUGHT_BUBBLES = [
  { text: 'Hard to\nRead', top: '30%', left: '5%' },
  { text: 'Takes More\nTime', top: '8%', left: '28%' },
  { text: 'Spelling\nMistakes', top: '8%', left: '55%' },
  { text: 'Loses\nFocus', top: '30%', left: '65%' },
  { text: 'Feels\nDifferent', top: '52%', left: '68%' },
]

/* ─── PROBLEM CARDS TOP ROW ──────────────────────────────────── */
const PROBLEMS_TOP = [
  {
    icon: '👀',
    iconBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    title: 'Fear of Being\nWatched',
    titleColor: '#e91e63',
    desc: 'Reading or spelling in front of peers creates intense anxiety, causing children to shut down rather than try.',
  },
  {
    icon: '😰',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    title: 'Anxiety from\nRepeated Failure',
    titleColor: '#1976d2',
    desc: 'Getting the same tasks wrong builds a cycle of dread that makes engaging with learning harder every time.',
  },
  {
    icon: '😔',
    iconBg: 'linear-gradient(135deg, #ede7f6, #d1c4e9)',
    title: 'Social\nWithdrawal',
    titleColor: '#7b1fa2',
    desc: 'Struggling where peers do not pushes children away from group activities, cutting off the peer connection they need to thrive.',
  },
]

/* ─── PROBLEM CARDS BOTTOM ROW ───────────────────────────────── */
const PROBLEMS_BOT = [
  {
    icon: '🏝️',
    iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
    title: 'No Safe Space\nto Practice',
    titleColor: '#e65100',
    desc: 'Most tools are solo with no peer support, removing the motivation that comes from working toward something together.',
    wide: true,
  },
  {
    icon: '💔',
    iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    title: 'Diminished\nSelf-Esteem',
    titleColor: '#2e7d32',
    desc: 'When mistakes are treated as failures and progress is ranked, children lose belief in themselves before they get a fair chance.',
    wide: true,
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function ProblemSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="problem"
      ref={ref}
      style={{
        background: '#f6f3ea',
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 80px)',
        fontFamily: "'Fredoka', sans-serif",
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
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{ paddingTop: 'clamp(28px, 4vw, 52px)' }}>
          <SectionTopic number="01" title="The Problem" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* ── LEFT PANEL ── */}
        <div
          style={{
            padding: 'clamp(16px, 2vw, 32px) clamp(28px, 4vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(16px, 2.5vw, 24px)',
          }}
        >

          {/* HEADING */}




          {/* TOP 3 PROBLEM CARDS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(14px, 2vw, 20px)',
            }}
          >
            {PROBLEMS_TOP.map((p, i) => (
              <ProblemCard key={i} {...p} visible={visible} delay={0.35 + i * 0.1} />
            ))}
          </div>

          {/* BOTTOM 2 PROBLEM CARDS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(14px, 2vw, 20px)',
            }}
          >
            {PROBLEMS_BOT.map((p, i) => (
              <ProblemCardWide key={i} {...p} visible={visible} delay={0.65 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — child image + thought bubbles ── */}
        <div
          style={{
            position: 'relative',
            minHeight: 480,
            overflow: 'hidden',
          }}
        >
          {/* CHILD IMAGE fills the right panel completely */}
          <img
            src={childImg}
            alt="Child struggling with reading"
            style={{
              position: 'absolute',
              inset: 0,
              width: '92%',
              height: '92%',
              margin: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.9s ease 0.3s',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
  </section>
  )
}

/* ─── THOUGHT BUBBLE ─────────────────────────────────────────── */
function ThoughtBubble({ text, top, left, visible, delay }) {
  return (
    <div
      style={{
        position: 'absolute',
        top, left,
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.7)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* Cloud shape */}
      <div
        style={{
          background: 'rgba(50, 50, 55, 0.82)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          padding: 'clamp(8px, 1.2vw, 14px) clamp(10px, 1.5vw, 18px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          position: 'relative',
          minWidth: 'clamp(72px, 8vw, 100px)',
          textAlign: 'center',
        }}
      >
        {/* Bubble tail dots */}
        <div style={{
          position: 'absolute',
          bottom: -10, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 3, flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(50,50,55,0.8)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(50,50,55,0.6)' }} />
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(50,50,55,0.4)' }} />
        </div>

        <span style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.6rem, 1vw, 0.78rem)',
          color: '#fff',
          whiteSpace: 'pre-line',
          lineHeight: 1.3,
          display: 'block',
        }}>
          {text}
        </span>
      </div>
    </div>
  )
}

/* ─── PROBLEM CARD (3-column top row) ────────────────────────── */
function ProblemCard({ icon, iconBg, title, titleColor, desc, visible, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#fafff8' : '#fff',
        border: `1.5px solid ${hov ? 'rgba(93,187,99,0.25)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 18,
        padding: 'clamp(16px, 2vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        cursor: 'default',
        transform: visible
          ? hov ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        boxShadow: hov
          ? '0 8px 24px rgba(0,0,0,0.09)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 'clamp(48px, 5vw, 64px)',
        height: 'clamp(48px, 5vw, 64px)',
        borderRadius: 16,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(24px, 2.8vw, 32px)',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
        color: titleColor,
        lineHeight: 1.25,
        whiteSpace: 'pre-line',
      }}>
        {title}
      </div>

      {/* Desc */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
        color: '#666',
        lineHeight: 1.5,
      }}>
        {desc}
      </div>
    </div>
  )
}

/* ─── PROBLEM CARD WIDE (2-column bottom row) ────────────────── */
function ProblemCardWide({ icon, iconBg, title, titleColor, desc, visible, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#fafff8' : '#fff',
        border: `1.5px solid ${hov ? 'rgba(93,187,99,0.25)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 18,
        padding: 'clamp(16px, 2vw, 24px)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        cursor: 'default',
        transform: visible
          ? hov ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        boxShadow: hov
          ? '0 8px 24px rgba(0,0,0,0.09)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 'clamp(48px, 5vw, 64px)',
        height: 'clamp(48px, 5vw, 64px)',
        borderRadius: 16,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(24px, 2.8vw, 32px)',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        flexShrink: 0,
        marginTop: 2,
      }}>
        {icon}
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
          color: titleColor,
          lineHeight: 1.25,
          marginBottom: 6,
          whiteSpace: 'pre-line',
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
          color: '#666',
          lineHeight: 1.5,
        }}>
          {desc}
        </div>
      </div>
    </div>
  )
}
