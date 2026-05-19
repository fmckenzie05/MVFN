import { chapters } from '../data/chapters';
import { currentUser } from '../data/mockData';

const ACHIEVEMENTS = [
  { icon: '👑', name: 'Moral Order', req: 1 },
  { icon: '🌿', name: 'First Lesson', req: 1 },
  { icon: '⚖️', name: '5 Lessons Done', req: 5 },
  { icon: '🔭', name: '10 Lessons Done', req: 10 },
  { icon: '🏆', name: 'Halfway There', req: 10 },
  { icon: '🌍', name: 'Moral Graduate', req: 20 },
  { icon: '💬', name: 'Community Voice', req: 0, special: true },
  { icon: '🌟', name: 'Moral Leader', req: 20 },
];

export default function Profile({ completedLessons, posts }) {
  const pct = Math.round((completedLessons.size / chapters.length) * 100);
  const userPosts = posts.filter(p => p.userId === 0);

  return (
    <div className="page-container">
      {/* Profile Header */}
      <div className="profile-header-card">
        <div className="profile-avatar-lg">{currentUser.avatar}</div>
        <div style={{ flex: 1 }}>
          <div className="profile-name">{currentUser.name}</div>
          <div className="profile-handle">@{currentUser.handle}</div>
          <div className="profile-bio">{currentUser.bio}</div>
          <div className="profile-stats">
            <div className="ps-item">
              <div className="ps-num">{completedLessons.size}</div>
              <div className="ps-label">Lessons</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">{pct}%</div>
              <div className="ps-label">Progress</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">{userPosts.length}</div>
              <div className="ps-label">Posts</div>
            </div>
            <div className="ps-item">
              <div className="ps-num">{currentUser.following}</div>
              <div className="ps-label">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', border: '1px solid #e8e4d8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a2e' }}>Overall Moral Progress</span>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#c8971f' }}>{pct}%</span>
        </div>
        <div style={{ background: '#e8e4d8', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #c8971f, #2d6a4f)', borderRadius: '4px', transition: 'width 0.4s' }} />
        </div>
        <div style={{ fontSize: '0.78rem', color: '#888', marginTop: '0.4rem' }}>
          {completedLessons.size} of {chapters.length} lessons completed
        </div>
      </div>

      {/* Achievements */}
      <div className="profile-section-title">🏅 Moral Achievements</div>
      <div className="achievements-grid" style={{ marginBottom: '2rem' }}>
        {ACHIEVEMENTS.map((a, i) => {
          const earned = a.special ? userPosts.length > 0 : completedLessons.size >= a.req;
          return (
            <div key={i} className={`achievement-card ${earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon">{a.icon}</div>
              <div className="achievement-name">{a.name}</div>
              {!earned && <div style={{ fontSize: '0.68rem', color: '#bbb', marginTop: '0.25rem' }}>
                {a.special ? 'Post in community' : `${a.req} lessons needed`}
              </div>}
              {earned && <div style={{ fontSize: '0.68rem', color: '#c8971f', marginTop: '0.25rem', fontWeight: 700 }}>Earned ✓</div>}
            </div>
          );
        })}
      </div>

      {/* Lessons Progress List */}
      <div className="profile-section-title">📚 Lesson Progress</div>
      <div className="progress-lessons-list">
        {chapters.map(ch => {
          const done = completedLessons.has(ch.id);
          return (
            <div key={ch.id} className="pll-item">
              <span className="pll-icon">{ch.icon}</span>
              <span className="pll-title">{ch.title}</span>
              <span style={{ fontSize: '0.7rem', color: '#aaa', marginRight: '0.5rem' }}>Ch.{ch.number}</span>
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
          <div className="profile-section-title">💬 Your Community Posts</div>
          {userPosts.map(post => (
            <div key={post.id} style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem', marginBottom: '1rem', border: '1px solid #e8e4d8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="post-chapter-tag">#{post.chapterTitle.replace(/ /g, '')}</span>
                <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{post.time}</span>
              </div>
              <p style={{ fontSize: '0.93rem', color: '#2a2a3e', lineHeight: 1.7 }}>{post.text}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.82rem', color: '#888' }}>
                <span>❤ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
