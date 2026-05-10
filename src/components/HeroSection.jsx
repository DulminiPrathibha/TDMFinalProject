import { useState, useEffect, useMemo } from 'react'
import heroImg from '../assets/hero.png'
import logoImg from '../assets/Logo.png'
import comingSoonImg from '../assets/ComingSoon.png'

/* ─── NAV LINKS ─────────────────────────────────────────────── */


/* ─── FEATURE ITEMS ─────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '📖',
    iconBg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    title: 'Research\nBacked',
    sub: 'Grounded in\nevidence-based\nmethods',
  },
  {
    icon: '🧠',
    iconBg: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    title: 'Multisensory\nLearning',
    sub: 'Engages multiple\nsenses for deeper\nunderstanding',
  },
  {
    icon: '👥',
    iconBg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    title: 'Cooperative\nGameplay',
    sub: 'Encourages teamwork,\ncommunication, and\nsocial skills',
  },
  {
    icon: '🛡️',
    iconBg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    title: 'Designed for\nAges 8–12',
    sub: 'Age-appropriate\ncontent children\nlove',
  },
]

/* ─── STATS ──────────────────────────────────────────────────── */
const STATS = [
  { icon: '👥', iconBg: '#fce7f3', valueColor: '#ec4899', value: '1 in 5', desc: 'children affected\nby dyslexia' },
  { icon: '❤️', iconBg: '#fee2e2', valueColor: '#ef4444', value: '70%', desc: 'report anxiety in\nschool settings' },
  { icon: '🌧️', iconBg: '#f3e8ff', valueColor: '#a855f7', value: '60%', desc: 'feel isolated in\ntraditional classrooms' },
  { icon: '📈', iconBg: '#dcfce7', valueColor: '#22c55e', value: '3x', desc: 'more likely to drop\nout without support' },
]

/* ─── PARTICLES ──────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: 5 + (i % 4) * 2,
  left: `${6 + (i * 41) % 86}%`,
  delay: `${(i * 0.5) % 5}s`,
  duration: `${5 + (i * 29 % 5)}s`,
  color: ['#5DBB63', '#F4A137', '#F47AB0', '#5BA4CF', '#FFD44F', '#A78BFA'][i % 6],
}))

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function HeroSection() {
  const NAV_LINKS = useMemo(() => [
    { label: 'Home',             id: 'home' },
    { label: 'Problem',          id: 'problem' },
    { label: 'Solution',         id: 'solution' },
    { label: 'Features',         id: 'features' },
    { label: 'How It Works',     id: 'how-it-works' },
    { label: 'Research',         id: 'research' },
    { label: 'Commercialization',id: 'commercialization' },
    { label: 'Team',             id: 'team' },
    { label: 'Resources',        id: 'resources' },
    { label: 'Contact Us',       id: 'contact-us' },
  ], [])

  const [menuOpen, setMenuOpen]         = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const [mounted, setMounted]           = useState(false)
  const [activeSection, setActive]      = useState('home')
  const [showComingSoon, setComingSoon] = useState(false)

  useEffect(() => {
    // Delay mount so animations fire after first render
    const t = setTimeout(() => setMounted(true), 80)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Close modal on Escape
    const onKey = (e) => { if (e.key === 'Escape') setComingSoon(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Track which section is in view
  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = NAV_LINKS.map(l => l.id)
      
      const observerOptions = {
        threshold: 0,
        rootMargin: '-25% 0px -45% 0px' // Target the middle-top area
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      }, observerOptions)

      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })

      return () => observer.disconnect()
    }, 1000)

    return () => clearTimeout(timer)
  }, [NAV_LINKS])

  return (
    <>
      {/* ════════════════════════════════════════════
          STICKY NAVBAR
      ════════════════════════════════════════════ */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          paddingRight: 'clamp(16px, 4vw, 48px)',
          background: scrolled
            ? 'rgba(246,243,234,0.92)'
            : 'rgba(246,243,234,0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: scrolled
            ? '1px solid rgba(93,187,99,0.18)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.08)'
            : 'none',
          transition: 'all 0.4s ease',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(-16px)',
        }}
      >
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src={logoImg}
            alt="WordGarden Logo"
            style={{
              height: 'clamp(44px, 5vw, 60px)',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* CENTER NAV (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.id} label={link.label} href={`#${link.id}`} active={activeSection === link.id} />
          ))}
        </div>

        {/* RIGHT CTA — Try Prototype triggers Coming Soon modal */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={() => setComingSoon(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #43A047, #2E7D32)',
              color: '#fff',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              padding: '10px 22px',
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(67,160,71,0.4)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(67,160,71,0.55)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(67,160,71,0.4)'
            }}
          >
            Try Prototype
            <span style={{
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 8,
              width: 22, height: 22,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
            }}>🎮</span>
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: 80, left: 0, right: 0,
            zIndex: 90,
            background: 'rgba(246,243,234,0.97)',
            backdropFilter: 'blur(20px)',
            padding: '12px 20px 20px',
            borderBottom: '1px solid rgba(93,187,99,0.2)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '11px 14px',
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: activeSection === link.id ? 800 : 600,
                color: activeSection === link.id ? '#2E7D32' : '#333',
                fontSize: '1rem',
                borderRadius: 10,
                background: activeSection === link.id ? 'rgba(93,187,99,0.1)' : 'transparent',
                marginBottom: 3,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}

        </div>
      )}

      {/* ════════════════════════════════════════════
          HERO SECTION — FULL SCREEN BG IMAGE
      ════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 520,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ── BACKGROUND IMAGE (fills full section) ── */}
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── GRADIENT OVERLAY — subtle left-side tint for text readability ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `
              linear-gradient(
                to right,
                rgba(246,243,234,0.52) 0%,
                rgba(246,243,234,0.38) 28%,
                rgba(246,243,234,0.10) 50%,
                rgba(246,243,234,0.0) 65%
              )
            `,
          }}
        />

        {/* ── FLOATING PARTICLES (z above bg, below text) ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            zIndex: 2, pointerEvents: 'none', overflow: 'hidden',
          }}
        >
          {PARTICLES.map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.color,
                opacity: 0.45,
                animation: `particleDrift ${p.duration} ${p.delay} ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* ── LEFT TEXT CONTENT (above all bg layers) ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            paddingLeft: 'clamp(20px, 6vw, 72px)',
            paddingTop: 80,        /* offset for fixed navbar */
            paddingRight: '5%',
            maxWidth: 'clamp(320px, 46%, 600px)',
          }}
        >
          {/* MAIN HEADING */}
          <h1
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 700,
              lineHeight: 1.06,
              marginBottom: 22,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            {/* Line 1: "A World Where" — bright light green */}
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#22c55e',
              textShadow: '0 2px 12px rgba(34,197,94,0.18)',
            }}>
              A World Where
            </span>

            {/* Line 2: "Words" bright green + "Grow" orange-yellow */}
            <span style={{ display: 'block', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
              <span style={{ color: '#22c55e', textShadow: '0 2px 12px rgba(34,197,94,0.18)' }}>Words </span>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Grow</span>
            </span>

            {/* Line 3: "Confidence" orange-yellow + leaf */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Confidence
              <span style={{
                WebkitTextFillColor: 'initial',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                animation: 'float 3s ease-in-out infinite',
                display: 'inline-block',
              }}>
                🌿
              </span>
            </span>
          </h1>

          {/* PARAGRAPH */}
          <p
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(0.92rem, 1.5vw, 1.08rem)',
              color: '#1a3a1a',
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: 36,
              fontWeight: 600,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
            }}
          >
            A cooperative multiplayer game where children with dyslexia practise reading and spelling privately on their own device, while teaming up with friends in a shared adventure, so every child can grow at their own pace, without fear of judgment.
          </p>

          {/* CTA BUTTON */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
            }}
          >
            {/* Watch Demo scrolls to #demo section */}
            <a href="https://drive.google.com/file/d/1jK3jQTw9f9XMjnim9InuTIWAkMBD-fG_/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <WatchDemoButton />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS + FEATURES CARD — below hero
      ════════════════════════════════════════════ */}
      <section
        id="stats"
        style={{
          background: '#f6f3ea',
          paddingTop: 'clamp(24px, 4vw, 48px)',
          paddingBottom: 'clamp(24px, 4vw, 48px)',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          paddingRight: 'clamp(16px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Floating decorations ── */}
        <div style={{ position: 'absolute', top: '15%', left: '4%', fontSize: '1.8rem', animation: 'float 3s ease-in-out infinite', opacity: mounted ? 0.8 : 0, transition: 'opacity 1s ease' }}>🌸</div>
        <div style={{ position: 'absolute', top: '25%', right: '7%', fontSize: '2.5rem', animation: 'float 4s ease-in-out infinite 0.5s', opacity: mounted ? 0.7 : 0, transition: 'opacity 1s ease' }}>☁️</div>
        <div style={{ position: 'absolute', bottom: '15%', left: '8%', fontSize: '2rem', animation: 'float 3.5s ease-in-out infinite 1s', opacity: mounted ? 0.75 : 0, transition: 'opacity 1s ease' }}>🍃</div>
        <div style={{ position: 'absolute', bottom: '12%', right: '5%', fontSize: '1.6rem', animation: 'float 4.5s ease-in-out infinite 0.2s', opacity: mounted ? 0.9 : 0, transition: 'opacity 1s ease' }}>🌸</div>
        <div style={{ position: 'absolute', top: '45%', left: '2%', fontSize: '2rem', animation: 'float 3.2s ease-in-out infinite 1.5s', opacity: mounted ? 0.6 : 0, transition: 'opacity 1s ease' }}>☁️</div>
        <div style={{ position: 'absolute', top: '55%', right: '3%', fontSize: '1.4rem', animation: 'float 3.8s ease-in-out infinite 0.8s', opacity: mounted ? 0.8 : 0, transition: 'opacity 1s ease' }}>✨</div>
        <div style={{ position: 'absolute', bottom: '35%', right: '12%', fontSize: '1.8rem', animation: 'float 4.2s ease-in-out infinite 0.4s', opacity: mounted ? 0.7 : 0, transition: 'opacity 1s ease' }}>🍃</div>

        <StatsCard mounted={mounted} />
      </section>

      {/* ════════════════════════════════════════════
          COMING SOON MODAL
      ════════════════════════════════════════════ */}
      {showComingSoon && (
        <>
          <div
            onClick={() => setComingSoon(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              animation: 'csFadeIn 0.25s ease',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 32px 100px rgba(0,0,0,0.45)',
                maxWidth: 760,
                width: '92vw',
                animation: 'csSlideUp 0.3s ease',
              }}
            >
              <button
                onClick={() => setComingSoon(false)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 36, height: 36,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  fontSize: 22,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                  zIndex: 2,
                }}
              >×</button>
              <img
                src={comingSoonImg}
                alt="Coming Soon"
                style={{ width: '100%', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>
          <style>{`
            @keyframes csFadeIn  { from { opacity:0 } to { opacity:1 } }
            @keyframes csSlideUp { from { opacity:0; transform:translateY(30px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
          `}</style>
        </>
      )}
    </>
  )
}

/* ─── NAV LINK ───────────────────────────────────────────────── */
function NavLink({ label, href, active }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '7px 13px',
        borderRadius: 50,
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: active ? 800 : 600,
        fontSize: '0.88rem',
        color: active ? '#2E7D32' : hov ? '#1B5E20' : '#3a3a3a',
        background: active
          ? '#fff'
          : hov ? 'rgba(93,187,99,0.1)' : 'transparent',
        boxShadow: active ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </a>
  )
}

/* ─── WATCH DEMO BUTTON ──────────────────────────────────────── */
function WatchDemoButton() {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        gap: 12,
        padding: '13px 26px 13px 18px',
        borderRadius: 50,
        border: 'none',
        cursor: 'pointer',
        background: hov
          ? 'linear-gradient(135deg, #4CAF50, #1B5E20)'
          : 'linear-gradient(135deg, #43A047, #2E7D32)',
        color: '#fff',
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: '1.05rem',
        boxShadow: hov
          ? '0 10px 32px rgba(67,160,71,0.6), 0 0 0 4px rgba(93,187,99,0.18)'
          : '0 6px 22px rgba(67,160,71,0.45)',
        transform: hov ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
        transition: 'all 0.25s ease',
        letterSpacing: '0.1px',
      }}
    >
      <span style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, flexShrink: 0,
      }}>▶</span>
      Watch Demo
    </button>
  )
}

/* ─── STATS CARD ─────────────────────────────────────────────── */
function StatsCard({ mounted }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 8px 48px rgba(0,0,0,0.06)',
        padding: '16px',
        width: '100%',
        maxWidth: 1200,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {/* LEFT COLUMN: Features */}
        <div style={{ flex: 1, minWidth: 320, background: '#f7fbf4', borderRadius: 16, padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, background: '#eaf4e0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              🌱
            </div>
            <div>
              <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#1a3a1a', margin: '0 0 6px', lineHeight: 1.15, fontWeight: 700 }}>
                Built for Effective Dyslexia Support
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#5a6e5a', lineHeight: 1.4 }}>
                WordGarden combines research and play to help children learn, grow, and thrive.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 'auto' }}>
            {FEATURES.map((f, i) => (
               <FeatureBlock key={i} {...f} />
            ))}
          </div>
        </div>
        
        {/* RIGHT COLUMN: Stats */}
        <div style={{ flex: 1, minWidth: 320, background: '#fffaf5', borderRadius: 16, padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, background: '#ffebe0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              📊
            </div>
            <div>
              <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#1a3a1a', margin: '0 0 6px', lineHeight: 1.15, fontWeight: 700 }}>
                Why This Matters
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#5a6e5a', lineHeight: 1.4 }}>
                The challenges are real. Support makes the difference.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 10, marginTop: 'auto' }}>
            {STATS.map((s, i) => (
               <StatBlock key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
      
      {/* BOTTOM BAR */}
      <div style={{ 
        background: '#fffbeb', 
        borderRadius: 12, 
        padding: '16px 24px', 
        marginTop: '16px', 
        textAlign: 'center', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8 
      }}>
        <span style={{ fontSize: 20 }}>⭐</span>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.95rem', color: '#333' }}>
          <strong>Our mission is simple:</strong> empower children with dyslexia through joyful learning, meaningful connections, and a supportive community.
        </span>
      </div>
    </div>
  )
}

/* ─── FEATURE BLOCK ─────────────────────────────────────────── */
function FeatureBlock({ icon, iconBg, title, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '23%' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 16,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
        marginBottom: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: '0.85rem',
        color: '#1a2e1a',
        lineHeight: 1.25,
        marginBottom: 6,
        whiteSpace: 'pre-line'
      }}>{title}</div>
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 500,
        fontSize: '0.7rem',
        color: '#666',
        lineHeight: 1.4,
        whiteSpace: 'pre-line'
      }}>{sub}</div>
    </div>
  )
}

/* ─── STAT BLOCK ─────────────────────────────────────────────── */
function StatBlock({ icon, iconBg, value, valueColor, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '23%' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 22,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
        marginBottom: 16,
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 800,
        fontSize: '1.4rem',
        color: valueColor, 
        lineHeight: 1,
        marginBottom: 6,
      }}>{value}</div>
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 600,
        fontSize: '0.75rem',
        color: '#333',
        lineHeight: 1.4,
        whiteSpace: 'pre-line'
      }}>{desc}</div>
    </div>
  )
}
