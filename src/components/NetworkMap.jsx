import { chapters, networkConnections } from '../data/chapters';

const CX = 350, CY = 350, R = 275;

function pos(i, total) {
  const a = (2 * Math.PI * i) / total - Math.PI / 2;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
}

export default function NetworkMap({ setPage, setCurrentChapter }) {
  const total = chapters.length;
  const positions = chapters.map((_, i) => pos(i, total));

  function open(id) {
    setCurrentChapter(id);
    setPage('lesson');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page-container">
      <div className="network-page">
        <h1>The Moral Network</h1>
        <p>All 20 moral pillars connected — click any node to go to that lesson.</p>

        <div className="network-svg-wrap">
          <svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
            <rect width="700" height="700" fill="#0f0f1a" />
            <circle cx={CX} cy={CY} r={R + 15} fill="none" stroke="rgba(200,151,31,0.07)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={R / 2} fill="none" stroke="rgba(200,151,31,0.05)" strokeWidth="1" />

            <text x={CX} y={CY - 8} textAnchor="middle" fill="rgba(200,151,31,0.5)" fontSize="11" fontWeight="800" letterSpacing="3">MVFN</text>
            <text x={CX} y={CY + 8} textAnchor="middle" fill="rgba(200,151,31,0.25)" fontSize="7.5" letterSpacing="1.5">MORAL IS THE LEADER</text>

            {/* Connections */}
            {networkConnections.map(([a, b], i) => (
              <line key={i}
                x1={positions[a].x} y1={positions[a].y}
                x2={positions[b].x} y2={positions[b].y}
                stroke="rgba(200,151,31,0.15)" strokeWidth="1"
              />
            ))}

            {/* Spokes */}
            {chapters.map((_, i) => (
              <line key={`sp${i}`}
                x1={CX} y1={CY}
                x2={positions[i].x} y2={positions[i].y}
                stroke="rgba(200,151,31,0.05)" strokeWidth="0.75"
              />
            ))}

            {/* Nodes */}
            {chapters.map((ch, i) => {
              const p = positions[i];
              const la = (2 * Math.PI * i) / total - Math.PI / 2;
              const lR = R + 34;
              const lx = CX + lR * Math.cos(la);
              const ly = CY + lR * Math.sin(la);
              const anchor = Math.abs(lx - CX) < 15 ? 'middle' : lx > CX ? 'start' : 'end';

              return (
                <g key={ch.id} className="node-g" onClick={() => open(ch.id)}>
                  <circle cx={p.x} cy={p.y} r={19} fill={ch.color} opacity="0.22" />
                  <circle cx={p.x} cy={p.y} r={14} fill={ch.color} />
                  <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="11">{ch.icon}</text>
                  <text x={lx} y={ly + 4} textAnchor={anchor} fill="#c0c0c0" fontSize="8.5" fontWeight="600">
                    {ch.title.replace('Moral ', '')}
                  </text>
                </g>
              );
            })}

            <circle cx={CX} cy={CY} r={5} fill="#c8971f" opacity="0.9" />
          </svg>
        </div>

        {/* Quick index */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
          gap: '0.65rem',
        }}>
          {chapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => open(ch.id)}
              style={{
                background: '#fff',
                border: `1.5px solid ${ch.color}30`,
                borderRadius: '10px',
                padding: '0.7rem 0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ch.accent; e.currentTarget.style.background = `${ch.color}0d`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${ch.color}30`; e.currentTarget.style.background = '#fff'; }}
            >
              <span style={{ fontSize: '1.15rem' }}>{ch.icon}</span>
              <div>
                <div style={{ fontSize: '0.62rem', color: ch.accent, fontWeight: 700 }}>Ch.{ch.number}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2 }}>{ch.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
