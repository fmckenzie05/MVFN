import { chapters } from '../data/chapters';
import { mockPosts, mockUsers } from '../data/mockData';
import { makeT } from '../i18n/index';

const GREEN = '#00C04B';
const GOLD  = '#E8B23A';
const RED   = '#FF5252';

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
      {/* ── Compact brand banner */}
      <div className="dash-banner">
        <div className="tricolor-bar" />
        <div className="dash-banner-body">
          <div className="dash-banner-brand">
            <div className="dash-banner-mark">MVFN</div>
            <div>
              <h1 className="dash-banner-title">Moral Value Foundation Network</h1>
              <p className="dash-banner-sub">{T('dash_tagline')}</p>
            </div>
          </div>
          <div className="dash-banner-actions">
            <button className="btn-primary" onClick={() => goLesson(nextLesson)}>
              {T('dash_btn_learn')} →
            </button>
            <button className="btn-outline-gold" onClick={() => setPage('community')}>
              Community
            </button>
          </div>
        </div>
        <div
          className="tricolor-bar"
          style={{ background: 'linear-gradient(90deg, #CC0000 33.3%, #FFD100 33.3% 66.6%, #009B3A 66.6%)' }}
        />
      </div>

      {/* ── Page content */}
      <div className="page-container">

        {/* Stat cards */}
        <div className="dash-grid">
          <div className="dash-stat-card" style={{ borderTop: `3px solid ${GREEN}` }}>
            <div className="ds-number" style={{ color: GREEN }}>{completedLessons.size}</div>
            <div className="ds-label">{T('dash_lessons_done')}</div>
          </div>
          <div className="dash-stat-card" style={{ borderTop: `3px solid ${GOLD}` }}>
            <div className="ds-number" style={{ color: GOLD }}>{pct}%</div>
            <div className="ds-label">{T('dash_progress')}</div>
          </div>
          <div className="dash-stat-card" style={{ borderTop: `3px solid ${RED}` }}>
            <div className="ds-number" style={{ color: RED }}>{mockPosts.length}</div>
            <div className="ds-label">{T('dash_posts')}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-lg)',
          padding: '1.1rem 1.5rem',
          marginBottom: '1.75rem',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-1)' }}>{T('dash_journey')}</span>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: GOLD }}>{pct}%</span>
          </div>
          <div style={{ background: 'var(--border)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              borderRadius: '6px',
              transition: 'width 0.4s',
              background: `linear-gradient(90deg, ${GREEN}, ${GOLD}, ${RED})`,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', color: GREEN, fontWeight: 700 }}>● Start</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{completedLessons.size} of {chapters.length}</span>
            <span style={{ fontSize: '0.72rem', color: RED, fontWeight: 700 }}>Goal ●</span>
          </div>
        </div>

        {/* Continue learning */}
        <div className="dash-section-title">Continue Learning</div>
        <div
          className="dash-continue-card"
          onClick={() => goLesson(nextLesson)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && goLesson(nextLesson)}
          style={{ borderLeft: `4px solid ${GREEN}` }}
        >
          <div className="dcc-icon" style={{ background: `${nextLesson.color}22`, color: nextLesson.color }}>
            {nextLesson.icon}
          </div>
          <div className="dcc-meta">
            <div className="dcc-label" style={{ color: GREEN }}>Next Lesson · Ch.{nextLesson.number}</div>
            <div className="dcc-title">{nextLesson.title}</div>
            <div className="dcc-sub">{nextLesson.subtitle} · {nextLesson.duration}</div>
          </div>
          <button className="dcc-btn">{T('dash_start')} →</button>
        </div>

        {/* 20 Pillars */}
        <div className="dash-section-title" style={{ marginTop: '1.5rem' }}>All 20 Moral Pillars</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
          gap: '0.65rem',
          marginBottom: '2.5rem',
        }}>
          {chapters.map((ch, i) => {
            const done = completedLessons.has(ch.id);
            const accent = i % 3 === 0 ? GREEN : i % 3 === 1 ? GOLD : RED;
            return (
              <button
                key={ch.id}
                onClick={() => goLesson(ch)}
                style={{
                  background: done ? `${accent}0f` : 'var(--surface)',
                  border: `1px solid ${done ? accent + '55' : 'var(--border)'}`,
                  borderTop: `3px solid ${accent}`,
                  borderRadius: 'var(--r-md)',
                  padding: '0.7rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 4px 14px ${accent}25`;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{ch.icon}</span>
                <div>
                  <div style={{ fontSize: '0.6rem', color: accent, fontWeight: 700 }}>Ch.{ch.number}</div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>
                    {ch.title.replace('Moral ', '')}
                  </div>
                  {done && (
                    <div style={{ fontSize: '0.6rem', color: accent, fontWeight: 600, marginTop: '0.1rem' }}>
                      ✓ Done
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Community Highlights */}
        <div
          className="dash-section-title"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Community Highlights</span>
          <button
            onClick={() => setPage('community')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
          {recentPosts.map((post, i) => {
            const user = mockUsers.find(u => u.id === post.userId);
            const accent = i % 3 === 0 ? GREEN : i % 3 === 1 ? GOLD : RED;
            return (
              <div key={post.id} className="post-card" style={{ borderLeft: `3px solid ${accent}` }}>
                <div className="post-header">
                  <div className="post-avatar">{user?.avatar}</div>
                  <div className="post-user-info">
                    <div className="post-name">{user?.name}</div>
                    <div className="post-handle">@{user?.handle}</div>
                  </div>
                  <span
                    className="post-chapter-tag"
                    style={{ background: `${accent}18`, color: accent }}
                  >
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

        {/* Mission quote */}
        <div style={{
          background: 'var(--dark)',
          borderRadius: 'var(--r-xl)',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ height: '3px', display: 'flex', position: 'absolute', top: 0, left: 0, right: 0 }}>
            <div style={{ flex: 1, background: GREEN }} />
            <div style={{ flex: 1, background: GOLD }} />
            <div style={{ flex: 1, background: RED }} />
          </div>
          <p style={{
            color: GOLD,
            fontSize: '1.1rem',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.6,
            marginBottom: '0.75rem',
          }}>
            {T('dash_mission')}
          </p>
          <span style={{ color: GREEN, fontSize: '0.82rem', fontWeight: 700 }}>— Moral Up · #MVFN</span>
        </div>

      </div>
    </div>
  );
}
