/* locales.ts - Single Source of Truth for Localization */

export type Lang = 'fr' | 'en' | 'ar';

export interface Translations {
  navAbout: string;
  navCourses: string;
  navContact: string;
  navBlog: string;
  signIn: string;
  signUp: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleEasy: string;
  heroSubtitle: string;
  getStarted: string;
  watchVideo: string;
  whatWillYouGet: string;
  card1Val: string;
  card1Label: string;
  card2Val: string;
  card2Label: string;
  card3Val: string;
  card3Label: string;
  card4Title: string;
  card4Label: string;
  copyright: string;
}

export const locales: Record<Lang, Translations> = {
  fr: {
    navAbout: "À propos",
    navCourses: "Cours",
    navContact: "Contact",
    navBlog: "Blog",
    signIn: "Se connecter",
    signUp: "S'inscrire",
    heroBadge: "Intégration Tailwind CSS v4 et Système de Couleur",
    heroTitleLine1: "Développez vos",
    heroTitleLine2: "compétences en design.",
    heroTitleEasy: "Facile.",
    heroSubtitle: "Changez votre perspective sur le design digital et apprenez les métiers avec nos cours en ligne. Commençons à apprendre !",
    getStarted: "Commencer",
    watchVideo: "Regarder la vidéo",
    whatWillYouGet: "Qu'allez-vous obtenir ?",
    card1Val: "20+",
    card1Label: "projets dans le portfolio",
    card2Val: "12",
    card2Label: "mois d'apprentissage",
    card3Val: "50+",
    card3Label: "enseignants expérimentés",
    card4Title: "Parcourir les cours",
    card4Label: "trouvez votre voie",
    copyright: "Tous droits réservés."
  },
  en: {
    navAbout: "About Us",
    navCourses: "Courses",
    navContact: "Contact",
    navBlog: "Blog",
    signIn: "Sign in",
    signUp: "Sign Up",
    heroBadge: "Tailwind CSS v4 & Color System Applied",
    heroTitleLine1: "Grow your",
    heroTitleLine2: "design skills.",
    heroTitleEasy: "Easy.",
    heroSubtitle: "Change your perspective on digital design and learn the professions with our online courses. Let's start learning!",
    getStarted: "Get started",
    watchVideo: "Watch video",
    whatWillYouGet: "What Will You Get?",
    card1Val: "20+",
    card1Label: "works in portfolio",
    card2Val: "12",
    card2Label: "month of learning",
    card3Val: "50+",
    card3Label: "experienced teachers",
    card4Title: "Browse Courses",
    card4Label: "find your pathway",
    copyright: "All rights reserved."
  },
  ar: {
    navAbout: "من نحن",
    navCourses: "الدورات",
    navContact: "اتصل بنا",
    navBlog: "المدونة",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    heroBadge: "تم تطبيق نظام الألوان و Tailwind CSS v4",
    heroTitleLine1: "نمِّ مهاراتك",
    heroTitleLine2: "في التصميم.",
    heroTitleEasy: "بسهولة.",
    heroSubtitle: "غيّر نظرتك للتصميم الرقمي وتعلّم المهن من خلال دوراتنا عبر الإنترنت. لنبدأ التعلم!",
    getStarted: "ابدأ الآن",
    watchVideo: "شاهد الفيديو",
    whatWillYouGet: "ماذا ستحصل عليه؟",
    card1Val: "+20",
    card1Label: "عمل في المحفظة",
    card2Val: "12",
    card2Label: "شهراً من التعلم",
    card3Val: "+50",
    card3Label: "معلم ذو خبرة",
    card4Title: "تصفح الدورات",
    card4Label: "ابحث عن مسارك",
    copyright: "جميع الحقوق محفوظة."
  }
};
