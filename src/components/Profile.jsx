import { courses } from '../data/chapters';
import { makeT } from '../i18n/index';

const packages = courses[0].packages;

const ACHIEVEMENTS = [
  { icon: '👑', name: 'Moral Order',       req: 1 },
  { icon: '🌿', name: 'First Package',     req: 1 },
  { icon: '⚖️', name: '5 Packages Done',  req: 5 },
  { icon: '🔭', name: '10 Packages Done', req: 10 },
  { icon: '🏆', name: 'Halfway There',     req: 10 },
  { icon: '🌍', name: 'Course Complete',   req: 20 },
  { icon: '💬', name: 'Community Voice',   req: 0, special: true },
  { icon: '🌟', name: 'Moral Leader',      req: 20 },
];

const GREEN = '#00C04B';
const GOLD  = '#E8B23A';
const RED   = '#FF5252';

export default function Profile({ completedLessons, posts, user, lang = 'en', onLogout, setPage }) {
  const T = makeT(lang);

  const displayUser = user || { name: 'User', handle: 'user', avatar: '🌱', bio: '' };
  const pct = Math.round((completedLessons.size / packages.length) * 100);
  const userPosts = posts.filter(p => p.user?.id === user?.id);

  return (
    <div className="page-container">

      {/* Profile Header */}
      <div className="profile-header-card">
        {displayUser.avatar && displayUser.avatar.startsWith('http')
          ? <img src={displayUser.avatar} alt="" className="profile-avatar-lg" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
          : <div className="profile-avatar-lg">{displayUser.avatar || '🌱'}</div>
        }
        <div style={{ flex: 1 }}>
          <div className="profile-name">{displayUser.name}</div>
          <div className="profile-handle">@{displayUser.handle}</div>
          <div className="profile-bio">{displayUser.bio || 'Start your moral journey.'}</div>
          <div className="profile-stats">
            <div className="ps-item">
              <div className="ps-num">{completedLessons.size}</div>
              <div className="ps-label">{T('profile_lessons')}</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">{pct}%</div>
              <div className="ps-label">{T('profile_progress')}</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">{userPosts.length}</div>
              <div className="ps-label">{T('profile_posts')}</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">0</div>
              <div className="ps-label">{T('profile_following')}</div>
            </div>
          </div>
        </div>
        {/* Logout button in header */}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '0.4rem 0.9rem',
              color: '#888',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ff6b6b';
              e.currentTarget.style.borderColor = 'rgba(204,0,0,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#888';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            {T('profile_logout')}
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-1)' }}>
            {T('profile_moral_progress')}
          </span>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: GOLD }}>{pct}%</span>
        </div>
        <div style={{ background: 'var(--border)', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${GOLD}, ${GREEN})`,
            borderRadius: '4px',
            transition: 'width 0.4s',
          }} />
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '0.4rem' }}>
          {completedLessons.size} of {packages.length} packages completed
        </div>
      </div>

      {/* Achievements */}
      <div className="profile-section-title">{T('profile_achievements')}</div>
      <div className="achievements-grid" style={{ marginBottom: '2rem' }}>
        {ACHIEVEMENTS.map((a, i) => {
          const earned = a.special ? userPosts.length > 0 : completedLessons.size >= a.req;
          return (
            <div key={i} className={`achievement-card ${earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon">{a.icon}</div>
              <div className="achievement-name">{a.name}</div>
              {!earned && (
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  {a.special ? 'Post in community' : `${a.req} packages needed`}
                </div>
              )}
              {earned && (
                <div style={{ fontSize: '0.68rem', color: GOLD, marginTop: '0.25rem', fontWeight: 700 }}>
                  Earned ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lessons Progress List */}
      <div className="profile-section-title">{T('profile_lesson_progress')}</div>
      <div className="progress-lessons-list">
        {packages.map(ch => {
          const done = completedLessons.has(ch.id);
          return (
            <div key={ch.id} className="pll-item">
              <span className="pll-icon">{ch.icon}</span>
              <span className="pll-title">{ch.title}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginRight: '0.5rem' }}>
                Pkg.{ch.number}
              </span>
              <span className={done ? 'pll-done' : 'pll-todo'}>
                {done ? '✓' : '○'}
              </span>
            </div>
          );
        })}
      </div>

      {/* User Posts */}
      {userPosts.length > 0 && (
        <>
          <div className="profile-section-title">{T('profile_your_posts')}</div>
          {userPosts.map(post => (
            <div
              key={post.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--r-lg)',
                padding: '1.25rem',
                marginBottom: '1rem',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="post-chapter-tag">#{post.chapterTitle.replace(/ /g, '')}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{post.time}</span>
              </div>
              <p style={{ fontSize: '0.93rem', color: 'var(--text-1)', lineHeight: 1.7 }}>{post.text}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-3)' }}>
                <span>❤ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Legal links (Terms/Privacy are hidden from bottom nav on mobile) */}
      {setPage && (
        <div className="profile-legal-links">
          <button onClick={() => setPage('terms')}>Terms of Service</button>
          <button onClick={() => setPage('privacy')}>Privacy Policy</button>
        </div>
      )}

    </div>
  );
}
