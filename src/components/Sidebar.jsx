import { chapters } from '../data/chapters';
import { LANGUAGES, makeT } from '../i18n/index';

export default function Sidebar({ page, setPage, completedLessons, lang, setLang, user, onLogout }) {
  const T = makeT(lang);
  const pct = Math.round((completedLessons.size / chapters.length) * 100);

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: T('nav_dashboard') },
    { id: 'learn',     icon: '📚', label: T('nav_learn') },
    { id: 'community', icon: '💬', label: T('nav_community') },
    { id: 'network',   icon: '🌐', label: T('nav_network') },
    { id: 'profile',   icon: '👤', label: T('nav_profile') },
    { id: 'terms',     icon: '📜', label: 'Terms' },
    { id: 'privacy',   icon: '🔒', label: 'Privacy' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-inner">
          <div className="brand-logo">MVFN</div>
          <div className="brand-tagline">Moral Value Foundation Network</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item${page === item.id ? ' active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Language switcher */}
      <div style={{ padding: '0 0.75rem 0.5rem' }}>
        <div style={{ fontSize: '0.62rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', paddingLeft: '0.15rem' }}>
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

      <div className="sidebar-progress">
        <div className="sp-label">{T('nav_learn')}</div>
        <div className="sp-bar-wrap">
          <div className="sp-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="sp-text">{completedLessons.size} / {chapters.length}</div>
      </div>

      {/* Logout */}
      {user && (
        <div style={{ padding: '0 0.75rem 1rem' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px', padding: '0.5rem',
              color: '#555', fontSize: '0.78rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#aaa'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#555'; }}
          >
            {T('profile_logout')}
          </button>
        </div>
      )}
    </aside>
  );
}
