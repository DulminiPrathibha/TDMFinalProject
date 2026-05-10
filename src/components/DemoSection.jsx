import { useState, useEffect, useRef } from 'react'
import SectionTopic from './SectionTopic'

export default function DemoSection() {
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
      id="demo"
      ref={ref}
      style={{
        background: '#f6f3ea',
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 80px)',
      }}
    >
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
        <SectionTopic number="08" title="Demo" />

        {/* ─── HEADER (REMOVED) ─── */}
        {/* ─── VIDEO WRAPPER (16:9) ─── */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          background: '#000',
        }}>
          <div style={{
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            position: 'relative',
          }}>
            <iframe
              src="https://www.youtube.com/embed/sBCyNuJp8Xg"
              title="WordGarden Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
        </div>

        {/* ─── DECORATIONS ─── */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          fontSize: 'clamp(24px, 4vw, 48px)',
          animation: 'float 4s ease-in-out infinite',
          pointerEvents: 'none',
          opacity: 0.6
        }}>
          ☁️
        </div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '3%',
          fontSize: 'clamp(20px, 3vw, 36px)',
          animation: 'float 5s ease-in-out infinite 1s',
          pointerEvents: 'none',
          opacity: 0.6
        }}>
          🍃
        </div>
      </div>
    </section>
  )
}
