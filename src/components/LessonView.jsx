import { useState } from 'react';
import { chapters } from '../data/chapters';

function SectionBlock({ section }) {
  const cls = {
    steps:       'ls-list steps',
    consequences:'ls-list consequences',
    tips:        'ls-list tips',
    list:        'ls-list',
    examples:    'ls-list',
  }[section.type] || 'ls-list';

  return (
    <div className="lesson-section">
      <div className="ls-heading">{section.heading}</div>
      {section.items && (
        <ul className={cls}>
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {section.body && <div className="ls-info-body">{section.body}</div>}
    </div>
  );
}

function QuizBlock({ quiz, onPass }) {
  const [answers, setAnswers]   = useState({});
  const [checked, setChecked]   = useState(false);
  const [passed, setPassed]     = useState(false);

  function select(qi, oi) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qi]: oi }));
  }

  function check() {
    if (Object.keys(answers).length < quiz.length) return;
    const allCorrect = quiz.every((q, i) => answers[i] === q.answer);
    setChecked(true);
    setPassed(allCorrect);
    if (allCorrect) onPass();
  }

  function retry() {
    setAnswers({});
    setChecked(false);
    setPassed(false);
  }

  return (
    <div className="quiz-section">
      <div className="quiz-title">📝 Knowledge Check</div>

      {quiz.map((q, qi) => (
        <div className="quiz-q" key={qi}>
          <div className="quiz-q-text">{qi + 1}. {q.question}</div>
          <div className="quiz-options">
            {q.options.map((opt, oi) => {
              let cls = 'quiz-option';
              if (checked) {
                if (oi === q.answer) cls += ' correct';
                else if (answers[qi] === oi && oi !== q.answer) cls += ' wrong';
              } else if (answers[qi] === oi) {
                cls += ' selected';
              }
              return (
                <button key={oi} className={cls} onClick={() => select(qi, oi)} disabled={checked}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!checked ? (
        <button className="quiz-check-btn" onClick={check}>
          Check My Answers
        </button>
      ) : (
        <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
          {passed
            ? '✓ Great work! You answered everything correctly.'
            : '✗ Some answers need review. Read back through the lesson and try again.'}
          {!passed && (
            <button onClick={retry} style={{ display: 'block', marginTop: '0.6rem', background: 'none', color: '#b71c1c', fontWeight: 700, cursor: 'pointer', border: 'none', fontSize: '0.85rem' }}>
              ↺ Retry Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function LessonView({ chapterId, setPage, setCurrentChapter, completedLessons, markComplete, onShareToFeed }) {
  const idx     = chapters.findIndex(c => c.id === chapterId);
  const chapter = chapters[idx];
  const prev    = chapters[idx - 1] || null;
  const next    = chapters[idx + 1] || null;

  const [quizPassed,    setQuizPassed]    = useState(completedLessons.has(chapterId));
  const [reflection,    setReflection]    = useState('');
  const [shared,        setShared]        = useState(false);

  const isComplete = completedLessons.has(chapterId);

  if (!chapter) return null;

  function handleShare() {
    if (!reflection.trim()) return;
    onShareToFeed({
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      text: reflection,
    });
    setShared(true);
  }

  function goChapter(id) {
    setCurrentChapter(id);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="page-container">
      <div className="lesson-view">
        <button className="lesson-back" onClick={() => setPage('learn')}>
          ← Back to Lessons
        </button>

        {/* Hero */}
        <div
          className="lesson-hero"
          data-icon={chapter.icon}
          style={{ background: `linear-gradient(135deg, ${chapter.color}, ${chapter.color}cc)` }}
        >
          <div className="lh-num">Chapter {chapter.number} of {chapters.length}</div>
          <h1 className="lh-title">{chapter.title}</h1>
          <div className="lh-subtitle">{chapter.subtitle}</div>
          <div className="lh-meta">
            <span className="lh-tag">⏱ {chapter.duration}</span>
            {isComplete && <span className="lh-tag">✓ Completed</span>}
          </div>
        </div>

        {/* Complete banner */}
        {isComplete && (
          <div className="lesson-complete-banner">
            ✓ You have completed this lesson. Keep going!
          </div>
        )}

        {/* Overview */}
        <div className="lesson-overview-box">{chapter.overview}</div>

        {/* Sections */}
        {chapter.sections.map((s, i) => <SectionBlock key={i} section={s} />)}

        {/* Quiz */}
        <QuizBlock quiz={chapter.quiz} onPass={() => setQuizPassed(true)} />

        {/* Reflection */}
        <div className="reflection-section">
          <h3>💭 Moral Reflection</h3>
          <p className="reflection-prompt">{chapter.reflection}</p>
          {shared ? (
            <div style={{ color: '#c8971f', fontWeight: 700, padding: '0.75rem 0' }}>
              ✓ Your reflection has been shared to the community!
            </div>
          ) : (
            <textarea
              className="reflection-textarea"
              placeholder="Write your moral reflection here…"
              value={reflection}
              onChange={e => setReflection(e.target.value)}
            />
          )}
          <div className="reflection-actions">
            {!shared && (
              <button className="btn-share-community" onClick={handleShare}>
                💬 Share to Community
              </button>
            )}
            {quizPassed && !isComplete && (
              <button
                className="btn-complete-lesson"
                onClick={() => markComplete(chapter.id)}
              >
                ✓ Mark Lesson Complete
              </button>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="lesson-nav-row">
          {prev ? (
            <button className="lesson-nav-btn" onClick={() => goChapter(prev.id)}>
              <div className="lnb-label">← Previous</div>
              <div className="lnb-title">{prev.title}</div>
            </button>
          ) : <div />}
          {next ? (
            <button className="lesson-nav-btn next" onClick={() => goChapter(next.id)}>
              <div className="lnb-label">Next →</div>
              <div className="lnb-title">{next.title}</div>
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
