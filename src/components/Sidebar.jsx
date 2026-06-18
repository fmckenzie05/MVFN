import { courses } from '../data/chapters';
import { LANGUAGES, makeT } from '../i18n/index';

const packages = courses[0].packages;

/* ── SVG Icon Components ──────────────────────────────── */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ── Sidebar Component ────────────────────────────────── */
export default function Sidebar({ page, setPage, completedLessons, lang, setLang, user, onLogout }) {
  const T = makeT(lang);
  const pct = Math.round((completedLessons.size / packages.length) * 100);

  const navItems = [
    { id: 'dashboard', Icon: GridIcon,    label: T('nav_dashboard') },
    { id: 'learn',     Icon: BookIcon,    label: T('nav_learn') },
    { id: 'community', Icon: ChatIcon,    label: T('nav_community') },
    { id: 'network',   Icon: NetworkIcon, label: T('nav_network') },
    { id: 'profile',   Icon: PersonIcon,  label: T('nav_profile') },
    { id: 'terms',     Icon: DocIcon,     label: 'Terms',   secondary: true },
    { id: 'privacy',   Icon: LockIcon,    label: 'Privacy', secondary: true },
  ];

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="tricolor-bar" />
        <div className="sidebar-brand-inner">
          <div className="brand-logo">MVFN</div>
          <div className="brand-tagline">Moral Value Foundation Network</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map(({ id, Icon, label, secondary }) => (
          <button
            key={id}
            className={`nav-item${page === id ? ' active' : ''}${secondary ? ' nav-secondary' : ''}`}
            onClick={() => setPage(id)}
          >
            <span className="nav-icon"><Icon /></span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Progress */}
      <div className="sidebar-progress">
        <div className="sp-label">Progress</div>
        <div className="sp-bar-wrap">
          <div className="sp-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="sp-text">Course 1: {completedLessons.size} / {packages.length} packages</div>
      </div>

      {/* Language switcher */}
      <div style={{ padding: '0 0.8rem 0.5rem' }}>
        <div style={{ fontSize: '0.6rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', paddingLeft: '0.15rem' }}>
          Language
        </div>
        <div className="lang-switcher">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`lang-switcher-btn${lang === l.code ? ' active' : ''}`}
              onClick={() => setLang(l.code)}
              title={l.label}
            >
              {l.flag}
            </button>
          ))}
        </div>
      </div>

      {/* User footer */}
      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user-row">
            {user.avatar && user.avatar.startsWith('http')
              ? <img src={user.avatar} alt="" className="user-avatar" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }} />
              : <div className="user-avatar" style={{ width: 32, height: 32, fontSize: '1rem', flexShrink: 0 }}>{user.avatar || '🌱'}</div>
            }
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-handle">@{user.handle}</div>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={onLogout}>
            Log Out
          </button>
        </div>
      )}
    </aside>
  );
}
