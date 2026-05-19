import { useState } from 'react';
import { LANGUAGES, makeT } from '../i18n/index';

const GREEN = '#009B3A';
const GOLD  = '#FFD100';
const RED   = '#CC0000';

export default function AuthPage({ lang, setLang, onLogin }) {
  const [view, setView]         = useState('landing'); // landing | signup | login
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const T = makeT(lang);

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
    onLogin({
      name:   name.trim(),
      handle: name.trim().toLowerCase().replace(/\s+/g, ''),
      avatar: '🌱',
      lang,
      provider: 'email',
    });
  }

  function handleGuestLogin() {
    onLogin({
      name: 'Guest User',
      handle: 'guest',
      avatar: '👋',
      lang,
      provider: 'guest',
    });
  }

  function handleEmailLogin(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
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
      <div className="auth-stripe">
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: RED   }} />
      </div>

      <div className="auth-card">
        <div className="auth-logo-wrap">
          <div className="auth-logo-ring">
            <span className="auth-logo-text">MVFN</span>
          </div>
          <div className="auth-logo-sub">Moral Value Foundation Network</div>
        </div>

        {view === 'landing' && (
          <>
            <h1 className="auth-heading">{T('auth_join_heading')}</h1>
            <p className="auth-sub">{T('auth_join_sub')}</p>

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

            <button
              className="auth-email-btn"
              onClick={() => { setView('signup'); setError(''); }}
            >
              {T('auth_email_btn')}
            </button>

            <button
              className="auth-guest-btn"
              onClick={handleGuestLogin}
            >
              Continue as guest
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

            <p className="auth-tiktok-note">Social sign-in is temporarily unavailable.</p>
          </>
        )}

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
          </>
        )}

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
          </>
        )}
      </div>

      <div className="auth-stripe">
        <div style={{ flex: 1, background: RED   }} />
        <div style={{ flex: 1, background: GOLD  }} />
        <div style={{ flex: 1, background: GREEN }} />
      </div>
    </div>
  );
}
