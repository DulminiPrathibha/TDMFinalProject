import React, { useState, useRef, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'

import ResearchSection from './components/ResearchSection'
import CommercializationSection from './components/CommercializationSection'
import TeamSection from './components/TeamSection'
import DemoSection from './components/DemoSection'
import ResourcesSection from './components/ResourcesSection'
import ContactUsSection from './components/ContactUsSection'
import bgAudio from './assets/Audio.mp3'

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Autoplay attempt on mount (often blocked by browser until interaction)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        // Autoplay was prevented by the browser. User must click play.
        console.log("Autoplay prevented:", err)
      })
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="w-full" style={{ background: '#f6f3ea', position: 'relative' }}>
      {/* ── Background Audio ── */}
      <audio ref={audioRef} src={bgAudio} loop />
      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: isPlaying ? '#2e7d32' : '#e0e0e0',
          border: `2px solid ${isPlaying ? '#1b5e20' : '#ccc'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <span style={{ fontSize: '20px' }}>{isPlaying ? '🔊' : '🔈'}</span>
      </button>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />


      {/* Placeholder sections — replace with real components when built */}
      <ResearchSection />
      <CommercializationSection />
      <TeamSection />
      <DemoSection />
      <ResourcesSection />
      <ContactUsSection />

      {/* ── Footer ── */}
      <footer style={{
        background: '#f6f3ea',
        borderTop: '1px solid rgba(180,160,120,0.18)',
        padding: '14px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '0.78rem',
          color: 'rgba(139,115,75,0.72)',
          margin: '0 0 3px',
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}>
          Multi-Device Cooperative Game Architecture for Emotionally Safe Dyslexia Intervention.
        </p>
        <p style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '0.78rem',
          color: 'rgba(139,115,75,0.72)',
          margin: 0,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}>
          © 2026 The Word Garden Research Group, Built for final year research evaluation.
        </p>
      </footer>
    </div>
  )
}