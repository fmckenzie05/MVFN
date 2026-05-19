import { useState, useEffect } from 'react';
import './App.css';

import Sidebar    from './components/Sidebar';
import Dashboard  from './components/Dashboard';
import Learn      from './components/Learn';
import LessonView from './components/LessonView';
import Community  from './components/Community';
import Profile    from './components/Profile';
import NetworkMap from './components/NetworkMap';
import AuthPage   from './components/AuthPage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

import { mockPosts } from './data/mockData';
import { chapters }  from './data/chapters';
import { LANGUAGES, makeT } from './i18n/index';

// ─────────────────────────────────────────────────────────
//  TikTok OAuth Callback Handler
//  When TikTok redirects back to /auth/callback?code=xxx
//  we detect the code here and do a mock token exchange.
//  ⚠️  In production: send the code to YOUR backend server,
//      which calls https://open.tiktokapis.com/v2/oauth/token/
//      using the client_secret (never expose in frontend).
// ─────────────────────────────────────────────────────────
function detectTikTokCallback() {
  const params = new URLSearchParams(window.location.search);
  const code   = params.get('code');
  const state  = params.get('state');
  const saved  = sessionStorage.getItem('tiktok_oauth_state');
  const error  = params.get('error');

  if (error) {
    console.warn('TikTok OAuth error:', params.get('error_description'));
    window.history.replaceState({}, '', '/');
    return null;
  }

  if (code && state && state === saved) {
    sessionStorage.removeItem('tiktok_oauth_state');
    // Clean URL
    window.history.replaceState({}, '', '/');
    return { code };
  }

  return null;
}

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  learn:     'Learn',
  lesson:    'Lesson',
  community: 'Community',
  network:   'Network',
  profile:   'Profile',
  terms:     'Terms of Service',
  privacy:   'Privacy Policy',
};

export default function App() {
  // ── Auth state ─────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mvfn_user')) || null; }
    catch { return null; }
  });

  // ── Language ───────────────────────────────────────────
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('mvfn_lang') || 'en';
  });

  function setLang(l) {
    setLangState(l);
    localStorage.setItem('mvfn_lang', l);
  }

  const T = makeT(lang);

  // ── TikTok callback on mount ───────────────────────────
  const [tiktokProcessing, setTiktokProcessing] = useState(false);

  useEffect(() => {
    const cb = detectTikTokCallback();
    if (!cb) return;

    setTiktokProcessing(true);

    // ⚠️  PRODUCTION: Replace this with a fetch to your backend:
    // fetch('/api/auth/tiktok', { method:'POST', body: JSON.stringify({ code: cb.code }) })
    //   .then(r => r.json())
    //   .then(data => { handleLogin(data.user); setTiktokProcessing(false); })
    //
    // DEMO MOCK — simulates a successful TikTok login:
    setTimeout(() => {
      handleLogin({
        name:     'TikTok User',
        handle:   'tiktokuser',
        avatar:   '🎵',
        lang:     localStorage.getItem('mvfn_lang') || 'en',
        provider: 'tiktok',
      });
      setTiktokProcessing(false);
    }, 1800);
  }, []);

  function handleLogin(userData) {
    const u = { ...userData, lang: userData.lang || lang };
    setUser(u);
    if (u.lang) setLang(u.lang);
    localStorage.setItem('mvfn_user', JSON.stringify(u));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('mvfn_user');
    setPage('dashboard');
  }

  // ── App navigation ─────────────────────────────────────
  const [page,           setPage]           = useState('dashboard');
  const [currentChapter, setCurrentChapter] = useState(null);
  const [posts,          setPosts]          = useState(mockPosts);

  // ── Progress (persisted) ───────────────────────────────
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const s = localStorage.getItem('mvfn_completed');
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem('mvfn_completed', JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  function markComplete(id) {
    setCompletedLessons(prev => new Set([...prev, id]));
  }

  function navigate(p) {
    setPage(p);
    window.scrollTo({ top: 0 });
  }

  function handleShareToFeed({ chapterId, chapterTitle, text }) {
    const newPost = {
      id: Date.now(),
      userId: 0,
      chapterId,
      chapterTitle,
      text,
      likes: 0,
      liked: false,
      time: 'Just now',
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
  }

  // ── TikTok processing screen ───────────────────────────
  if (tiktokProcessing) {
    return (
      <div className="auth-callback">
        <div className="auth-logo-ring" style={{ width: 68, height: 68, border: '3px solid #FFD100' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFD100', letterSpacing: '0.1em' }}>MVFN</span>
        </div>
        <div className="auth-callback-spinner" />
        <p style={{ color: '#888', fontSize: '0.95rem' }}>{T('auth_callback_processing')}</p>
      </div>
    );
  }

  // ── Not authenticated → show auth page ────────────────
  if (!user) {
    return <AuthPage lang={lang} setLang={setLang} onLogin={handleLogin} />;
  }

  // ── Authenticated app ──────────────────────────────────
  const topTitle = page === 'lesson' && currentChapter
    ? chapters.find(c => c.id === currentChapter)?.title || 'Lesson'
    : PAGE_TITLES[page] || '';

  return (
    <div className="app-layout">
      <Sidebar
        page={page}
        setPage={navigate}
        completedLessons={completedLessons}
        lang={lang}
        setLang={setLang}
        user={user}
        onLogout={handleLogout}
      />

      <div className="main-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="top-bar-title">{topTitle}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Inline lang switcher */}
            <div className="lang-switcher" style={{ display: 'flex', gap: '2px' }}>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`lang-switcher-btn${lang === l.code ? ' active' : ''}`}
                  onClick={() => setLang(l.code)}
                  title={l.label}
                  style={{ fontSize: '0.85rem' }}
                >
                  {l.flag}
                </button>
              ))}
            </div>

            {/* User avatar */}
            <div
              className="top-bar-user"
              onClick={() => navigate('profile')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate('profile')}
            >
              <div className="user-avatar">{user.avatar}</div>
              <span className="user-name">@{user.handle}</span>
            </div>
          </div>
        </div>

        {page === 'dashboard' && (
          <Dashboard
            completedLessons={completedLessons}
            setPage={navigate}
            setCurrentChapter={id => { setCurrentChapter(id); navigate('lesson'); }}
            lang={lang}
          />
        )}

        {page === 'learn' && (
          <Learn
            completedLessons={completedLessons}
            setCurrentChapter={setCurrentChapter}
            setPage={navigate}
            lang={lang}
          />
        )}

        {page === 'lesson' && currentChapter && (
          <LessonView
            chapterId={currentChapter}
            setPage={navigate}
            setCurrentChapter={setCurrentChapter}
            completedLessons={completedLessons}
            markComplete={markComplete}
            onShareToFeed={handleShareToFeed}
            lang={lang}
          />
        )}

        {page === 'community' && (
          <Community posts={posts} setPosts={setPosts} lang={lang} />
        )}

        {page === 'network' && (
          <NetworkMap
            setPage={navigate}
            setCurrentChapter={id => { setCurrentChapter(id); navigate('lesson'); }}
            lang={lang}
          />
        )}

        {page === 'profile' && (
          <Profile
            completedLessons={completedLessons}
            posts={posts}
            user={user}
            lang={lang}
            onLogout={handleLogout}
          />
        )}

        {page === 'terms' && <TermsOfService />}

        {page === 'privacy' && <PrivacyPolicy />}
      </div>
    </div>
  );
}
