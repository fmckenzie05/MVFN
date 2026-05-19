import { useState } from 'react';
import { chapters } from '../data/chapters';
import { mockUsers, currentUser } from '../data/mockData';

function PostCard({ post, users, onLike, onComment }) {
  const user = users.find(u => u.id === post.userId) || currentUser;
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText]   = useState('');

  function sendComment() {
    if (!commentText.trim()) return;
    onComment(post.id, commentText.trim());
    setCommentText('');
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{user.avatar}</div>
        <div className="post-user-info">
          <div className="post-name">{user.name}</div>
          <div className="post-handle">@{user.handle}</div>
        </div>
        <span className="post-chapter-tag">#{post.chapterTitle.replace(/ /g, '')}</span>
      </div>

      <p className="post-text">{post.text}</p>

      <div className="post-actions">
        <button
          className={`post-action-btn${post.liked ? ' liked' : ''}`}
          onClick={() => onLike(post.id)}
        >
          {post.liked ? '❤' : '🤍'} {post.likes}
        </button>
        <button
          className="post-action-btn"
          onClick={() => setShowComments(v => !v)}
        >
          💬 {post.comments.length}
        </button>
        <span className="post-time">{post.time}</span>
      </div>

      {showComments && (
        <div className="post-comments">
          {post.comments.map((c, i) => {
            const cu = users.find(u => u.id === c.userId) || currentUser;
            return (
              <div key={i} className="comment-item">
                <div className="comment-avatar">{cu.avatar}</div>
                <div className="comment-bubble">
                  <div className="comment-name">{cu.name}</div>
                  <div className="comment-text">{c.text}</div>
                </div>
              </div>
            );
          })}

          <div className="add-comment-row">
            <div className="comment-avatar" style={{ flexShrink: 0 }}>{currentUser.avatar}</div>
            <input
              className="comment-input"
              placeholder="Add a comment…"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendComment()}
            />
            <button className="comment-send-btn" onClick={sendComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Community({ posts, setPosts }) {
  const allUsers = [currentUser, ...mockUsers];

  const [newPostText, setNewPostText] = useState('');
  const [newPostChapter, setNewPostChapter] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  function handlePost() {
    if (!newPostText.trim()) return;
    const ch = chapters.find(c => c.id === newPostChapter) || chapters[0];
    const newPost = {
      id: Date.now(),
      userId: 0,
      chapterId: ch.id,
      chapterTitle: ch.title,
      text: newPostText.trim(),
      likes: 0,
      liked: false,
      time: 'Just now',
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostText('');
    setNewPostChapter('');
  }

  function handleLike(postId) {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  }

  function handleComment(postId, text) {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { userId: 0, text, time: 'Just now' }] }
        : p
    ));
  }

  const filtered = activeFilter === 'all'
    ? posts
    : posts.filter(p => p.chapterId === activeFilter);

  return (
    <div className="page-container">
      <div className="community-layout">
        {/* Feed */}
        <div>
          <div className="community-feed-header">
            <div className="feed-title">Moral Community Feed</div>
          </div>

          {/* Filters */}
          <div className="filter-pills">
            <button
              className={`filter-pill${activeFilter === 'all' ? ' active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Posts
            </button>
            {chapters.slice(0, 8).map(ch => (
              <button
                key={ch.id}
                className={`filter-pill${activeFilter === ch.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(ch.id)}
              >
                {ch.icon} {ch.title.replace('Moral ', '')}
              </button>
            ))}
          </div>

          {/* Create Post */}
          <div className="create-post-box">
            <div className="cpb-top">
              <div className="post-avatar">{currentUser.avatar}</div>
              <textarea
                className="cpb-textarea"
                placeholder="Share your moral reflection with the community…"
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
              />
            </div>
            <div className="cpb-footer">
              <select
                className="cpb-chapter-select"
                value={newPostChapter}
                onChange={e => setNewPostChapter(e.target.value)}
              >
                <option value="">Tag a moral pillar…</option>
                {chapters.map(ch => (
                  <option key={ch.id} value={ch.id}>
                    {ch.icon} {ch.title}
                  </option>
                ))}
              </select>
              <button className="cpb-post-btn" onClick={handlePost}>
                Post Reflection
              </button>
            </div>
          </div>

          {/* Posts */}
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              users={allUsers}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
              No posts for this pillar yet. Be the first to share!
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="community-sidebar">
          {/* Members */}
          <div className="cs-card">
            <div className="cs-card-title">Community Members</div>
            {mockUsers.map(u => (
              <div className="member-item" key={u.id}>
                <div className="member-avatar">{u.avatar}</div>
                <div>
                  <div className="member-name">{u.name}</div>
                  <div className="member-handle">@{u.handle}</div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>

          {/* Trending chapters */}
          <div className="cs-card">
            <div className="cs-card-title">Trending Pillars</div>
            {[...chapters]
              .map(ch => ({ ch, count: posts.filter(p => p.chapterId === ch.id).length }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map(({ ch, count }) => (
                <div key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{ch.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e' }}>{ch.title}</div>
                    <div style={{ fontSize: '0.7rem', color: '#999' }}>{count} post{count !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
