import { useState, useEffect } from 'react';
import { courses } from '../data/chapters';

const packages = courses[0].packages;
import { getFeed, getUserLikedPostIds, getCommentsForPosts, createPost, toggleLike, addComment } from '../lib/db';

function relativeTime(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function PostCard({ post, onLike, onComment }) {
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
        <div className="post-avatar">{post.user.avatar}</div>
        <div className="post-user-info">
          <div className="post-name">{post.user.name}</div>
          <div className="post-handle">@{post.user.handle}</div>
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
          {post.comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-avatar">{c.user.avatar}</div>
              <div className="comment-bubble">
                <div className="comment-name">{c.user.name}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            </div>
          ))}

          <div className="add-comment-row">
            <div className="comment-avatar" style={{ flexShrink: 0 }}>{post.currentUserAvatar || '🌱'}</div>
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

export default function Community({ posts, setPosts, user, session }) {
  const [newPostText, setNewPostText] = useState('');
  const [newPostChapter, setNewPostChapter] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedLoaded, setFeedLoaded] = useState(false);

  // Load feed from Supabase
  useEffect(() => {
    if (!session?.user) return;
    loadFeed();
  }, [session]);

  async function loadFeed() {
    const { data: feedData } = await getFeed();
    if (!feedData || feedData.length === 0) {
      setFeedLoaded(true);
      return;
    }

    const postIds = feedData.map(p => p.id);

    // Fetch likes and comments in parallel
    const [likesRes, commentsRes] = await Promise.all([
      getUserLikedPostIds(session.user.id, postIds),
      getCommentsForPosts(postIds),
    ]);

    const likedSet = new Set((likesRes.data || []).map(l => l.post_id));

    // Group comments by post
    const commentsByPost = {};
    for (const c of (commentsRes.data || [])) {
      if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
      commentsByPost[c.post_id].push({
        id: c.id,
        user: {
          id: c.user_id,
          name: c.profiles?.name || 'User',
          handle: c.profiles?.handle || 'user',
          avatar: c.profiles?.avatar || '🌱',
        },
        text: c.text,
        time: relativeTime(c.created_at),
      });
    }

    const assembled = feedData.map(p => ({
      id: p.id,
      user: { id: p.user_id, name: p.user_name, handle: p.user_handle, avatar: p.user_avatar },
      chapterId: p.chapter_id,
      chapterTitle: p.chapter_title,
      text: p.text,
      likes: p.likes_count,
      liked: likedSet.has(p.id),
      time: relativeTime(p.created_at),
      comments: commentsByPost[p.id] || [],
      currentUserAvatar: user?.avatar || '🌱',
    }));

    setPosts(assembled);
    setFeedLoaded(true);
  }

  async function handlePost() {
    if (!newPostText.trim() || !session?.user || !user) return;
    const ch = packages.find(c => c.id === newPostChapter) || packages[0];
    const { data } = await createPost(session.user.id, ch.id, ch.title, newPostText.trim());
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
        currentUserAvatar: user?.avatar || '🌱',
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setNewPostText('');
    setNewPostChapter('');
  }

  async function handleLike(postId) {
    // Optimistic update
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
    const { data } = await toggleLike(postId);
    if (data) {
      setPosts(prev => prev.map(p =>
        p.id === postId ? { ...p, liked: data.liked, likes: data.likes } : p
      ));
    }
  }

  async function handleComment(postId, text) {
    if (!session?.user || !user) return;
    const { data } = await addComment(postId, session.user.id, text);
    if (data) {
      const newComment = {
        id: data.id,
        user: { id: user.id, name: user.name, handle: user.handle, avatar: user.avatar },
        text: data.text,
        time: 'Just now',
      };
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      ));
    }
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
            {packages.slice(0, 8).map(ch => (
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
              <div className="post-avatar">{user?.avatar || '🌱'}</div>
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
                {packages.map(ch => (
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
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}

          {filtered.length === 0 && feedLoaded && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>
              No posts for this pillar yet. Be the first to share!
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="community-sidebar">
          {/* Trending packages */}
          <div className="cs-card">
            <div className="cs-card-title">Trending Pillars</div>
            {[...packages]
              .map(ch => ({ ch, count: posts.filter(p => p.chapterId === ch.id).length }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map(({ ch, count }) => (
                <div key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{ch.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-1)' }}>{ch.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{count} post{count !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
