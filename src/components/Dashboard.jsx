import { chapters } from '../data/chapters';
import { mockPosts, mockUsers } from '../data/mockData';
import { makeT } from '../i18n/index';

const RED   = '#CC0000';
const GOLD  = '#FFD100';
const GREEN = '#009B3A';

export default function Dashboard({ completedLessons, setPage, setCurrentChapter, lang = 'en' }) {
  const T = makeT(lang);
  const pct = Math.round((completedLessons.size / chapters.length) * 100);
  const nextLesson = chapters.find(c => !completedLessons.has(c.id)) || chapters[0];
  const recentPosts = mockPosts.slice(0, 3);

  function goLesson(ch) {
    setCurrentChapter(ch.id);
    setPage('lesson');
  }

  return (
    <div>
      {/* ── TRI-COLOR HERO ── */}
      <div className="dash-hero">
        {/* Three-stripe bar */}
        <div className="dash-stripe-bar">
          <div style={{ flex: 1, background: GREEN }} />
          <div style={{ flex: 1, background: GOLD  }} />
          <div style={{ flex: 1, background: RED   }} />
        </div>

        <div className="dash-hero-inner">
          {/* Logo mark */}
          <div className="dash-logo-ring">
            <span className="dash-logo-text">MVFN</span>
          </div>

          <h1 className="dash-hero-title">
            Moral Value<br />
            <span style={{ color: GOLD }}>Foundation Network</span>
          </h1>

          <p className="dash-hero-tagline">
            <span style={{ color: GREEN }}>■</span>
            &nbsp;{T('dash_tagline')}&nbsp;
            <span style={{ color: RED }}>■</span>
          </p>

          <p className="dash-hero-sub">
            {T('dash_sub')}{' '}
            {chapters.length - completedLessons.size > 0
              ? T('dash_remaining', chapters.length - completedLessons.size)
              : T('dash_all_done')}
          </p>

          {/* CTA buttons */}
          <div className="dash-hero-btns">
            <button
              className="dash-hero-btn-primary"
              onClick={() => goLesson(nextLesson)}
              style={{ background: GREEN }}
            >
              {T('dash_btn_learn')}
            </button>
            <button
              className="dash-hero-btn-secondary"
              onClick={() => setPage('community')}
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {T('dash_btn_community')}
            </button>
          </div>
        </div>

        {/* Bottom stripe bar */}
        <div className="dash-stripe-bar">
          <div style={{ flex: 1, background: RED   }} />
          <div style={{ flex: 1, background: GOLD  }} />
          <div style={{ flex: 1, background: GREEN }} />
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="page-container">

        {/* Stats */}
        <div className="dash-grid" style={{ marginBottom: '2.25rem' }}>
          <div className="dash-stat-card" style={{ borderTop: `4px solid ${GREEN}` }}>
            <div className="ds-number" style={{ color: GREEN }}>{completedLessons.size}</div>
            <div className="ds-label">{T('dash_lessons_done')}</div>
          </div>
          <div className="dash-stat-card" style={{ borderTop: `4px solid ${GOLD}` }}>
            <div className="ds-number" style={{ color: '#b89000' }}>{pct}%</div>
            <div className="ds-label">{T('dash_progress')}</div>
          </div>
          <div className="dash-stat-card" style={{ borderTop: `4px solid ${RED}` }}>
            <div className="ds-number" style={{ color: RED }}>{mockPosts.length}</div>
            <div className="ds-label">{T('dash_posts')}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem',
          marginBottom: '2rem', border: '1px solid #e8e4d8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a2e' }}>{T('dash_journey')}</span>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#b89000' }}>{pct}%</span>
          </div>
          <div style={{ background: '#f0ede0', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`, borderRadius: '6px', transition: 'width 0.4s',
              background: `linear-gradient(90deg, ${GREEN}, ${GOLD}, ${RED})`,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: GREEN, fontWeight: 700 }}>● Start</span>
            <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{completedLessons.size} of {chapters.length} lessons</span>
            <span style={{ fontSize: '0.75rem', color: RED, fontWeight: 700 }}>Goal ●</span>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="dash-section-title">📖 Continue Learning</div>
        <div
          className="dash-continue-card"
          onClick={() => goLesson(nextLesson)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && goLesson(nextLesson)}
          style={{ borderLeft: `5px solid ${GREEN}` }}
        >
          <div className="dcc-icon" style={{ background: `${nextLesson.color}22`, color: nextLesson.color }}>
            {nextLesson.icon}
          </div>
          <div className="dcc-meta">
            <div className="dcc-label" style={{ color: GREEN }}>Next Lesson · Chapter {nextLesson.number}</div>
            <div className="dcc-title">{nextLesson.title}</div>
            <div className="dcc-sub">{nextLesson.subtitle} · {nextLesson.duration}</div>
          </div>
          <button className="dcc-btn" style={{ background: GREEN }}>Start →</button>
        </div>

        {/* 20 Pillars mini grid */}
        <div className="dash-section-title">🌍 All 20 Moral Pillars</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(138px, 1fr))',
          gap: '0.65rem',
          marginBottom: '2.5rem',
        }}>
          {chapters.map((ch, i) => {
            const done = completedLessons.has(ch.id);
            const stripe = i % 3 === 0 ? GREEN : i % 3 === 1 ? GOLD : RED;
            return (
              <button
                key={ch.id}
                onClick={() => goLesson(ch)}
                style={{
                  background: done ? `${stripe}12` : '#fff',
                  border: `1.5px solid ${done ? stripe : '#e8e4d8'}`,
                  borderTop: `3px solid ${stripe}`,
                  borderRadius: '10px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = stripe; e.currentTarget.style.boxShadow = `0 4px 12px ${stripe}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = done ? stripe : '#e8e4d8'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: '1.1rem' }}>{ch.icon}</span>
                <div>
                  <div style={{ fontSize: '0.62rem', color: stripe, fontWeight: 700 }}>Ch.{ch.number}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2 }}>
                    {ch.title.replace('Moral ', '')}
                  </div>
                  {done && <div style={{ fontSize: '0.62rem', color: stripe }}>✓ Done</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Community Highlights */}
        <div className="dash-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>💬 Community Highlights</span>
          <button
            onClick={() => setPage('community')}
            style={{ background: 'none', color: RED, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', border: 'none' }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentPosts.map((post, i) => {
            const user = mockUsers.find(u => u.id === post.userId);
            const accent = i % 3 === 0 ? GREEN : i % 3 === 1 ? GOLD : RED;
            return (
              <div key={post.id} className="post-card" style={{ borderLeft: `4px solid ${accent}` }}>
                <div className="post-header">
                  <div className="post-avatar">{user?.avatar}</div>
                  <div className="post-user-info">
                    <div className="post-name">{user?.name}</div>
                    <div className="post-handle">@{user?.handle}</div>
                  </div>
                  <span className="post-chapter-tag" style={{ background: `${accent}18`, color: accent }}>
                    #{post.chapterTitle.replace(/ /g, '')}
                  </span>
                </div>
                <p className="post-text">{post.text.slice(0, 160)}…</p>
                <div className="post-actions">
                  <span className="post-action-btn">❤ {post.likes}</span>
                  <span className="post-action-btn">💬 {post.comments.length}</span>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom mission strip */}
        <div style={{
          marginTop: '3rem',
          background: '#0f0f1a',
          borderRadius: '18px',
          padding: '2rem',
          display: 'flex',
          gap: '0',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', display: 'flex' }}>
            <div style={{ flex: 1, background: GREEN }} />
            <div style={{ flex: 1, background: GOLD }} />
            <div style={{ flex: 1, background: RED }} />
          </div>
          <div>
            <div style={{ color: GOLD, fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', fontStyle: 'italic' }}>
              "The moral value foundation network is needed to rebuild a nation unified in oneness and moral integrity."
            </div>
            <div style={{ color: GREEN, fontSize: '0.85rem', fontWeight: 700 }}>
              — Moral Up · #MVFN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
