import { useEffect, useRef, useState } from 'react'
import demoVideo from '../assets/DemoVideo.mp4'
import SectionTopic from './SectionTopic'

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function DemoSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="demo"
      ref={sectionRef}
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
        <SectionTopic number="05" title="Demo" />


        {/* ── Heading + subtitle centred ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            textAlign: 'center',
            marginBottom: 'clamp(24px, 3.5vw, 40px)',
          }}
        >
            <p
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)',
                color: '#4a5e4a',
                fontWeight: 500,
                lineHeight: 1.65,
                margin: '0 auto',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              Watch a quick demo to see how children explore, learn, and grow in the WordGarden world.
            </p>
          </div>

        {/* ── VIDEO PLAYER ── */}
        <div
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
            background: '#000',
            width: '100%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
            position: 'relative',
          }}
        >
          <video
            controls
            style={{
              width: '100%',
              display: 'block',
              maxHeight: '65vh',
              objectFit: 'contain',
              background: '#000',
            }}
          >
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
