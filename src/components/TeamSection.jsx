import { useState, useEffect, useRef } from 'react'
import SectionTopic from './SectionTopic'

/* ─── ASSET IMPORTS ───────────────────────────────────────────── */
// Banner (no teamsectionsmallbanner found; reusing the wooden-sign style via inline)
// Member card avatars
import kaviruCard      from '../assets/KaviruBandara.jpeg'
import prathibhaCard   from '../assets/PrathibhaSamarasekara.png'
import piyumalCard     from '../assets/PiyumalRanasinghe.jpeg'
import pesalaCard      from '../assets/PesalaGunasekara.jpg'
import dedulaCard      from '../assets/DidulaChamara.jpeg'
import kasunCard       from '../assets/KasunKarunananayaka.jpeg'
import nushkanCard     from '../assets/NushkanNisme.jpeg'

// Modal full images (first-name files)
import kaviruFull    from '../assets/kaviru.png'
import prathibhaFull from '../assets/prathibha.png'
import piyumalFull   from '../assets/piyumal.png'
import pesalaFull    from '../assets/pesala.png'

// Resource icons
import researchPaperIcon    from '../assets/researcpapericon.png'
import presentationIcon     from '../assets/presentationiconicon.png'
import researchProposalIcon from '../assets/researchproposalicon.png'

// Downloadable PDFs (Removed in favor of Google Drive links)

/* ─── TEAM DATA ───────────────────────────────────────────────── */
const RESEARCHERS = [
  {
    num: '01',
    name: 'Kaviru Bandara',
    role: 'Researcher',
    email: 'kavirumahim@gmail.com',
    avatarBg: '#d4edda',
    cardImg: kaviruCard,
    modalImg: kaviruFull,
    accentColor: '#2e7d32',
  },
  {
    num: '02',
    name: 'Prathibha Samarasekara',
    role: 'Researcher',
    email: 'dulminiprathibha@gmail.com',
    avatarBg: '#fde8d8',
    cardImg: prathibhaCard,
    modalImg: prathibhaFull,
    accentColor: '#e65100',
  },
  {
    num: '03',
    name: 'Piyumal Ranasinghe',
    role: 'Researcher',
    email: 'sadeepapiyumal530@gmail.com',
    avatarBg: '#d6eaf8',
    cardImg: piyumalCard,
    modalImg: piyumalFull,
    accentColor: '#1565c0',
  },
  {
    num: '04',
    name: 'Pesala Gunasekara',
    role: 'Researcher',
    email: 'pesalagunasekara@gmail.com',
    avatarBg: '#d5f5e3',
    cardImg: pesalaCard,
    modalImg: pesalaFull,
    accentColor: '#1b5e20',
  },
]

const SUPERVISORS = [
  {
    num: '05',
    name: 'Mr. Didula Chamara',
    role: 'Supervisor',
    email: 'didula.c@sliit.lk',
    avatarBg: '#fef9e7',
    cardImg: dedulaCard,
    modalImg: null,
    accentColor: '#f57f17',
  },
  {
    num: '06',
    name: 'Dr. Kasun Karunanayaka',
    role: 'Supervisor',
    email: 'ktk@ucsc.cmb.ac.lk',
    avatarBg: '#f0eff8',
    cardImg: kasunCard,
    modalImg: null,
    accentColor: '#4527a0',
  },
  {
    num: '07',
    name: 'Mr. Nushkan Nisme',
    role: 'Supervisor',
    email: 'nushkan.n@sliit.lk',
    avatarBg: '#e8f8f5',
    cardImg: nushkanCard,
    modalImg: null,
    accentColor: '#00695c',
  },
]

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function TeamSection() {
  const [visible, setVisible]     = useState(false)
  const [modalMember, setModal]   = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <section
        id="team"
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
        <SectionTopic number="07" title="Team" />

        {/* ══════════════════════════════════════════
            HEADER ROW: heading CENTER
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'clamp(28px, 4vw, 48px)',
          }}
        >

          {/* subtitle */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                color: '#5a6e5a',
                lineHeight: 1.65,
                margin: '0 auto',
                maxWidth: 520,
              }}
            >
              We're educators, designers, and dreamers working together<br />
              to make learning more inclusive, engaging, and effective for every child.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 1 — 4 RESEARCHERS
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(10px, 1.8vw, 18px)',
            marginBottom: 'clamp(10px, 1.8vw, 18px)',
          }}
        >
          {RESEARCHERS.map((m, i) => (
            <MemberCard
              key={m.num}
              member={m}
              visible={visible}
              delay={0.2 + i * 0.08}
              onMore={() => setModal(m)}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            ROW 2 — 3 SUPERVISORS (centred)
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(10px, 1.8vw, 18px)',
            maxWidth: '75%',
            margin: '0 auto',
          }}
        >
          {SUPERVISORS.map((m, i) => (
            <MemberCard
              key={m.num}
              member={m}
              visible={visible}
              delay={0.48 + i * 0.08}
              onMore={() => setModal(m)}
              isSupervisor
            />
          ))}
        </div>
      </div>

      </section>
      <ResourcesBlock visible={visible} />
      {modalMember && (
        <MemberModal member={modalMember} onClose={() => setModal(null)} />
      )}
    </>
  )
}

/* ─── RESOURCES BLOCK ────────────────────────────────────────── */
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
    file: 'https://drive.google.com/drive/folders/1Px4WdDl0dh0wM6VSBI3z48c-ewpsuphz?usp=drive_link',
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
    file: 'https://drive.google.com/drive/folders/1UN8t8E-AVD0hRfXUfo5KILihg-JL-Euk?usp=sharing',
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
    file: 'https://drive.google.com/drive/folders/1Z3Vr02Z88jj90uQCEUzEde0AVrZLqgh_?usp=drive_link',
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
    file: 'https://drive.google.com/drive/folders/1D7vYmpwsVI0wPTpLA9wynvD85jZSrCU1?usp=sharing',
    fileName: 'EthicalApproval.pdf',
  },
]

function ResourcesBlock({ visible }) {
  return (
    <div
      id="resources"
      style={{
        scrollMarginTop: '100px',
        background: '#fdf9f0',
        borderRadius: 28,
        boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        border: '1.5px solid rgba(93,187,99,0.12)',
        padding: 'clamp(28px, 3.5vw, 48px) clamp(20px, 4vw, 56px)',
        marginTop: 'clamp(20px, 2.5vw, 32px)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
      }}
    >

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 2.5vw, 36px)' }}>
        <h3 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
          color: '#1B5E20',
          margin: '0 0 6px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <span style={{ display: 'inline-block', animation: 'float 3.5s ease-in-out infinite' }}>🍃</span>
          08 Resources
          <span style={{ display: 'inline-block', animation: 'float 3.5s ease-in-out infinite 0.4s' }}>🍃</span>
        </h3>
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
          <ResourceCard key={r.id} resource={r} delay={0.55 + i * 0.07} visible={visible} />
        ))}
      </div>
    </div>
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
        download={file?.startsWith?.('http') ? undefined : fileName}
        target={file?.startsWith?.('http') ? '_blank' : undefined}
        rel={file?.startsWith?.('http') ? 'noopener noreferrer' : undefined}
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
          <path d="M7 1v8M3.5 6l3.5 4 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        {file?.startsWith?.('http') ? 'View' : 'Download'}
      </a>
    </div>
  )
}

/* ─── MEMBER CARD ─────────────────────────────────────────────── */

function MemberCard({ member, visible, delay, onMore, isSupervisor }) {
  const [hov, setHov] = useState(false)
  const { name, role, email, avatarBg, cardImg, accentColor } = member
  const isResearcher = role === 'Researcher'

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hov ? accentColor + '44' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 20,
        padding: 'clamp(14px, 1.8vw, 22px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 0,
        position: 'relative',
        boxShadow: hov ? `0 10px 30px ${accentColor}18` : '0 2px 12px rgba(0,0,0,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: `0.6s, ${hov ? '0.2s' : '0.6s'}, 0.2s, 0.2s`,
        transitionDelay: `${delay}s, ${hov ? '0s' : delay + 's'}, 0s, 0s`,
        transitionTimingFunction: 'ease',
      }}
    >


      {/* Avatar circle */}
      <div style={{
        width: 'clamp(100px, 11vw, 140px)',
        height: 'clamp(100px, 11vw, 140px)',
        borderRadius: '50%',
        background: avatarBg,
        overflow: 'hidden',
        marginBottom: 14,
        flexShrink: 0,
        border: `3px solid ${accentColor}35`,
        boxShadow: `0 6px 20px ${accentColor}28`,
      }}>
        <img
          src={cardImg}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(0.82rem, 1.15vw, 1rem)',
        color: '#1a2e1a',
        lineHeight: 1.25,
        marginBottom: 3,
      }}>
        {name}
      </div>

      {/* Role badge */}
      <div style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
        color: isResearcher ? '#2e7d32' : '#f57f17',
        marginBottom: 10,
      }}>
        {role}
      </div>

      {/* Email row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 14,
      }}>
        {/* Envelope icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
          <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#9e9e9e" strokeWidth="1.2" fill="none"/>
          <polyline points="1,3 7,8 13,3" stroke="#9e9e9e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(0.64rem, 0.85vw, 0.76rem)',
          color: '#666',
          lineHeight: 1.4,
          wordBreak: 'break-all',
        }}>
          {email}
        </span>
      </div>

      {/* More button — only for researchers */}
      {!isSupervisor && (
        <button
          onClick={onMore}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: hov ? 'rgba(46,125,50,0.07)' : 'transparent',
            border: `1.5px solid ${hov ? '#1b5e20' : '#2e7d32'}`,
            borderRadius: 24,
            padding: '5px 14px',
            cursor: 'pointer',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(0.72rem, 0.92vw, 0.82rem)',
            color: hov ? '#1b5e20' : '#2e7d32',
            transition: 'all 0.2s ease',
          }}
        >
          Contribution
          <span style={{ fontSize: 11, marginLeft: 4 }}>🍃</span>
        </button>
      )}
    </div>
  )
}

/* ─── MEMBER MODAL ────────────────────────────────────────────── */
function MemberModal({ member, onClose }) {
  const { name, modalImg, accentColor, avatarBg } = member

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.60)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          animation: 'fadeIn 0.25s ease',
        }}
      >
        {/* Image container — clicking it won't close */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            animation: 'slideUp 0.3s ease',
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: `0 32px 100px rgba(0,0,0,0.40)`,
            background: avatarBg,
            maxWidth: 820,
            width: '95vw',
            maxHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12, right: 12,
              width: 34, height: 34,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0,0,0,0.45)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: '#fff',
              lineHeight: 1,
              zIndex: 2,
              transition: 'background 0.2s ease',
            }}
          >
            ×
          </button>

          {/* Full illustration image */}
          <img
            src={modalImg}
            alt={name}
            style={{
              width: '100%',
              maxHeight: '90vh',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </>
  )
}

/* ─── FLOATING DECORATIONS ────────────────────────────────────── */
function FloatingDeco({ visible }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '50%', height: 160,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease 0.3s',
      }}
    >
      <svg style={{ position: 'absolute', top: 12, right: '28%', opacity: 0.55 }}
        width="130" height="75" viewBox="0 0 130 75" fill="none">
        <path d="M5 65 Q50 5 125 22" stroke="#f4a137" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" fill="none" />
        <text x="123" y="26" fontSize="11" fill="#f4a137" textAnchor="middle">♡</text>
      </svg>
      <span style={{ position: 'absolute', top: 14, right: '7%', fontSize: 'clamp(20px, 2.6vw, 32px)', animation: 'float 4s ease-in-out 0.5s infinite', display: 'inline-block' }}>✈️</span>
      <span style={{ position: 'absolute', top: 18, right: '40%', fontSize: 'clamp(22px, 2.8vw, 36px)', animation: 'float 5s ease-in-out infinite', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))' }}>☁️</span>
      <span style={{ position: 'absolute', top: 60, right: '18%', fontSize: 'clamp(18px, 2.2vw, 28px)', animation: 'float 6s ease-in-out 1s infinite', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))' }}>☁️</span>
      <span style={{ position: 'absolute', top: 44, right: '32%', fontSize: 14, color: '#f59e0b', animation: 'float 3.5s ease-in-out 0.8s infinite' }}>✦</span>
      <span style={{ position: 'absolute', top: 95, right: '22%', fontSize: 10, color: '#F47AB0', animation: 'float 4.5s ease-in-out 1.2s infinite' }}>✦</span>
      <span style={{ position: 'absolute', top: 35, right: '14%', fontSize: 14, animation: 'float 5.5s ease-in-out 1.5s infinite', display: 'inline-block', transform: 'rotate(-20deg)' }}>🍃</span>
      <span style={{ position: 'absolute', top: 80, right: '46%', fontSize: 12, animation: 'float 4.2s ease-in-out 0.7s infinite', display: 'inline-block', transform: 'rotate(15deg)' }}>🍃</span>
    </div>
  )
}
