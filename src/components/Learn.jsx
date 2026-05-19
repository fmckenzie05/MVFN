import { chapters } from '../data/chapters';

export default function Learn({ completedLessons, setCurrentChapter, setPage }) {
  const pct = Math.round((completedLessons.size / chapters.length) * 100);

  function openLesson(id) {
    setCurrentChapter(id);
    setPage('lesson');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page-container">
      <div className="learn-header">
        <h1>Moral Lessons</h1>
        <p>20 pillars of moral knowledge — work through each at your own pace.</p>
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
                    {done ? '✓ Completed' : 'Start Lesson'}
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
