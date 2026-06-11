import { chapters } from '../data/chapters';
import { makeT } from '../i18n/index';

export default function Learn({ completedLessons, setCurrentChapter, setPage, lang = 'en' }) {
  const T = makeT(lang);
  const pct = Math.round((completedLessons.size / chapters.length) * 100);

  function openLesson(id) {
    setCurrentChapter(id);
    setPage('lesson');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page-container">
      <div className="learn-header">
        <h1>{T('learn_title')}</h1>
        <p>{T('learn_sub')}</p>
      </div>

      <div className="learn-progress-bar">
        <div className="lpb-track">
          <div className="lpb-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="lpb-label">
          {completedLessons.size}/{chapters.length} Complete · {pct}%
        </div>
      </div>

      <div className="lessons-grid">
        {chapters.map(ch => {
          const done = completedLessons.has(ch.id);
          return (
            <div
              key={ch.id}
              className={`lesson-card${done ? ' completed' : ''}`}
              onClick={() => openLesson(ch.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openLesson(ch.id)}
            >
              <div className="lc-bar" style={{ background: ch.accent }} />
              <div className="lc-body">
                <div className="lc-top">
                  <div className="lc-icon" style={{ background: `${ch.color}20`, color: ch.color }}>
                    {ch.icon}
                  </div>
                  <div>
                    <div className="lc-num" style={{ color: ch.accent }}>Chapter {ch.number}</div>
                    <div className="lc-title">{ch.title}</div>
                    <div className="lc-subtitle">{ch.subtitle}</div>
                  </div>
                </div>
                <p className="lc-overview">{ch.overview}</p>
                <div className="lc-footer">
                  <span className="lc-duration">⏱ {ch.duration}</span>
                  <span className={`lc-status ${done ? 'done' : 'todo'}`}>
                    {done ? T('learn_completed_label') : T('learn_start')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
