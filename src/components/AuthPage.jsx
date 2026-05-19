import { useState } from 'react';
import { LANGUAGES, makeT } from '../i18n/index';

// TikTok brand colors
const TT_BG   = '#000000';
const TT_TEXT = '#ffffff';

// MVFN tri-colors
const GREEN = '#009B3A';
const GOLD  = '#FFD100';
const RED   = '#CC0000';

// ── TikTok SVG logo (official shape) ─────────────────────
function TikTokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.74a8.2 8.2 0 004.79 1.52V6.83a4.85 4.85 0 01-1.02-.14z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Build TikTok OAuth URL ────────────────────────────────
function buildTikTokAuthUrl() {
  const state = Math.random().toString(36).substring(2, 18);
  sessionStorage.setItem('tiktok_oauth_state', state);

  const clientKey   = import.meta.env.VITE_TIKTOK_CLIENT_KEY   || 'YOUR_CLIENT_KEY';
  const redirectUri = import.meta.env.VITE_TIKTOK_REDIRECT_URI
    || `${window.location.origin}/auth/callback`;

  const params = new URLSearchParams({
    client_key:    clientKey,
    scope:         'user.info.basic',
    response_type: 'code',
    redirect_uri:  redirectUri,
    state,
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}

// ─────────────────────────────────────────────────────────
//  MAIN AUTH PAGE
// ─────────────────────────────────────────────────────────
export default function AuthPage({ lang, setLang, onLogin }) {
  const [view, setView]         = useState('landing'); // landing | signup | login
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const T = makeT(lang);

  // ── TikTok OAuth redirect ──────────────────────────────
  function handleTikTokLogin() {
    const url = buildTikTokAuthUrl();
    window.location.href = url;
  }

  // ── Mock email sign-up (replace with real backend call) ─
  function handleEmailSignup(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // In production: POST /api/auth/signup with name, email, password, lang
    onLogin({
      name:   name.trim(),
      handle: name.trim().toLowerCase().replace(/\s+/g, ''),
      avatar: '🌱',
      lang,
      provider: 'email',
    });
  }

  // ── Mock email log-in ──────────────────────────────────
  function handleEmailLogin(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    // In production: POST /api/auth/login
    onLogin({
      name:   email.split('@')[0],
      handle: email.split('@')[0].toLowerCase(),
      avatar: '🌱',
      lang,
      provider: 'email',
    });
  }

  return (
    <div className="auth-root">
      {/* Tri-color top stripe */}
      <div className="auth-stripe">
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: RED   }} />
      </div>

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <div className="auth-logo-ring">
            <span className="auth-logo-text">MVFN</span>
          </div>
          <div className="auth-logo-sub">Moral Value Foundation Network</div>
        </div>

        {/* ── LANDING ─────────────────────────────────── */}
        {view === 'landing' && (
          <>
            <h1 className="auth-heading">{T('auth_join_heading')}</h1>
            <p className="auth-sub">{T('auth_join_sub')}</p>

            {/* Language picker */}
            <div className="auth-lang-label">{T('auth_choose_lang')}</div>
            <div className="auth-lang-row">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`auth-lang-btn${lang === l.code ? ' active' : ''}`}
                  onClick={() => setLang(l.code)}
                >
                  <span className="lang-flag">{l.flag}</span>
                  <span className="lang-native">{l.native}</span>
                </button>
              ))}
            </div>

            {/* TikTok primary button */}
            <button className="auth-tiktok-btn" onClick={handleTikTokLogin}>
              <TikTokIcon size={20} />
              <span>{T('auth_tiktok_btn')}</span>
            </button>

            <p className="auth-tiktok-note">{T('auth_tiktok_note')}</p>

            <div className="auth-divider">
              <span>{T('auth_or')}</span>
            </div>

            <button
              className="auth-email-btn"
              onClick={() => { setView('signup'); setError(''); }}
            >
              {T('auth_email_btn')}
            </button>

            <p className="auth-switch">
              {T('auth_already')}{' '}
              <button
                className="auth-link"
                onClick={() => { setView('login'); setError(''); }}
              >
                {T('auth_login')}
              </button>
            </p>
          </>
        )}

        {/* ── SIGN UP ─────────────────────────────────── */}
        {view === 'signup' && (
          <>
            <button className="auth-back-btn" onClick={() => setView('landing')}>
              ← {T('auth_back')}
            </button>
            <h1 className="auth-heading">{T('auth_email_btn')}</h1>

            <form className="auth-form" onSubmit={handleEmailSignup}>
              <div className="auth-field">
                <label>{T('auth_name')}</label>
                <input
                  type="text"
                  placeholder="Fayah Henry"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="auth-field">
                <label>{T('auth_email')}</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="auth-field">
                <label>{T('auth_password')}</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              {/* Language preference */}
              <div className="auth-field">
                <label>{T('auth_choose_lang')}</label>
                <div className="auth-lang-row" style={{ marginTop: '0.4rem' }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      className={`auth-lang-btn${lang === l.code ? ' active' : ''}`}
                      onClick={() => setLang(l.code)}
                    >
                      <span className="lang-flag">{l.flag}</span>
                      <span className="lang-native">{l.native}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn">
                {T('auth_create_acc')}
              </button>
            </form>

            <p className="auth-switch">
              {T('auth_already')}{' '}
              <button
                className="auth-link"
                onClick={() => { setView('login'); setError(''); }}
              >
                {T('auth_login')}
              </button>
            </p>

            <div className="auth-divider"><span>{T('auth_or')}</span></div>

            <button className="auth-tiktok-btn" onClick={handleTikTokLogin}>
              <TikTokIcon size={18} />
              <span>{T('auth_tiktok_btn')}</span>
            </button>
          </>
        )}

        {/* ── LOGIN ───────────────────────────────────── */}
        {view === 'login' && (
          <>
            <button className="auth-back-btn" onClick={() => setView('landing')}>
              ← {T('auth_back')}
            </button>
            <h1 className="auth-heading">{T('auth_login_heading')}</h1>

            <form className="auth-form" onSubmit={handleEmailLogin}>
              <div className="auth-field">
                <label>{T('auth_email')}</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="auth-field">
                <label>{T('auth_password')}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn">
                {T('auth_login')}
              </button>
            </form>

            <p className="auth-switch">
              {T('auth_no_account')}{' '}
              <button
                className="auth-link"
                onClick={() => { setView('signup'); setError(''); }}
              >
                {T('auth_signup')}
              </button>
            </p>

            <div className="auth-divider"><span>{T('auth_or')}</span></div>

            <button className="auth-tiktok-btn" onClick={handleTikTokLogin}>
              <TikTokIcon size={18} />
              <span>{T('auth_tiktok_btn')}</span>
            </button>
          </>
        )}
      </div>

      {/* Bottom tri-color stripe */}
      <div className="auth-stripe">
        <div style={{ flex: 1, background: RED   }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: GREEN }} />
      </div>
    </div>
  );
}
