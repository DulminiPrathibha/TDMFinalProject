import React from 'react';

const KEYFRAMES = `
  @keyframes flowerFloat1 {
    0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
    50% { transform: translateY(-6px) rotate(15deg) scale(1.05); }
  }
  @keyframes flowerFloat2 {
    0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
    50% { transform: translateY(6px) rotate(-15deg) scale(1.05); }
  }
`;

function PinkFlower({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="20" cy="20"
          rx="6" ry="11"
          fill="#f9a8c9"
          opacity="0.9"
          transform={`rotate(${deg} 20 20) translate(0 -9)`}
        />
      ))}
      <circle cx="20" cy="20" r="5" fill="#f472b6" />
      <circle cx="20" cy="20" r="2.5" fill="#fce7f3" />
    </svg>
  );
}

export default function SectionTopic({ number, title }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', width: '100%' }}>
      <style>{KEYFRAMES}</style>
      <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
        {/* Flowers */}
        <div style={{ position: 'absolute', top: -15, left: -40, animation: 'flowerFloat1 4s ease-in-out infinite' }}>
          <PinkFlower size={28} />
        </div>
        <div style={{ position: 'absolute', bottom: -10, left: -20, animation: 'flowerFloat2 5s ease-in-out infinite' }}>
          <PinkFlower size={24} />
        </div>
        <div style={{ position: 'absolute', top: -10, right: -35, animation: 'flowerFloat2 4.5s ease-in-out infinite' }}>
          <PinkFlower size={26} />
        </div>
        <div style={{ position: 'absolute', bottom: -15, right: -20, animation: 'flowerFloat1 5.5s ease-in-out infinite' }}>
          <PinkFlower size={22} />
        </div>
        
        {/* Text */}
        <h2 style={{ 
          fontFamily: "'Fredoka', sans-serif", 
          fontWeight: 700, 
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', 
          color: '#1B5E20',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <span style={{ color: 'inherit', fontSize: '0.85em' }}>{number}</span>
          {title}
        </h2>
      </div>
    </div>
  );
}
