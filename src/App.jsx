import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { getProfile, getProgress, markChapterComplete, signOut, createPost } from './lib/db';
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

import { courses }  from './data/chapters';
import { LANGUAGES, makeT } from './i18n/index';

const packages = courses[0].packages;

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  learn:     'Course 1',
  lesson:    'Package',
  community: 'Community',
  network:   'Network',
  profile:   'Profile',
  terms:     'Terms of Service',
  privacy:   'Privacy Policy',
};

export default function App() {
  // ── Supabase auth session ─────────────────────────────
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) setUser(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Load profile from DB when session changes ─────────
  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;

    async function loadUser() {
      const { data } = await getProfile(session.user.id);
      if (!cancelled && data) setUser(data);
    }
    loadUser();

    return () => { cancelled = true; };
  }, [session]);

  // ── Language ───────────────────────────────────────────
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('mvfn_lang') || 'en';
  });

  function setLang(l) {
    setLangState(l);
    localStorage.setItem('mvfn_lang', l);
  }

  const T = makeT(lang);

  async function handleLogout() {
    localStorage.removeItem('mvfn_completed');
    localStorage.removeItem('mvfn_lang');
    await signOut();
  }

  // ── App navigation ─────────────────────────────────────
  const [page,           setPage]           = useState('dashboard');
  const [currentChapter, setCurrentChapter] = useState(null);
  const [posts,          setPosts]          = useState([]);

  // ── Progress (Supabase + localStorage cache) ───────────
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const s = localStorage.getItem('mvfn_completed');
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  });

  // Load from DB when session available
  useEffect(() => {
    if (!session?.user) return;
    getProgress(session.user.id).then(({ data }) => {
      if (data) {
        const ids = data.map(r => r.chapter_id);
        setCompletedLessons(new Set(ids));
        localStorage.setItem('mvfn_completed', JSON.stringify(ids));
      }
    });
  }, [session]);

  // Sync localStorage cache when completedLessons changes
  useEffect(() => {
    localStorage.setItem('mvfn_completed', JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  async function markComplete(id) {
    setCompletedLessons(prev => new Set([...prev, id]));
    if (session?.user) {
      await markChapterComplete(session.user.id, id);
    }
  }

  function navigate(p) {
    setPage(p);
    window.scrollTo({ top: 0 });
  }

  async function handleShareToFeed({ chapterId, chapterTitle, text }) {
    if (!session?.user || !user) return;
    const { data } = await createPost(session.user.id, chapterId, chapterTitle, text);
    if (data) {
      const newPost = {
        id: data.id,
        user: { id: user.id, name: user.name, handle: user.handle, avatar: user.avatar },
        chapterId: data.chapter_id,
        chapterTitle: data.chapter_title,
        text: data.text,
        likes: 0,
        liked: false,
        time: 'Just now',
        comments: [],
      };
      setPosts(prev => [newPost, ...prev]);
    }
  }

  // ── Loading state ──────────────────────────────────────
  if (loading) {
    return (
      <div className="auth-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="auth-logo-ring" style={{ margin: '0 auto 1rem' }}>
            <span className="auth-logo-text">MVFN</span>
          </div>
          <p style={{ color: '#b0b0b0' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // ── Not authenticated → show auth page ────────────────
  if (!session) {
    return <AuthPage lang={lang} setLang={setLang} />;
  }

  // ── Authenticated app ──────────────────────────────────
  const topTitle = page === 'lesson' && currentChapter
    ? packages.find(c => c.id === currentChapter)?.title || 'Package'
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
              {user?.avatar && user.avatar.startsWith('http')
                ? <img src={user.avatar} alt="" className="user-avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                : <div className="user-avatar">{user?.avatar || '🌱'}</div>
              }
              <span className="user-name">@{user?.handle || '...'}</span>
            </div>
          </div>
        </div>

        {page === 'dashboard' && (
          <Dashboard
            completedLessons={completedLessons}
            setPage={navigate}
            setCurrentChapter={id => { setCurrentChapter(id); navigate('lesson'); }}
            lang={lang}
            posts={posts}
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
          <Community
            posts={posts}
            setPosts={setPosts}
            user={user}
            session={session}
            lang={lang}
          />
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
            setPage={navigate}
          />
        )}

        {page === 'terms' && <TermsOfService />}

        {page === 'privacy' && <PrivacyPolicy />}
      </div>
    </div>
  );
}
