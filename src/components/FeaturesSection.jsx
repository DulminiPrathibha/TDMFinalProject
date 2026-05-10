import { useState, useEffect, useRef } from 'react'
import childrenImg from '../assets/featuresectionimage.png'
import SectionTopic from './SectionTopic'

import img1 from '../assets/MultisensoryLearningImage.png'
import img2 from '../assets/CooperativeGameplayImage.png'
import img3 from '../assets/Adaptive&PersonalizedImage.png'
import img4 from '../assets/Safe&EncouragingImage.png'
import img5 from '../assets/ProgressTrackingImage.png'
import img6 from '../assets/Rewards &MotivationImage.png'

/* ─── FEATURE CARDS DATA ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🧠',
    iconBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    title: 'Multisensory\nLearning',
    desc: 'Visual, audio & kinesthetic activities',
    accentColor: '#e91e63',
    popupImg: img1,
  },
  {
    icon: '🤝',
    iconBg: 'linear-gradient(135deg, #fff8e1, #ffecb3)',
    title: 'Cooperative\nGameplay',
    desc: 'Team up and solve challenges together',
    accentColor: '#f59e0b',
    popupImg: img2,
  },
  {
    icon: '⭐',
    iconBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
    title: 'Adaptive &\nPersonalized',
    desc: "Adjusts to each child's learning pace",
    accentColor: '#e91e63',
    popupImg: img3,
  },
  {
    icon: '🏆',
    iconBg: 'linear-gradient(135deg, #fff8e1, #ffe0b2)',
    title: 'Safe &\nEncouraging',
    desc: 'Built for a positive and inclusive experience',
    accentColor: '#f59e0b',
    popupImg: img4,
  },
  {
    icon: '📋',
    iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    title: 'Progress\nTracking',
    desc: 'Monitor growth and celebrate every win',
    accentColor: '#1976d2',
    popupImg: img5,
  },
  {
    icon: '🎁',
    iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    title: 'Rewards &\nMotivation',
    desc: 'Earn badges and unlock new adventures',
    accentColor: '#2e7d32',
    popupImg: img6,
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function FeaturesSection() {
  const [visible, setVisible] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
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
      id="features"
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
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionTopic number="03" title="Features" />

        {/* ── 3×2 FEATURE CARD GRID ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(12px, 2vw, 20px)',
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={i}
              {...f}
              visible={visible}
              delay={0.25 + i * 0.1}
              onClick={() => setSelectedFeature(f)}
            />
          ))}
        </div>

        {/* ── CHILDREN IMAGE AT BOTTOM ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'clamp(32px, 5vw, 48px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          <img
            src={childrenImg}
            alt="Happy children"
            style={{
              width: '100%',
              maxWidth: 'clamp(280px, 45vw, 520px)',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      </div>

      {/* ── IMAGE MODAL ── */}
      {selectedFeature && (
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
          onClick={() => setSelectedFeature(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: '#fff',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              animation: 'scaleIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFeature(null)}
              style={{
                position: 'absolute',
                top: 16, right: 16,
                width: 36, height: 36,
                borderRadius: '50%',
                border: 'none',
                background: 'transparent',
                color: 'transparent',
                fontSize: 28,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              ×
            </button>
            <img
              src={selectedFeature.popupImg}
              alt={selectedFeature.title.replace('\n', ' ')}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

/* ─── FEATURE CARD ───────────────────────────────────────────── */
function FeatureCard({ icon, iconBg, title, desc, accentColor, visible, delay, onClick }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: hov ? '#fafff9' : '#fff',
        border: `1.5px solid ${hov ? 'rgba(93,187,99,0.28)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 24,
        padding: 'clamp(14px, 2vw, 22px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 0,
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hov
          ? '0 10px 30px rgba(0,0,0,0.09)'
          : '0 2px 10px rgba(0,0,0,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        transitionProperty: 'opacity, transform, box-shadow, border-color, background',
        transitionDuration: `0.6s, ${hov ? '0.2s' : '0.6s'}, 0.2s, 0.2s, 0.2s`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}, 0s, 0s, 0s`,
        transitionTimingFunction: 'ease',
        minHeight: 180,
      }}
    >
      {/* Icon square */}
      <div style={{
        width: 'clamp(60px, 7vw, 80px)',
        height: 'clamp(60px, 7vw, 80px)',
        borderRadius: 18,
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(28px, 3.5vw, 38px)',
        marginBottom: 'clamp(10px, 1.5vw, 16px)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        transform: hov ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 0.25s ease',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Title */}
      <div style={{
        fontWeight: 700,
        fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
        color: '#1a2e1a',
        lineHeight: 1.25,
        marginBottom: 8,
        whiteSpace: 'pre-line',
      }}>
        {title}
      </div>

      {/* Description */}
      <div style={{
        fontWeight: 500,
        fontSize: 'clamp(0.72rem, 0.95vw, 0.82rem)',
        color: '#6b7b6b',
        lineHeight: 1.5,
        flex: 1,
      }}>
        {desc}
      </div>

      {/* Arrow button — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(10px, 1.5vw, 16px)',
          right: 'clamp(10px, 1.5vw, 16px)',
          width: 28, height: 28,
          borderRadius: '50%',
          border: `1.5px solid ${hov ? accentColor : 'rgba(0,0,0,0.15)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: hov ? accentColor : '#999',
          fontWeight: 700,
          background: hov ? `${accentColor}12` : 'transparent',
          transition: 'all 0.2s ease',
        }}
      >
        ›
      </div>
    </div>
  )
}
