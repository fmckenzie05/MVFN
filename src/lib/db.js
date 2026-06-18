import { supabase } from './supabase';

// ── Auth ────────────────────────────────────────
export async function signUp(email, password, name) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

// ── Profile ─────────────────────────────────────
export async function getProfile(userId) {
  return supabase.from('profiles').select('*').eq('id', userId).single();
}

export async function updateProfile(userId, updates) {
  return supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
}

// ── Progress ────────────────────────────────────
export async function getProgress(userId) {
  return supabase
    .from('lesson_progress')
    .select('chapter_id')
    .eq('user_id', userId)
    .order('completed_at');
}

export async function markChapterComplete(userId, chapterId) {
  return supabase
    .from('lesson_progress')
    .upsert(
      { user_id: userId, chapter_id: chapterId },
      { onConflict: 'user_id,chapter_id' }
    );
}

// ── Community ───────────────────────────────────
export async function getFeed({ chapter, limit = 20, offset = 0 } = {}) {
  let query = supabase
    .from('community_feed')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (chapter) query = query.eq('chapter_id', chapter);
  return query;
}

export async function getUserLikedPostIds(userId, postIds) {
  if (!postIds.length) return { data: [] };
  return supabase
    .from('community_likes')
    .select('post_id')
    .eq('user_id', userId)
    .in('post_id', postIds);
}

export async function getCommentsForPosts(postIds) {
  if (!postIds.length) return { data: [] };
  return supabase
    .from('community_comments')
    .select('id, post_id, text, created_at, user_id, profiles(name, handle, avatar)')
    .in('post_id', postIds)
    .order('created_at', { ascending: true });
}

export async function createPost(userId, chapterId, chapterTitle, text) {
  return supabase
    .from('community_posts')
    .insert({ user_id: userId, chapter_id: chapterId, chapter_title: chapterTitle, text })
    .select('*, profiles(name, handle, avatar)')
    .single();
}

export async function toggleLike(postId) {
  return supabase.rpc('toggle_like', { p_post_id: postId });
}

export async function addComment(postId, userId, text) {
  return supabase
    .from('community_comments')
    .insert({ post_id: postId, user_id: userId, text })
    .select('*, profiles(name, handle, avatar)')
    .single();
}
