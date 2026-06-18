import { courses } from '../data/chapters';
import { makeT } from '../i18n/index';

export default function Learn({ completedLessons, setCurrentChapter, setPage, lang = 'en' }) {
  const T = makeT(lang);
  const course = courses[0];
  const packages = course.packages;
  const pct = Math.round((completedLessons.size / packages.length) * 100);

  function openPackage(id) {
    setCurrentChapter(id);
    setPage('lesson');
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page-container">
      {/* Course hero banner */}
      <div
        className="course-hero"
        style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}cc)` }}
      >
        <div className="course-hero-badge">
          <span className="course-hero-icon">{course.icon}</span>
          <span className="course-hero-label">{T('learn_course_label', course.number)}</span>
        </div>
        <h1 className="course-hero-title">{course.title}</h1>
        <p className="course-hero-subtitle">{course.subtitle}</p>
        <p className="course-hero-desc">{course.description}</p>
        <div className="course-hero-meta">
          <span className="course-meta-tag">{packages.length} {T('learn_packages')}</span>
          <span className="course-meta-tag">{completedLessons.size} {T('learn_complete')}</span>
        </div>
      </div>

      {/* Course progress */}
      <div className="learn-progress-bar">
        <div className="lpb-track">
          <div className="lpb-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="lpb-label">
          {completedLessons.size}/{packages.length} {T('learn_packages')} · {pct}%
        </div>
      </div>

      {/* Section heading */}
      <div className="learn-section-heading">
        <h2>{T('learn_curriculum')}</h2>
      </div>

      {/* Package grid */}
      <div className="lessons-grid">
        {packages.map(ch => {
          const done = completedLessons.has(ch.id);
          return (
            <div
              key={ch.id}
              className={`lesson-card${done ? ' completed' : ''}`}
              onClick={() => openPackage(ch.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openPackage(ch.id)}
            >
              <div className="lc-bar" style={{ background: ch.accent }} />
              <div className="lc-body">
                <div className="lc-top">
                  <div className="lc-icon" style={{ background: `${ch.color}20`, color: ch.color }}>
                    {ch.icon}
                  </div>
                  <div>
                    <div className="lc-num" style={{ color: ch.accent }}>{T('learn_package_num', ch.number)}</div>
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
