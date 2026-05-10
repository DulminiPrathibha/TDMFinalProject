import { useState, useEffect, useRef } from 'react'
import letterBox from '../assets/LetterBox.png'
import SectionTopic from './SectionTopic'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbw2e9ka9qMwlpTSY-I8M_Hn_6xlf9VwQYuKbaZKnGTPUJ6_AhPo2io5tzdJeLMD7uFi4Q/exec'

/* ── tiny helpers ── */
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#2e7d32" strokeWidth="1.5" fill="none"/>
        <polyline points="2,4.5 10,11 18,4.5" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Email',
    valuePrimary: 'thewordgarden421@gmail.com',
    valueSecondary: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="#2e7d32" strokeWidth="1.5" fill="none"/>
        <circle cx="10" cy="7" r="1.8" stroke="#2e7d32" strokeWidth="1.3" fill="none"/>
      </svg>
    ),
    label: 'Institution',
    valuePrimary: 'Sri Lanka Institute of Information Technology (SLIIT)',
    valueSecondary: 'New Kandy Road, Malabe, Sri Lanka',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="7" r="3" stroke="#2e7d32" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="7" r="3" stroke="#2e7d32" strokeWidth="1.5" fill="none"/>
        <path d="M2 18c0-2.76 2.24-5 5-5h6c2.76 0 5 2.24 5 5" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    label: 'Team',
    valuePrimary: 'Team Word Garden',
    valueSecondary: 'Cultivating Literacy in an Emotionally Safe World',
  },
]

/* ══════════════════════════════════════════════════════════════ */
export default function ContactUsSection() {
  const [visible, setVisible] = useState(false)
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [focus, setFocus]     = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  /* ── validation ── */
  const validate = () => {
    const e = {}
    if (!form.name.trim())             e.name    = 'Name is required'
    if (!form.email.trim())            e.email   = 'Email is required'
    else if (!isEmail(form.email))     e.email   = 'Enter a valid email'
    if (!form.subject.trim())          e.subject = 'Subject is required'
    if (!form.message.trim())          e.message = 'Message is required'
    return e
  }

  /* ── submit ── */
  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const ch = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  /* ── input style ── */
  const inp = name => ({
    width: '100%', boxSizing: 'border-box',
    fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: '0.95rem',
    color: '#1a2e1a', background: '#f8fdf8',
    border: `1.5px solid ${errors[name] ? '#e53935' : focus === name ? '#2e7d32' : '#d4e8d4'}`,
    borderRadius: 12, padding: '11px 14px 11px 40px',
    outline: 'none',
    boxShadow: focus === name ? '0 0 0 3px rgba(46,125,50,0.1)' : 'none',
    transition: 'all 0.2s ease',
  })

  return (
    <section
      id="contact-us"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #fce4ec 0%, #e8f5e9 100%)',
        padding: 'clamp(48px, 7vw, 90px) clamp(16px, 5vw, 80px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* ── Background bokeh blobs ── */}
      {[
        { w:320, h:320, t:'5%',  l:'-6%',  c:'rgba(46,125,50,0.06)' },
        { w:260, h:260, t:'60%', r:'-5%',  c:'rgba(91,164,207,0.07)' },
        { w:180, h:180, t:'30%', l:'45%',  c:'rgba(244,161,55,0.06)' },
      ].map((b,i) => (
        <div key={i} style={{
          position:'absolute', top:b.t, left:b.l, right:b.r,
          width:b.w, height:b.h, borderRadius:'50%',
          background:b.c, filter:'blur(48px)', pointerEvents:'none', zIndex:0,
          animation:`blobDrift ${6+i*2}s ${i*1.5}s ease-in-out infinite alternate`,
        }}/>
      ))}

      {/* ── Floating dots ── */}
      {['#5DBB63','#F4A137','#5BA4CF','#c084fc','#f472b6'].map((c,i) => (
        <div key={i} style={{
          position:'absolute',
          top:`${10+i*16}%`, left:`${5+i*18}%`,
          width: 8+i%3*3, height: 8+i%3*3,
          borderRadius:'50%', background:c, opacity:0.35,
          pointerEvents:'none', zIndex:0,
          animation:`floatDot ${4+i}s ${i*0.8}s ease-in-out infinite alternate`,
        }}/>
      ))}

      {/* ══ HEADING ══ */}
      <div style={{
        textAlign:'center', marginBottom:'clamp(32px,5vw,56px)',
        position:'relative', zIndex:1,
        opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(22px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <SectionTopic number="09" title="Contact Us" />

        <p style={{
          fontFamily:"'Fredoka', sans-serif", fontWeight:500,
          fontSize:'clamp(0.9rem,1.3vw,1.05rem)', color:'#5a7a5a', margin:0, lineHeight:1.7,
        }}>
          We'd love to hear from you! Send us a message<br/>
          and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* ══ TOAST ══ */}
      {(status === 'success' || status === 'error') && (
        <div style={{
          position:'fixed', bottom:32, right:32, zIndex:999,
          padding:'14px 24px', borderRadius:16,
          background: status==='success' ? 'linear-gradient(135deg,#43a047,#1b5e20)' : '#c62828',
          color:'#fff', fontFamily:"'Fredoka', sans-serif", fontWeight:700,
          fontSize:'1rem', boxShadow:'0 8px 32px rgba(0,0,0,0.22)',
          animation:'toastIn 0.35s ease',
          display:'flex', alignItems:'center', gap:10,
        }}>
          {status==='success' ? '✅ Message sent successfully!' : '❌ Something went wrong. Please try again.'}
        </div>
      )}

      {/* ══ TWO-COL GRID ══ */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr minmax(280px,400px)',
        gap:'clamp(16px,2.5vw,28px)',
        maxWidth:1080, margin:'0 auto',
        position:'relative', zIndex:1,
        opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(28px)',
        transition:'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s',
      }}>

        {/* ── LEFT: FORM CARD ── */}
        <div style={{
          background:'rgba(255,255,255,0.82)',
          backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
          borderRadius:24, padding:'clamp(20px,3vw,32px)',
          boxShadow:'0 8px 40px rgba(46,125,50,0.1), 0 2px 12px rgba(0,0,0,0.05)',
          border:'1.5px solid rgba(93,187,99,0.18)',
        }}>
          <form onSubmit={handleSubmit} noValidate style={{display:'flex',flexDirection:'column',gap:14}}>

            {/* Name + Email row */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <Field label="Your Name" icon={personIcon} error={errors.name}>
                <input name="name" value={form.name} onChange={ch}
                  onFocus={()=>setFocus('name')} onBlur={()=>setFocus('')}
                  placeholder="Enter your name" style={inp('name')}/>
              </Field>
              <Field label="Email Address" icon={emailIcon} error={errors.email}>
                <input name="email" type="email" value={form.email} onChange={ch}
                  onFocus={()=>setFocus('email')} onBlur={()=>setFocus('')}
                  placeholder="Enter your email" style={inp('email')}/>
              </Field>
            </div>

            {/* Subject */}
            <Field label="Subject" icon={subjectIcon} error={errors.subject}>
              <input name="subject" value={form.subject} onChange={ch}
                onFocus={()=>setFocus('subject')} onBlur={()=>setFocus('')}
                placeholder="Enter the subject" style={inp('subject')}/>
            </Field>

            {/* Message */}
            <Field label="Message or Query" icon={msgIcon} error={errors.message}>
              <textarea name="message" value={form.message} onChange={ch} rows={4}
                onFocus={()=>setFocus('message')} onBlur={()=>setFocus('')}
                placeholder="Type your message here..."
                style={{...inp('message'), resize:'vertical', minHeight:88}}/>
            </Field>

            {/* Submit */}
            <button type="submit" disabled={status==='loading'} style={{
              padding:'13px 0', borderRadius:14, border:'none', cursor:'pointer',
              background: status==='loading'
                ? 'linear-gradient(135deg,#81c784,#43a047)'
                : 'linear-gradient(135deg,#2e7d32,#1a5c20)',
              color:'#fff', fontFamily:"'Fredoka', sans-serif", fontWeight:700,
              fontSize:'1.05rem', display:'flex', alignItems:'center',
              justifyContent:'center', gap:10,
              boxShadow:'0 6px 20px rgba(46,125,50,0.32)',
              transition:'all 0.22s ease',
              opacity: status==='loading' ? 0.85 : 1,
            }}
              onMouseEnter={e=>{ if(status!=='loading'){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(46,125,50,0.42)' }}}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(46,125,50,0.32)' }}
            >
              {status==='loading' ? (
                <><Spinner/> Sending…</>
              ) : (
                <>Send Message <PaperPlane/></>
              )}
            </button>
          </form>
        </div>

        {/* ── RIGHT: INFO CARD ── */}
        <div style={{
          background:'rgba(255,255,255,0.82)',
          backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
          borderRadius:24, padding:'clamp(20px,3vw,32px)',
          boxShadow:'0 8px 40px rgba(46,125,50,0.1), 0 2px 12px rgba(0,0,0,0.05)',
          border:'1.5px solid rgba(93,187,99,0.18)',
          display:'flex', flexDirection:'column',
        }}>
          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'#fef9e7', border:'1.5px solid #f4d56a',
            borderRadius:50, padding:'7px 16px', marginBottom:20, alignSelf:'flex-start',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="12" rx="2.5" stroke="#c8a000" strokeWidth="1.3" fill="none"/>
              <circle cx="5.5" cy="8" r="1" fill="#c8a000"/>
              <circle cx="8"   cy="8" r="1" fill="#c8a000"/>
              <circle cx="10.5" cy="8" r="1" fill="#c8a000"/>
            </svg>
            <span style={{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:'0.88rem',color:'#8a6500'}}>
              General Contact Info
            </span>
          </div>

          {/* Info rows */}
          <div style={{display:'flex',flexDirection:'column',gap:0,flexGrow:1}}>
            {CONTACT_ITEMS.map((item,i) => (
              <div key={i}>
                <div style={{display:'flex',alignItems:'flex-start',gap:12,paddingBottom:12}}>
                  <div style={{
                    width:40,height:40,borderRadius:'50%',background:'#e8f5e9',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                    boxShadow:'0 3px 10px rgba(46,125,50,0.12)',
                  }}>{item.icon}</div>
                  <div>
                    <div style={{fontFamily:"'Fredoka', sans-serif",fontWeight:600,
                      fontSize:'0.68rem',color:'#aaa',letterSpacing:'0.08em',marginBottom:2}}>
                      {item.label.toUpperCase()}
                    </div>
                    <div style={{fontFamily:"'Fredoka', sans-serif",fontWeight:700,
                      fontSize:'0.9rem',color:'#1a2e1a',lineHeight:1.45}}>
                      {item.valuePrimary}
                    </div>
                    {item.valueSecondary && (
                      <div style={{fontFamily:"'Fredoka', sans-serif",fontWeight:500,
                        fontSize:'0.78rem',color:'#888',lineHeight:1.4,marginTop:2}}>
                        {item.valueSecondary}
                      </div>
                    )}
                  </div>
                </div>
                {i < CONTACT_ITEMS.length-1 && (
                  <hr style={{border:'none',borderTop:'1px solid #f0ece0',margin:'0 0 12px'}}/>
                )}
              </div>
            ))}
          </div>

          {/* LetterBox */}
          <div style={{display:'flex',justifyContent:'center',paddingTop:16}}>
            <img src={letterBox} alt="Letter box"
              style={{width:'clamp(130px,18vw,200px)',display:'block',
                filter:'drop-shadow(0 8px 20px rgba(0,0,0,0.13))',userSelect:'none',pointerEvents:'none'}}/>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes blobDrift { from{transform:translate(0,0) scale(1)} to{transform:translate(18px,12px) scale(1.06)} }
        @keyframes floatDot  { from{transform:translateY(0)} to{transform:translateY(-12px)} }
        @keyframes toastIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @media(max-width:680px){
          #contact-us [style*="grid-template-columns: 1fr minmax"]{grid-template-columns:1fr!important}
          #contact-us [style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}

/* ── Field wrapper ── */
function Field({ label, icon, error, children }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5}}>
      <label style={{fontFamily:"'Fredoka', sans-serif",fontWeight:700,fontSize:'0.88rem',color:'#2e7d32',display:'flex',alignItems:'center',gap:6}}>
        {icon} {label}
      </label>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',opacity:0.6,lineHeight:0,zIndex:1}}>
          {icon}
        </div>
        {children}
      </div>
      {error && <span style={{fontFamily:"'Fredoka', sans-serif",fontSize:'0.75rem',color:'#e53935',fontWeight:600}}>{error}</span>}
    </div>
  )
}

/* ── Inline SVG icons ── */
const personIcon = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="5" r="2.8" stroke="#2e7d32" strokeWidth="1.3" fill="none"/>
    <path d="M2 13c0-3.04 2.46-5.5 5.5-5.5S13 9.96 13 13" stroke="#2e7d32" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
)
const emailIcon = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="3" width="13" height="9" rx="2" stroke="#2e7d32" strokeWidth="1.3" fill="none"/>
    <polyline points="1,3.5 7.5,9 14,3.5" stroke="#2e7d32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const subjectIcon = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="2" width="13" height="11" rx="2" stroke="#2e7d32" strokeWidth="1.3" fill="none"/>
    <line x1="4" y1="6" x2="11" y2="6" stroke="#2e7d32" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4" y1="9" x2="9"  y2="9" stroke="#2e7d32" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)
const msgIcon = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="2" width="13" height="11" rx="2" stroke="#2e7d32" strokeWidth="1.3" fill="none"/>
    <circle cx="5" cy="7.5" r="0.9" fill="#2e7d32"/>
    <circle cx="7.5" cy="7.5" r="0.9" fill="#2e7d32"/>
    <circle cx="10" cy="7.5" r="0.9" fill="#2e7d32"/>
  </svg>
)

/* ── Spinner ── */
function Spinner() {
  return (
    <span style={{
      display:'inline-block', width:18, height:18,
      border:'2.5px solid rgba(255,255,255,0.35)',
      borderTopColor:'#fff', borderRadius:'50%',
      animation:'spin 0.75s linear infinite',
    }}/>
  )
}

/* ── Paper Plane icon ── */
function PaperPlane() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 9L16 2L10 16L8.5 10.5L2 9Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
      <line x1="8.5" y1="10.5" x2="16" y2="2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
