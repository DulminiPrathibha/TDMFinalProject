import { useState, useEffect, useRef } from 'react'
import SectionTopic from './SectionTopic'

/* ─── RESOURCES DATA ─────────────────────────────────────────── */
import researchPaperIcon from '../assets/researcpapericon.png'
import presentationIcon from '../assets/presentationiconicon.png'
import researchProposalIcon from '../assets/researchproposalicon.png'

import projectProposalPdf from '../assets/ProjectProposal.pdf'
import researchPaperPdf from '../assets/ResearchPaper.pdf'
import ethicalApprovalPdf from '../assets/ethicalapproval.pdf'
import presentationPdf from '../assets/presentation.pdf'

const RESOURCES = [
  {
    id: 'research-paper',
    label: 'Research Paper',
    iconImg: researchPaperIcon,
    iconBg: '#e8f5e9',
    accentColor: '#2e7d32',
    btnBg: '#e8f5e9',
    btnBorder: '#2e7d32',
    btnColor: '#2e7d32',
    file: researchPaperPdf,
    fileName: 'ResearchPaper.pdf',
  },
  {
    id: 'presentation',
    label: 'Presentation',
    iconImg: presentationIcon,
    iconBg: '#ede7f6',
    accentColor: '#6a1b9a',
    btnBg: '#ede7f6',
    btnBorder: '#6a1b9a',
    btnColor: '#6a1b9a',
    file: presentationPdf,
    fileName: 'Presentation.pdf',
  },
  {
    id: 'research-proposal',
    label: 'Project Proposal',
    iconImg: researchProposalIcon,
    iconBg: '#e3f2fd',
    accentColor: '#1565c0',
    btnBg: '#e3f2fd',
    btnBorder: '#1565c0',
    btnColor: '#1565c0',
    file: projectProposalPdf,
    fileName: 'ProjectProposal.pdf',
  },
  {
    id: 'ethical-approval',
    label: 'Ethical Approval',
    iconImg: null, // no icon asset — use inline SVG
    iconBg: '#fff3e0',
    accentColor: '#e65100',
    btnBg: '#fff3e0',
    btnBorder: '#e65100',
    btnColor: '#e65100',
    file: ethicalApprovalPdf,
    fileName: 'EthicalApproval.pdf',
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function ResourcesSection() {
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
      id="resources" 
      ref={ref}
      style={{
        padding: '0 clamp(16px, 5vw, 80px) clamp(40px, 6vw, 80px)',
        background: '#f6f3ea',
      }}
    >
      <div
        style={{
          scrollMarginTop: '100px',
          background: '#fdf9f0',
          borderRadius: 28,
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
          border: '1.5px solid rgba(93,187,99,0.12)',
          padding: 'clamp(28px, 3.5vw, 48px) clamp(20px, 4vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 2.5vw, 36px)' }}>
          <SectionTopic number="09" title="Resources" />
          <p style={{
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
            color: '#7a8a7a',
            margin: 0,
          }}>
            Access and download important documents
          </p>
        </div>

        {/* 4-column resource grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 2vw, 24px)',
          position: 'relative',
          zIndex: 1,
        }}>
          {RESOURCES.map((r, i) => (
            <ResourceCard key={r.id} resource={r} delay={0.15 + i * 0.07} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ResourceCard({ resource, visible, delay }) {
  const [hov, setHov] = useState(false)
  const { label, iconImg, iconBg, accentColor, btnBg, btnBorder, btnColor, file, fileName } = resource

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hov ? accentColor + '55' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 20,
        padding: 'clamp(16px, 2vw, 24px) clamp(12px, 1.5vw, 20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        boxShadow: hov ? `0 10px 28px ${accentColor}22` : '0 2px 12px rgba(0,0,0,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(20px)',
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: `0.6s, ${hov ? '0.2s' : '0.6s'}, 0.2s, 0.2s`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}, 0s, 0s`,
        transitionTimingFunction: 'ease',
        cursor: 'default',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 'clamp(64px, 7vw, 90px)',
        height: 'clamp(64px, 7vw, 90px)',
        borderRadius: '50%',
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 16px ${accentColor}22`,
        transform: hov ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 0.25s ease',
        flexShrink: 0,
      }}>
        {iconImg ? (
          <img src={iconImg} alt={label}
            style={{ width: '72%', height: '72%', objectFit: 'contain' }} />
        ) : (
          /* Inline shield + checkmark for Ethical Approval */
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4 L38 10 L38 24 Q38 36 24 44 Q10 36 10 24 L10 10 Z"
              fill="url(#shieldGrad)" />
            <polyline points="17,24 22,30 32,18"
              stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <defs>
              <linearGradient id="shieldGrad" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffb74d" />
                <stop offset="1" stopColor="#e65100" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
        color: '#1a2e1a',
        textAlign: 'center',
        lineHeight: 1.25,
      }}>
        {label}
      </div>

      {/* Download button */}
      <a
        href={file}
        download={fileName}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: hov ? accentColor : btnBg,
          border: `1.5px solid ${btnBorder}`,
          borderRadius: 24,
          padding: '7px 18px',
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.75rem, 0.95vw, 0.88rem)',
          color: hov ? '#fff' : btnColor,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M3.5 6l3.5 4 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Download
      </a>
    </div>
  )
}
