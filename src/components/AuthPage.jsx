import { useState } from 'react';
import { LANGUAGES, makeT } from '../i18n/index';

const GREEN = '#009B3A';
const GOLD  = '#FFD100';
const RED   = '#CC0000';

export default function AuthPage({ lang, setLang, onLogin }) {
  const [view, setView]               = useState('signup'); // signup | login
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [error, setError]             = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const T = makeT(lang);

  function switchView(v) {
    setView(v);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setShowPass(false);
    setShowConfirm(false);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    onLogin({
      name:     name.trim(),
      handle:   name.trim().toLowerCase().replace(/\s+/g, ''),
      avatar:   '🌱',
      lang,
      provider: 'email',
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    onLogin({
      name:     email.split('@')[0],
      handle:   email.split('@')[0].toLowerCase(),
      avatar:   '🌱',
      lang,
      provider: 'email',
    });
  }

  return (
    <div className="auth-root">
      {/* Top tri-color stripe */}
      <div className="auth-stripe">
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: RED   }} />
      </div>

      <div className="auth-card">
        {/* Brand mark */}
        <div className="auth-logo-wrap">
          <div className="auth-logo-ring">
            <span className="auth-logo-text">MVFN</span>
          </div>
          <div className="auth-logo-sub">Moral Value Foundation Network</div>
        </div>

        {/* Sign Up / Log In tab switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab-btn${view === 'signup' ? ' active' : ''}`}
            onClick={() => switchView('signup')}
          >
            Sign Up
          </button>
          <button
            className={`auth-tab-btn${view === 'login' ? ' active' : ''}`}
            onClick={() => switchView('login')}
          >
            Log In
          </button>
        </div>

        {/* ── SIGN UP ── */}
        {view === 'signup' && (
          <>
            <h1 className="auth-heading">Create Your Account</h1>
            <p className="auth-sub">Start your moral learning journey today.</p>

            <form className="auth-form" onSubmit={handleSignup} noValidate>

              <div className="auth-field">
                <label>{T('auth_name')}</label>
                <input
                  type="text"
                  placeholder="Your full name"
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
                <div className="auth-input-wrap">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrap">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowConfirm(v => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label>{T('auth_choose_lang')}</label>
                <div className="auth-lang-row" style={{ marginTop: '0.4rem', marginBottom: 0 }}>
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
              <button className="auth-link" onClick={() => switchView('login')}>
                {T('auth_login')}
              </button>
            </p>
          </>
        )}

        {/* ── LOG IN ── */}
        {view === 'login' && (
          <>
            <h1 className="auth-heading">{T('auth_login_heading')}</h1>
            <p className="auth-sub">{T('auth_welcome_back')} — continue your journey.</p>

            <form className="auth-form" onSubmit={handleLogin} noValidate>

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
                <div className="auth-input-wrap">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit-btn">
                {T('auth_login')}
              </button>
            </form>

            <p className="auth-switch">
              {T('auth_no_account')}{' '}
              <button className="auth-link" onClick={() => switchView('signup')}>
                {T('auth_signup')}
              </button>
            </p>
          </>
        )}
      </div>

      {/* Bottom tri-color stripe (reversed) */}
      <div className="auth-stripe">
        <div style={{ flex: 1, background: RED   }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: GREEN }} />
      </div>
    </div>
  );
}
