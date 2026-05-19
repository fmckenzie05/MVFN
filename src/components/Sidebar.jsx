import { chapters } from '../data/chapters';

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'learn',     icon: '📚', label: 'Learn' },
  { id: 'community', icon: '💬', label: 'Community' },
  { id: 'network',   icon: '🌐', label: 'Network' },
  { id: 'profile',   icon: '👤', label: 'Profile' },
];

export default function Sidebar({ page, setPage, completedLessons }) {
  const pct = Math.round((completedLessons.size / chapters.length) * 100);

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

      <div className="sidebar-progress">
        <div className="sp-label">Your Progress</div>
        <div className="sp-bar-wrap">
          <div className="sp-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="sp-text">{completedLessons.size} / {chapters.length} Lessons</div>
      </div>
    </aside>
  );
}
