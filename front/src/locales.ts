/* locales.ts - Single Source of Truth for Localization */

export type Lang = 'fr' | 'en' | 'ar';

export interface Translations {
  home: string;
  formations: string;
  about: string;
  contact: string;
  heroTitleLine1: string;
  heroTitleLine2Prefix: string;
  heroTitleLine2Highlight: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  whatsappCTA: string;
  formationsText: string;
  aboutText: string;
  contactText: string;
  copyright: string;
  // Formations Section keys
  formationsBadge: string;
  formationsTitle: string;
  formationsSubtitle: string;
  webDevTitle: string;
  webDevDesc: string;
  appDevTitle: string;
  appDevDesc: string;
  marketingTitle: string;
  marketingDesc: string;
  businessTitle: string;
  businessDesc: string;
  iotTitle: string;
  iotDesc: string;
  roboticsTitle: string;
  roboticsDesc: string;
  languagesTitle: string;
  languagesDesc: string;
  kidsBadge: string;
  // About Section keys
  aboutBadge: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  // Contact Section keys
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  contactPhoneTitle: string;
  contactPhoneDesc: string;
  contactEmailTitle: string;
  contactEmailDesc: string;
  contactWhatsappTitle: string;
  contactWhatsappDesc: string;
  contactSocialsTitle: string;
  contactSocialsDesc: string;
  contactButton: string;
  // Admin keys
  adminLoginTitle: string;
  adminLoginSubtitle: string;
  adminEmailLabel: string;
  adminPasswordLabel: string;
  adminConnectBtn: string;
  adminBackBtn: string;
  adminInvalidCreds: string;
  adminDashboardTitle: string;
  adminLogoutBtn: string;
}

export const locales: Record<Lang, Translations> = {
  fr: {
    home: "Accueil",
    formations: "Formations",
    about: "À propos",
    contact: "Contact",
    heroTitleLine1: "Boostez votre carrière",
    heroTitleLine2Prefix: "avec ",
    heroTitleLine2Highlight: "InnoTwist",
    heroSubtitle1: "Chaque parcours d'apprentissage est unique",
    heroSubtitle2: "Nous sommes là pour vous guider",
    whatsappCTA: "Réservez maintenant",
    formationsText: "Découvrez notre catalogue de formations accélérées.",
    aboutText: "Nous créons des designs et des technologies d'apprentissage d'avant-garde.",
    contactText: "Une question ou un projet ? Notre équipe est là pour vous accompagner.",
    copyright: "Tous droits réservés.",
    // Formations Section
    formationsBadge: "Catégories des formations",
    formationsTitle: "Nos formations accélérées",
    formationsSubtitle: "Découvrez les catégories des formations les plus demandées en ce moment",
    webDevTitle: "Développement Web",
    webDevDesc: "Créez des sites internet et plateformes modernes et interactifs.",
    appDevTitle: "Développement Mobile",
    appDevDesc: "Concevez des applications mobiles iOS et Android natives.",
    marketingTitle: "Marketing Digital",
    marketingDesc: "Maîtrisez le SEO, le social media, le copywriting et la publicité.",
    businessTitle: "Business Development",
    businessDesc: "Apprenez les techniques de vente, de négociation et de stratégie commerciale.",
    iotTitle: "IoT & Objets Connectés",
    iotDesc: "Concevez des systèmes intelligents et reliez le matériel au cloud.",
    roboticsTitle: "Robotique & Arduino",
    roboticsDesc: "Construisez et programmez vos propres robots autonomes.",
    languagesTitle: "Langues & Com",
    languagesDesc: "Maîtrisez les langues étrangères (Anglais, Allemand, Français).",
    kidsBadge: "Espace Enfants",
    // About Section
    aboutBadge: "Qui sommes-nous ?",
    aboutTitle: "À propos d'InnoTwist",
    aboutParagraph1: "InnoTwist est un centre de formation accélérée qui se consacre à aider les individus à acquérir des compétences professionnelles d'avenir. Nous offrons une variété de programmes de formation conçus sur mesure pour répondre aux besoins changeants de nos étudiants et du marché du travail.",
    aboutParagraph2: "Chez InnoTwist, nous croyons fermement que la formation de haut niveau doit être accessible à tous. C'est pourquoi nous proposons des horaires flexibles et des tarifs compétitifs, permettant à chacun d'atteindre ses objectifs professionnels sans compromis.",
    aboutParagraph3: "Nous sommes particulièrement fiers de notre équipe de formateurs hautement qualifiés et expérimentés. Ils utilisent des méthodes d'enseignement innovantes et interactives pour aider nos étudiants à maximiser leur potentiel et à exceller durablement dans leur domaine.",
    // Contact Section
    contactBadge: "Contactez-nous",
    contactTitle: "Discutons de votre projet",
    contactSubtitle: "Une question sur nos formations ? Notre équipe de conseillers est à votre entière disposition pour vous guider dans votre choix.",
    contactPhoneTitle: "Téléphone",
    contactPhoneDesc: "Appelez notre secrétariat",
    contactEmailTitle: "E-mail",
    contactEmailDesc: "Envoyez-nous un e-mail",
    contactWhatsappTitle: "WhatsApp",
    contactWhatsappDesc: "Discutez en direct 24/7",
    contactSocialsTitle: "Réseaux Sociaux",
    contactSocialsDesc: "Suivez-nous sur Instagram & FB",
    contactButton: "Visiter le portail InnoTwist",
    // Admin
    adminLoginTitle: "Espace Administrateur",
    adminLoginSubtitle: "Veuillez vous connecter pour gérer la plateforme.",
    adminEmailLabel: "Adresse E-mail",
    adminPasswordLabel: "Mot de passe",
    adminConnectBtn: "Se connecter",
    adminBackBtn: "Retour au site",
    adminInvalidCreds: "Adresse e-mail ou mot de passe incorrect.",
    adminDashboardTitle: "Tableau de Bord Admin",
    adminLogoutBtn: "Se déconnecter"
  },
  en: {
    home: "Home",
    formations: "Formations",
    about: "About Us",
    contact: "Contact",
    heroTitleLine1: "Boost your career",
    heroTitleLine2Prefix: "with ",
    heroTitleLine2Highlight: "InnoTwist",
    heroSubtitle1: "Every learning path is unique",
    heroSubtitle2: "We are here to guide you",
    whatsappCTA: "Book Now",
    formationsText: "Explore our catalog of accelerated training programs.",
    aboutText: "We build cutting-edge learning designs and educational technologies.",
    contactText: "Have a question or a project? Our team is here to support you.",
    copyright: "All rights reserved.",
    // Formations Section
    formationsBadge: "Training Categories",
    formationsTitle: "Our Accelerated Formations",
    formationsSubtitle: "Discover the most in-demand training categories right now",
    webDevTitle: "Web Development",
    webDevDesc: "Build modern, highly interactive websites and web applications.",
    appDevTitle: "App Development",
    appDevDesc: "Design and build native mobile applications for iOS and Android.",
    marketingTitle: "Digital Marketing",
    marketingDesc: "Master SEO, social media campaigns, copywriting, and advertising.",
    businessTitle: "Business Development",
    businessDesc: "Learn sales techniques, business negotiation, and growth strategy.",
    iotTitle: "IoT & Connected Objects",
    iotDesc: "Design smart interconnected devices and bridge hardware with cloud networks.",
    roboticsTitle: "Robotics & Arduino",
    roboticsDesc: "Build and program your own custom smart autonomous robots.",
    languagesTitle: "Languages & Com",
    languagesDesc: "Master foreign languages (English, German, French) for business.",
    kidsBadge: "Kids Space",
    // About Section
    aboutBadge: "Who are we?",
    aboutTitle: "About InnoTwist",
    aboutParagraph1: "InnoTwist is an accelerated training center dedicated to helping individuals acquire future-proof professional skills. We offer a wide variety of custom-tailored training programs to meet the evolving needs of our students and the job market.",
    aboutParagraph2: "At InnoTwist, we firmly believe that top-tier education should be accessible to everyone. This is why we provide highly flexible schedules and competitive rates, allowing anyone to reach their professional objectives without compromise.",
    aboutParagraph3: "We are exceptionally proud of our highly qualified and experienced trainers. They utilize innovative, interactive teaching methodologies to help our students maximize their potential and achieve long-term excellence in their fields.",
    // Contact Section
    contactBadge: "Get in touch",
    contactTitle: "Let's discuss your project",
    contactSubtitle: "Have a question about our trainings? Our team of academic advisors is available to guide you in your career decisions.",
    contactPhoneTitle: "Phone Call",
    contactPhoneDesc: "Call our support center",
    contactEmailTitle: "E-mail",
    contactEmailDesc: "Write to our academy mailbox",
    contactWhatsappTitle: "WhatsApp",
    contactWhatsappDesc: "Chat live with our agents",
    contactSocialsTitle: "Social Portals",
    contactSocialsDesc: "Follow us on Instagram & FB",
    contactButton: "Open InnoTwist Link Hub",
    // Admin
    adminLoginTitle: "Admin Portal",
    adminLoginSubtitle: "Please sign in to manage the platform.",
    adminEmailLabel: "Email Address",
    adminPasswordLabel: "Password",
    adminConnectBtn: "Sign In",
    adminBackBtn: "Back to website",
    adminInvalidCreds: "Incorrect email address or password.",
    adminDashboardTitle: "Admin Dashboard",
    adminLogoutBtn: "Sign Out"
  },
  ar: {
    home: "الرئيسية",
    formations: "التكوينات",
    about: "من نحن",
    contact: "اتصل بنا",
    heroTitleLine1: "عزز مسيرتك المهنية",
    heroTitleLine2Prefix: "مع ",
    heroTitleLine2Highlight: "إينوتويست",
    heroSubtitle1: "كل مسار تعليمي فريد من نوعه",
    heroSubtitle2: "نحن هنا لإرشادك",
    whatsappCTA: "احجز الآن",
    formationsText: "اكتشف كتالوج برامج التدريب والتكوينات السريعة لدينا.",
    aboutText: "نحن نبني تصميمات تعليمية وتقنيات تعليمية متطورة.",
    contactText: "لديك سؤال أو مشروع؟ فريقنا هنا لدعمك.",
    copyright: "جميع الحقوق محفوظة.",
    // Formations Section
    formationsBadge: "فئات التكوينات",
    formationsTitle: "تكويناتنا السريعة",
    formationsSubtitle: "اكتشف فئات التكوينات الأكثر طلباً في الوقت الحالي",
    webDevTitle: "تطوير الويب",
    webDevDesc: "أنشئ مواقع ويب وتطبيقات تفاعلية وحديثة.",
    appDevTitle: "تطوير التطبيقات",
    appDevDesc: "صمم وبرمج تطبيقات الهواتف الذكية لنظامي iOS و Android.",
    marketingTitle: "التسويق الرقمي",
    marketingDesc: "احترف السيو، حملات التواصل الاجتماعي، كتابة المحتوى، والإعلانات.",
    businessTitle: "تطوير الأعمال",
    businessDesc: "تعلم مهارات البيع، التفاوض التجاري، واستراتيجيات النمو.",
    iotTitle: "إنترنت الأشياء (IoT)",
    iotDesc: "صمم أجهزة ذكية مترابطة واربط العتاد المادي بالشبكات السحابية.",
    roboticsTitle: "الروبوتات وأردوينو",
    roboticsDesc: "قم ببناء وبرمجة روبوتاتك الذكية ذاتية التحكم.",
    languagesTitle: "اللغات والتواصل",
    languagesDesc: "أتقن اللغات الأجنبية (الإنجليزية، الألمانية، الفرنسية) للأعمال.",
    kidsBadge: "مساحة الأطفال",
    // About Section
    aboutBadge: "من نحن؟",
    aboutTitle: "حول إينوتويست",
    aboutParagraph1: "إينوتويست هو مركز للتدريب السريع مخصص لمساعدة الأفراد على اكتساب المهارات المهنية للمستقبل. نحن نقدم مجموعة متنوعة من البرامج التدريبية المصممة خصيصاً لتلبية الاحتياجات المتغيرة لطلابنا وسوق العمل.",
    aboutParagraph2: "في إينوتويست، نؤمن بشدة أن التعليم رفيع المستوى يجب أن يكون متاحاً للجميع. لهذا السبب نقدم جداول زمنية مرنة وأسعاراً تنافسية، مما يسمح للجميع بتحقيق أهدافهم المهنية دون مساومة.",
    aboutParagraph3: "نحن فخورون بشكل خاص بفريقنا من المدربين المؤهلين وذوي الخبرة العالية. إنهم يستخدمون منهجيات تدريس مبتكرة وتفاعلية لمساعدة طلابنا على تحقيق أقصى قدر من إمكاناتهم والتميز المستمر في مجالاتهم.",
    // Contact Section
    contactBadge: "تواصل معنا",
    contactTitle: "لنناقش مشروعك التدريبي",
    contactSubtitle: "لديك سؤال حول تكويناتنا؟ فريق المستشارين لدينا متاح بالكامل لإرشادك في خياراتك المهنية والتدريبية.",
    contactPhoneTitle: "اتصال هاتفي",
    contactPhoneDesc: "اتصل بسكرتارية الأكاديمية مباشرة",
    contactEmailTitle: "البريد الإلكتروني",
    contactEmailDesc: "أرسل رسالة إلى بريدنا الأكاديمي",
    contactWhatsappTitle: "واتساب",
    contactWhatsappDesc: "دردشة مباشرة مع مستشارينا 24/7",
    contactSocialsTitle: "حساباتنا الاجتماعية",
    contactSocialsDesc: "تابعنا على إنستغرام وفيسبوك",
    contactButton: "افتح بوابة إينوتويست للاتصال",
    // Admin
    adminLoginTitle: "بوابة المشرف",
    adminLoginSubtitle: "يرجى تسجيل الدخول لإدارة المنصة.",
    adminEmailLabel: "البريد الإلكتروني",
    adminPasswordLabel: "كلمة المرور",
    adminConnectBtn: "تسجيل الدخول",
    adminBackBtn: "العودة للموقع",
    adminInvalidCreds: "عنوان البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    adminDashboardTitle: "لوحة التحكم",
    adminLogoutBtn: "تسجيل الخروج"
  }
};
