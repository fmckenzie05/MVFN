// ─────────────────────────────────────────────────────────
//  MVFN — Translations
//  Languages: en (US English) | pat (Patois) | es (Spanish)
// ─────────────────────────────────────────────────────────

export const LANGUAGES = [
  { code: 'en',  label: 'English',  flag: '🇺🇸', native: 'English' },
  { code: 'pat', label: 'Patois',   flag: '🇯🇲', native: 'Patois' },
  { code: 'es',  label: 'Spanish',  flag: '🇪🇸', native: 'Español' },
];

const t = {
  // ── AUTH ──────────────────────────────────────────────
  auth_join_heading: {
    en:  'Join the Movement',
    pat: 'Link Up Wid di Movement',
    es:  'Únete al Movimiento',
  },
  auth_join_sub: {
    en:  'A moral teaching platform for young minds.',
    pat: 'A moral teachin platform fi young minds.',
    es:  'Una plataforma de enseñanza moral para mentes jóvenes.',
  },
  auth_choose_lang: {
    en:  'Choose your language',
    pat: 'Pick yuh language',
    es:  'Elige tu idioma',
  },
  auth_tiktok_btn: {
    en:  'Continue with TikTok',
    pat: 'Link In Wid TikTok',
    es:  'Continuar con TikTok',
  },
  auth_or: {
    en:  'or',
    pat: 'or',
    es:  'o',
  },
  auth_email_btn: {
    en:  'Sign up with Email',
    pat: 'Sign Up Wid Email',
    es:  'Registrarse con Email',
  },
  auth_already: {
    en:  'Already have an account?',
    pat: 'Already have an account?',
    es:  '¿Ya tienes una cuenta?',
  },
  auth_login: {
    en:  'Log in',
    pat: 'Link In',
    es:  'Iniciar sesión',
  },
  auth_name: {
    en:  'Full Name',
    pat: 'Yuh Name',
    es:  'Nombre completo',
  },
  auth_email: {
    en:  'Email Address',
    pat: 'Email Address',
    es:  'Correo electrónico',
  },
  auth_password: {
    en:  'Create Password',
    pat: 'Create Password',
    es:  'Crear contraseña',
  },
  auth_create_acc: {
    en:  'Create My Account',
    pat: 'Create Mi Account',
    es:  'Crear mi cuenta',
  },
  auth_back: {
    en:  'Back',
    pat: 'Go Back',
    es:  'Volver',
  },
  auth_welcome_back: {
    en:  'Welcome back',
    pat: 'Bless Up',
    es:  'Bienvenido de vuelta',
  },
  auth_login_heading: {
    en:  'Log back in',
    pat: 'Link Back In',
    es:  'Vuelve a iniciar sesión',
  },
  auth_no_account: {
    en:  'No account yet?',
    pat: 'No account yet?',
    es:  '¿No tienes cuenta?',
  },
  auth_signup: {
    en:  'Sign up',
    pat: 'Link Up',
    es:  'Regístrate',
  },
  auth_tiktok_note: {
    en:  'You\'ll be redirected to TikTok to authorize. We only request your display name and profile picture.',
    pat: 'Yuh a go to TikTok fi authorize. We only ask fi yuh name and profile picture.',
    es:  'Serás redirigido a TikTok para autorizar. Solo solicitamos tu nombre y foto de perfil.',
  },
  auth_callback_processing: {
    en:  'Connecting your TikTok…',
    pat: 'Linkin up yuh TikTok…',
    es:  'Conectando tu TikTok…',
  },

  // ── NAV ───────────────────────────────────────────────
  nav_dashboard: {
    en:  'Dashboard',
    pat: 'Home Base',
    es:  'Inicio',
  },
  nav_learn: {
    en:  'Learn',
    pat: 'Overstand',
    es:  'Aprender',
  },
  nav_community: {
    en:  'Community',
    pat: 'di Yard',
    es:  'Comunidad',
  },
  nav_network: {
    en:  'Network',
    pat: 'Connections',
    es:  'Red',
  },
  nav_profile: {
    en:  'Profile',
    pat: 'Profile',
    es:  'Perfil',
  },

  // ── DASHBOARD ─────────────────────────────────────────
  dash_tagline: {
    en:  '"Moral is the Leader"',
    pat: '"Moral a di Leader"',
    es:  '"La Moral es el Líder"',
  },
  dash_sub: {
    en:  'A teaching platform for moral growth, oneness, and community.',
    pat: 'A teachin platform fi moral growth, oneness, and community.',
    es:  'Una plataforma de enseñanza para el crecimiento moral, la unidad y la comunidad.',
  },
  dash_remaining: {
    en:  (n) => `${n} lessons remaining on your journey.`,
    pat: (n) => `${n} lessons left pon yuh journey.`,
    es:  (n) => `${n} lecciones restantes en tu camino.`,
  },
  dash_all_done: {
    en:  'You have completed all 20 lessons!',
    pat: 'Yu done all 20 lessons! Respect!',
    es:  '¡Has completado las 20 lecciones!',
  },
  dash_continue_learning: {
    en:  '📖 Continue Learning',
    pat: '📖 Keep on Learnin\'',
    es:  '📖 Continuar Aprendiendo',
  },
  dash_btn_learn: {
    en:  'Continue Learning',
    pat: 'Keep Learnin\'',
    es:  'Continuar Aprendiendo',
  },
  dash_btn_community: {
    en:  '💬 Community Feed',
    pat: '💬 Yard Feed',
    es:  '💬 Feed de la Comunidad',
  },
  dash_lessons_done: {
    en:  'Lessons Completed',
    pat: 'Lessons Done',
    es:  'Lecciones Completadas',
  },
  dash_progress: {
    en:  'Overall Progress',
    pat: 'How Far Yu Reach',
    es:  'Progreso General',
  },
  dash_posts: {
    en:  'Community Posts',
    pat: 'Yard Posts',
    es:  'Publicaciones de la Comunidad',
  },
  dash_journey: {
    en:  'Your Moral Journey',
    pat: 'Yuh Moral Journey',
    es:  'Tu Camino Moral',
  },
  dash_next_lesson: {
    en:  'Next Lesson',
    pat: 'Next Lesson',
    es:  'Próxima Lección',
  },
  dash_pillars: {
    en:  '🌍 All 20 Moral Pillars',
    pat: '🌍 All 20 Moral Pillars',
    es:  '🌍 Los 20 Pilares Morales',
  },
  dash_highlights: {
    en:  '💬 Community Highlights',
    pat: '💬 Yard Highlights',
    es:  '💬 Destacados de la Comunidad',
  },
  dash_view_all: {
    en:  'View All →',
    pat: 'See All →',
    es:  'Ver Todo →',
  },
  dash_start: {
    en:  'Start →',
    pat: 'Go →',
    es:  'Empezar →',
  },
  dash_mission: {
    en:  '"The moral value foundation network is needed to rebuild a nation unified in oneness and moral integrity."',
    pat: '"Di moral value foundation network a needed fi rebuild a nation unified in oneness and moral integrity."',
    es:  '"La red de fundamentos de valores morales es necesaria para reconstruir una nación unificada en unidad e integridad moral."',
  },

  // ── LEARN ─────────────────────────────────────────────
  learn_title: {
    en:  'Moral Lessons',
    pat: 'Moral Lessons',
    es:  'Lecciones Morales',
  },
  learn_sub: {
    en:  '20 pillars of moral knowledge — work through each at your own pace.',
    pat: '20 moral pillars — tek yuh time and work through each one.',
    es:  '20 pilares de conocimiento moral — trabaja en cada uno a tu propio ritmo.',
  },
  learn_complete: {
    en:  'Complete',
    pat: 'Done',
    es:  'Completo',
  },
  learn_start: {
    en:  'Start Lesson',
    pat: 'Start di Lesson',
    es:  'Iniciar Lección',
  },
  learn_completed_label: {
    en:  '✓ Completed',
    pat: '✓ Done',
    es:  '✓ Completado',
  },

  // ── COMMUNITY ─────────────────────────────────────────
  comm_feed_title: {
    en:  'Moral Community Feed',
    pat: 'Yard Feed',
    es:  'Feed de la Comunidad Moral',
  },
  comm_all_posts: {
    en:  'All Posts',
    pat: 'All Posts',
    es:  'Todas las Publicaciones',
  },
  comm_placeholder: {
    en:  'Share your moral reflection with the community…',
    pat: 'Drop yuh moral reflection inna di yard…',
    es:  'Comparte tu reflexión moral con la comunidad…',
  },
  comm_tag_pillar: {
    en:  'Tag a moral pillar…',
    pat: 'Tag a moral pillar…',
    es:  'Etiquetar un pilar moral…',
  },
  comm_post_btn: {
    en:  'Post Reflection',
    pat: 'Drop di Reflection',
    es:  'Publicar Reflexión',
  },
  comm_members: {
    en:  'Community Members',
    pat: 'Yard Members',
    es:  'Miembros de la Comunidad',
  },
  comm_trending: {
    en:  'Trending Pillars',
    pat: 'Hot Pillars',
    es:  'Pilares Tendencia',
  },
  comm_follow: {
    en:  'Follow',
    pat: 'Follow',
    es:  'Seguir',
  },
  comm_following: {
    en:  'Following',
    pat: 'Following',
    es:  'Siguiendo',
  },
  comm_comment_placeholder: {
    en:  'Add a comment…',
    pat: 'Drop a comment…',
    es:  'Agregar un comentario…',
  },
  comm_post_label: {
    en:  'Post',
    pat: 'Drop it',
    es:  'Publicar',
  },

  // ── LESSON ────────────────────────────────────────────
  lesson_back: {
    en:  '← Back to Lessons',
    pat: '← Back to Lessons',
    es:  '← Volver a Lecciones',
  },
  lesson_chapter_of: {
    en:  (n, t) => `Chapter ${n} of ${t}`,
    pat: (n, t) => `Chapter ${n} of ${t}`,
    es:  (n, t) => `Capítulo ${n} de ${t}`,
  },
  lesson_knowledge_check: {
    en:  '📝 Knowledge Check',
    pat: '📝 Check Yuh Knowledge',
    es:  '📝 Verificación de Conocimiento',
  },
  lesson_check_answers: {
    en:  'Check My Answers',
    pat: 'Check Mi Answers',
    es:  'Verificar Mis Respuestas',
  },
  lesson_correct: {
    en:  '✓ Great work! You answered everything correctly.',
    pat: '✓ Respect! Yu get dem all right.',
    es:  '✓ ¡Excelente trabajo! Respondiste todo correctamente.',
  },
  lesson_incorrect: {
    en:  '✗ Some answers need review. Read back through the lesson and try again.',
    pat: '✗ Some answers wrong. Read back through di lesson and try again.',
    es:  '✗ Algunas respuestas necesitan revisión. Vuelve a leer la lección e inténtalo de nuevo.',
  },
  lesson_retry: {
    en:  '↺ Retry Quiz',
    pat: '↺ Try Again',
    es:  '↺ Reintentar Quiz',
  },
  lesson_reflection: {
    en:  '💭 Moral Reflection',
    pat: '💭 Moral Reflection',
    es:  '💭 Reflexión Moral',
  },
  lesson_reflect_placeholder: {
    en:  'Write your moral reflection here…',
    pat: 'Drop yuh moral reflection here…',
    es:  'Escribe tu reflexión moral aquí…',
  },
  lesson_share: {
    en:  '💬 Share to Community',
    pat: '💬 Share to di Yard',
    es:  '💬 Compartir con la Comunidad',
  },
  lesson_mark_complete: {
    en:  '✓ Mark Lesson Complete',
    pat: '✓ Mark Lesson Done',
    es:  '✓ Marcar Lección Completada',
  },
  lesson_shared: {
    en:  '✓ Your reflection has been shared to the community!',
    pat: '✓ Yuh reflection reach di yard!',
    es:  '✓ ¡Tu reflexión ha sido compartida con la comunidad!',
  },
  lesson_complete_banner: {
    en:  '✓ You have completed this lesson. Keep going!',
    pat: '✓ Yu done dis lesson. Keep it moving!',
    es:  '✓ Has completado esta lección. ¡Sigue adelante!',
  },
  lesson_prev: {
    en:  '← Previous',
    pat: '← Previous',
    es:  '← Anterior',
  },
  lesson_next: {
    en:  'Next →',
    pat: 'Next →',
    es:  'Siguiente →',
  },

  // ── PROFILE ───────────────────────────────────────────
  profile_lessons: {
    en:  'Lessons',
    pat: 'Lessons',
    es:  'Lecciones',
  },
  profile_progress: {
    en:  'Progress',
    pat: 'Progress',
    es:  'Progreso',
  },
  profile_posts: {
    en:  'Posts',
    pat: 'Posts',
    es:  'Publicaciones',
  },
  profile_following: {
    en:  'Following',
    pat: 'Following',
    es:  'Siguiendo',
  },
  profile_moral_progress: {
    en:  'Overall Moral Progress',
    pat: 'Overall Moral Progress',
    es:  'Progreso Moral General',
  },
  profile_achievements: {
    en:  '🏅 Moral Achievements',
    pat: '🏅 Moral Achievements',
    es:  '🏅 Logros Morales',
  },
  profile_lesson_progress: {
    en:  '📚 Lesson Progress',
    pat: '📚 Lesson Progress',
    es:  '📚 Progreso de Lecciones',
  },
  profile_your_posts: {
    en:  '💬 Your Community Posts',
    pat: '💬 Yuh Yard Posts',
    es:  '💬 Tus Publicaciones en la Comunidad',
  },
  profile_logout: {
    en:  'Log Out',
    pat: 'Log Out',
    es:  'Cerrar Sesión',
  },
};

/**
 * useT — translation accessor
 * @param {string} lang - 'en' | 'pat' | 'es'
 * @returns {function} translate(key, ...args)
 */
export function makeT(lang) {
  return function translate(key, ...args) {
    const entry = t[key];
    if (!entry) return key;
    const val = entry[lang] ?? entry['en'] ?? key;
    return typeof val === 'function' ? val(...args) : val;
  };
}
