import { useState, useEffect } from 'react';
import './App.css';

import Sidebar     from './components/Sidebar';
import Dashboard   from './components/Dashboard';
import Learn       from './components/Learn';
import LessonView  from './components/LessonView';
import Community   from './components/Community';
import Profile     from './components/Profile';
import NetworkMap  from './components/NetworkMap';

import { mockPosts, currentUser } from './data/mockData';
import { chapters } from './data/chapters';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  learn:     'Learn',
  lesson:    'Lesson',
  community: 'Community',
  network:   'Network Map',
  profile:   'My Profile',
};

export default function App() {
  const [page,           setPage]           = useState('dashboard');
  const [currentChapter, setCurrentChapter] = useState(null);
  const [posts,          setPosts]          = useState(mockPosts);

  // Persist completed lessons in localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('mvfn_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
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

  // When a lesson reflection is shared to community
  function handleShareToFeed({ chapterId, chapterTitle, text }) {
    const ch = chapters.find(c => c.id === chapterId) || chapters[0];
    const newPost = {
      id: Date.now(),
      userId: 0,
      chapterId: ch.id,
      chapterTitle: chapterTitle,
      text,
      likes: 0,
      liked: false,
      time: 'Just now',
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
  }

  const topTitle = page === 'lesson' && currentChapter
    ? chapters.find(c => c.id === currentChapter)?.title || 'Lesson'
    : PAGE_TITLES[page] || '';

  return (
    <div className="app-layout">
      <Sidebar
        page={page}
        setPage={navigate}
        completedLessons={completedLessons}
      />

      <div className="main-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="top-bar-title">{topTitle}</div>
          <div
            className="top-bar-user"
            onClick={() => navigate('profile')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('profile')}
          >
            <div className="user-avatar">{currentUser.avatar}</div>
            <span className="user-name">{currentUser.handle}</span>
          </div>
        </div>

        {page === 'dashboard' && (
          <Dashboard
            completedLessons={completedLessons}
            setPage={navigate}
            setCurrentChapter={id => { setCurrentChapter(id); navigate('lesson'); }}
          />
        )}

        {page === 'learn' && (
          <Learn
            completedLessons={completedLessons}
            setCurrentChapter={setCurrentChapter}
            setPage={navigate}
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
          />
        )}

        {page === 'community' && (
          <Community posts={posts} setPosts={setPosts} />
        )}

        {page === 'network' && (
          <NetworkMap
            setPage={navigate}
            setCurrentChapter={id => { setCurrentChapter(id); navigate('lesson'); }}
          />
        )}

        {page === 'profile' && (
          <Profile
            completedLessons={completedLessons}
            posts={posts}
          />
        )}
      </div>
    </div>
  );
}
