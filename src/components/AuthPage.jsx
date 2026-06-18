import { useState } from 'react';
import { signUp, signIn } from '../lib/db';
import { LANGUAGES, makeT } from '../i18n/index';

const GREEN = '#009B3A';
const GOLD  = '#FFD100';
const RED   = '#CC0000';

export default function AuthPage({ lang, setLang }) {
  const T = makeT(lang);
  const [mode, setMode] = useState('welcome'); // welcome | signup | login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: err } = await signUp(email, password, name);
    setSubmitting(false);
    if (err) setError(err.message);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err.message);
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

        {/* ── Welcome screen ── */}
        {mode === 'welcome' && (
          <>
            <h1 className="auth-heading">Welcome to MVFN</h1>
            <p className="auth-sub">Start your moral learning journey today.</p>

            <div className="auth-form" style={{ gap: '1rem' }}>
              <button className="auth-submit-btn" onClick={() => setMode('signup')}>
                {T('auth_create_acc') || 'Create Account'}
              </button>
              <button
                className="auth-submit-btn"
                style={{ background: 'transparent', border: '1px solid rgba(212, 175, 55, 0.4)', color: '#d4af37' }}
                onClick={() => setMode('login')}
              >
                {T('auth_login') || 'Log In'}
              </button>
            </div>
          </>
        )}

        {/* ── Signup form ── */}
        {mode === 'signup' && (
          <>
            <h1 className="auth-heading">{T('auth_create_acc') || 'Create Account'}</h1>
            <form className="auth-form" onSubmit={handleSignup}>
              <input
                className="auth-input"
                type="text"
                placeholder={T('auth_name') || 'Full Name'}
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
              <input
                className="auth-input"
                type="email"
                placeholder={T('auth_email') || 'Email Address'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <input
                className="auth-input"
                type="password"
                placeholder={T('auth_password') || 'Create Password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-submit-btn" type="submit" disabled={submitting}>
                {submitting ? '...' : (T('auth_create_acc') || 'Create My Account')}
              </button>
            </form>
            <p className="auth-switch">
              {T('auth_already') || 'Already have an account?'}{' '}
              <button className="auth-link-btn" onClick={() => { setMode('login'); setError(''); }}>
                {T('auth_login') || 'Log in'}
              </button>
            </p>
            <button className="auth-link-btn" onClick={() => { setMode('welcome'); setError(''); }}>
              {T('auth_back') || 'Back'}
            </button>
          </>
        )}

        {/* ── Login form ── */}
        {mode === 'login' && (
          <>
            <h1 className="auth-heading">{T('auth_welcome_back') || 'Welcome back'}</h1>
            <p className="auth-sub">{T('auth_login_heading') || 'Log back in'}</p>
            <form className="auth-form" onSubmit={handleLogin}>
              <input
                className="auth-input"
                type="email"
                placeholder={T('auth_email') || 'Email Address'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <input
                className="auth-input"
                type="password"
                placeholder={T('auth_password') || 'Password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-submit-btn" type="submit" disabled={submitting}>
                {submitting ? '...' : (T('auth_login') || 'Log In')}
              </button>
            </form>
            <p className="auth-switch">
              {T('auth_no_account') || 'No account yet?'}{' '}
              <button className="auth-link-btn" onClick={() => { setMode('signup'); setError(''); }}>
                {T('auth_signup') || 'Sign up'}
              </button>
            </p>
            <button className="auth-link-btn" onClick={() => { setMode('welcome'); setError(''); }}>
              {T('auth_back') || 'Back'}
            </button>
          </>
        )}

        {/* Language selector */}
        <div style={{ marginTop: '1.5rem' }}>
          <label style={{ color: '#b0b0b0', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>
            {T('auth_choose_lang') || 'Choose your language'}
          </label>
          <div className="auth-lang-row">
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
