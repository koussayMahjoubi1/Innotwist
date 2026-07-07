import { useState, useEffect, useRef } from 'react'
import LottieComponent from 'lottie-react'
import { locales } from './locales'
import type { Lang } from './locales'
import onlineLearningAnimation from './assets/Online Learning.json'
import mouseScrollAnimation from './assets/mouse scroll animation.json'

const Lottie = (LottieComponent as any).default || LottieComponent

type Section = 'home' | 'formations' | 'about' | 'contact'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [lang, setLang] = useState<Lang>('fr')
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Lightweight Client-side Routing state
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    const hash = window.location.hash
    if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
      return '/admin'
    }
    return '/'
  })

  const isScrollingRef = useRef(false)
  const touchStartYRef = useRef(0)

  // Synchronize lightweight client-side routing pathname and hash triggers
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname
      const hash = window.location.hash
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        setCurrentPath('/admin')
      } else {
        setCurrentPath('/')
      }
    }
    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Smooth loading progress incrementer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 250)
          return 100
        }
        const increment = Math.floor(Math.random() * 8) + 6
        return Math.min(prev + increment, 100)
      })
    }, 45)
    return () => clearInterval(timer)
  }, [])

  // Reset scroll positions back to top when active section changes
  useEffect(() => {
    const resetScroll = () => {
      const rootEl = document.getElementById('root-container')
      if (rootEl) rootEl.scrollTop = 0

      const scrollEl = document.getElementById('scroll-content')
      if (scrollEl) scrollEl.scrollTop = 0
    }

    // Reset immediately
    resetScroll()

    // Reset multiple times to cancel browser inertial momentum scrolls on mobile
    const t1 = setTimeout(resetScroll, 50)
    const t2 = setTimeout(resetScroll, 150)
    const t3 = setTimeout(resetScroll, 300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [activeSection])

  // Wheel and Swipe listeners for presentation-style section switching
  useEffect(() => {
    // Disable slide transitions if we are on the admin path
    if (currentPath === '/admin') return

    const sections: Section[] = ['home', 'formations', 'about', 'contact']

    const handleWheel = (e: WheelEvent) => {
      const isDesktop = window.innerWidth >= 1024
      let scrollEl: HTMLElement | null = null

      if (isDesktop) {
        if (activeSection === 'formations') {
          scrollEl = document.getElementById('scroll-content')
        } else if (activeSection === 'about') {
          scrollEl = document.getElementById('about-scroll-content')
        }
      } else {
        scrollEl = document.getElementById('root-container')
      }

      let isScrollable = false
      let isAtTop = true
      let isAtBottom = true

      if (scrollEl) {
        isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight
        if (isScrollable) {
          isAtTop = scrollEl.scrollTop <= 0
          // 5px threshold ensures the scrollbar must reach the very bottom before switching
          isAtBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 5
        }
      }

      // If container is scrollable and not at boundary, let natural scrolling work
      if (isScrollable) {
        if (e.deltaY > 10 && !isAtBottom) return
        if (e.deltaY < -10 && !isAtTop) return
      }

      // Switching section -> prevent default wheel loop
      e.preventDefault()

      if (isScrollingRef.current) return

      const currentIndex = sections.indexOf(activeSection)
      let nextIndex = currentIndex

      if (e.deltaY > 10) {
        nextIndex = Math.min(currentIndex + 1, sections.length - 1)
      } else if (e.deltaY < -10) {
        nextIndex = Math.max(currentIndex - 1, 0)
      }

      if (nextIndex !== currentIndex) {
        isScrollingRef.current = true
        setActiveSection(sections[nextIndex])
        setTimeout(() => {
          isScrollingRef.current = false
        }, 850)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const isDesktop = window.innerWidth >= 1024
      let scrollEl: HTMLElement | null = null

      if (isDesktop) {
        if (activeSection === 'formations') {
          scrollEl = document.getElementById('scroll-content')
        } else if (activeSection === 'about') {
          scrollEl = document.getElementById('about-scroll-content')
        }
      } else {
        scrollEl = document.getElementById('root-container')
      }

      let isScrollable = false
      let isAtTop = true
      let isAtBottom = true

      if (scrollEl) {
        isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight
        if (isScrollable) {
          isAtTop = scrollEl.scrollTop <= 0
          isAtBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 5
        }
      }

      const touchEndY = e.changedTouches[0].clientY
      const diffY = touchStartYRef.current - touchEndY

      // Tap click or minor swipe -> return early to let native button taps work perfectly!
      if (Math.abs(diffY) <= 50) return

      // If container is scrollable and not at boundary, let natural swipe work
      if (isScrollable) {
        if (diffY > 50 && !isAtBottom) return
        if (diffY < -50 && !isAtTop) return
      }

      if (isScrollingRef.current) return

      const currentIndex = sections.indexOf(activeSection)
      let nextIndex = currentIndex

      if (diffY > 50) {
        nextIndex = Math.min(currentIndex + 1, sections.length - 1)
      } else if (diffY < -50) {
        nextIndex = Math.max(currentIndex - 1, 0)
      }

      if (nextIndex !== currentIndex) {
        // Prevent default touch scroll swipe only when transitioning sections
        e.preventDefault()
        isScrollingRef.current = true
        setActiveSection(sections[nextIndex])
        setTimeout(() => {
          isScrollingRef.current = false
        }, 850)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, currentPath])

  // Get current translations
  const t = locales[lang]

  // Navbar tabs
  const navTabs: { id: Section; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: t.home,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'formations',
      label: t.formations,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'about',
      label: t.about,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'contact',
      label: t.contact,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <>
      {/* Advanced Full Screen Loading Animation (Purple Twilight themed) */}
      <div
        className={`fixed inset-0 z-[100] bg-[#FAF8F4] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          loading ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-ocean-twilight/5 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-slate-200" />
            <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-ocean-twilight animate-spin" style={{ animationDuration: '0.8s' }} />
            <div className="absolute inset-0 rounded-full border border-dashed border-ocean-twilight/20 animate-[spin_8s_linear_infinite_reverse]" />
            <img
              src="/nobgLogo.png"
              alt="InnoTwist Logo"
              className="h-14 w-auto object-contain z-10 drop-shadow-[0_0_12px_rgba(65,74,190,0.35)]"
            />
          </div>

          <div className="space-y-2 text-center">
            <div className="text-lg font-extrabold tracking-[0.2em] text-slate-900 uppercase">
              InnoTwist
            </div>
            <div className="text-xs font-bold tracking-widest text-slate-400 font-sans">
              {progress < 100 ? `${progress}%` : 'READY'}
            </div>
          </div>

          <div className="w-40 h-[2px] bg-slate-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-ocean-twilight to-ocean-twilight/60 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {currentPath === '/admin' ? (
        /* RENDER STUNNING ADMIN INTERFACE */
        <AdminView navigateTo={navigateTo} lang={lang} setLang={setLang} />
      ) : (
        /* MAIN WEBSITE CONTAINER */
        <div
          id="root-container"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          className="min-h-screen bg-[#FAF8F4] text-slate-800 font-sans px-4 sm:px-6 py-4 sm:py-6 flex flex-col transition-all duration-300 relative overflow-y-auto lg:overflow-hidden overflow-x-hidden scrollbar-none"
        >
          {/* Slow-moving animated background grid (Subtle, thin Ocean Twilight lines) */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-80"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(65, 74, 190, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(65, 74, 190, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '45px 45px',
              animation: 'moveGrid 28s linear infinite'
            }}
          />

          {/* Background Radial Glows */}
          <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-amber-100/30 blur-[140px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-ocean-twilight/5 blur-[150px] pointer-events-none z-0" />

          {/* Floating Navbar */}
          <header className="w-full max-w-5xl mx-auto z-50 mb-4 sm:mb-6 px-1 sm:px-0 relative">
            <div className="bg-white/80 backdrop-blur-lg border border-slate-200/50 shadow-md rounded-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4 animate-[fadeIn_0.5s_ease-out] relative">
              
              {/* Logo Section */}
              <div className="flex items-center gap-2 select-none">
                <img src="/nobgLogo.png" alt="InnoTwist Logo" className="h-8 w-auto object-contain" />
                <span className="text-lg font-extrabold tracking-tight text-slate-900">InnoTwist</span>
              </div>

              {/* Desktop Navigation Tabs */}
              <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-900/5 border border-slate-200/30 rounded-full">
                {navTabs.map((tab) => {
                  const isActive = activeSection === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-ocean-twilight/15 text-ocean-twilight shadow-sm'
                          : 'text-slate-500 hover:text-ocean-twilight hover:bg-ocean-twilight/10'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Desktop Language Switcher */}
              <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/5 border border-slate-200/30 rounded-full">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-[10px] font-black rounded-full transition-all duration-200 ${
                      lang === l ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-slate-900/5 text-slate-700 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Mobile/Tablet Hamburger Dropdown Card */}
              {menuOpen && (
                <div className="absolute top-full inset-x-0 mt-3 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-3xl p-5 shadow-xl z-50 flex flex-col gap-4 animate-[fadeIn_0.2s_ease-out] lg:hidden">
                  <nav className="flex flex-col gap-1">
                    {navTabs.map((tab) => {
                      const isActive = activeSection === tab.id
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveSection(tab.id)
                            setMenuOpen(false)
                          }}
                          className={`flex items-center gap-3.5 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-ocean-twilight/15 text-ocean-twilight shadow-sm'
                              : 'text-slate-500 hover:text-ocean-twilight hover:bg-ocean-twilight/10'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      )
                    })}
                  </nav>

                  <div className="h-[1px] bg-slate-100 my-1" />

                  <div className="flex items-center justify-between p-1 bg-slate-900/5 border border-slate-200/30 rounded-xl">
                    {(['fr', 'en', 'ar'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`flex-1 py-2 text-xs font-black rounded-lg transition-all duration-200 ${
                          lang === l ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-800'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </header>

          {/* Section Content Area - Cleanly clips scrolling text boundaries on desktop */}
          <main className="flex-1 max-w-5xl w-full mx-auto flex items-center justify-center py-2 sm:py-6 z-20 mt-2 lg:overflow-hidden">
            
            {activeSection === 'home' ? (
              <div className="w-full flex flex-col items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center w-full text-center lg:text-start">
                  
                  {/* Left Column: Hero Text & WhatsApp Button */}
                  <div className="lg:col-span-7 space-y-8 animate-[fadeIn_0.8s_ease-out] text-center lg:text-start px-4 sm:px-8 lg:px-0">
                    {/* Subtle Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-twilight/10 border border-ocean-twilight/20 text-xs font-semibold text-ocean-twilight mx-auto lg:mx-0">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-ocean-twilight animate-pulse" />
                      InnoTwist
                    </div>

                    {/* Primary Heading */}
                    <h1 className="text-[22px] sm:text-[32px] md:text-[42px] lg:text-[50px] font-black text-slate-900 tracking-tight leading-[1.2] text-center lg:text-start">
                      <span className="block sm:whitespace-nowrap">{t.heroTitleLine1}</span>
                      <span className="text-slate-900 block mt-2 sm:whitespace-nowrap">
                        {t.heroTitleLine2Prefix}
                        <span className="relative inline-block text-ocean-twilight font-hand font-normal pb-1.5 pl-2 pr-2 select-text text-[28px] sm:text-[38px] md:text-[48px] lg:text-[58px]">
                          {t.heroTitleLine2Highlight}
                          <svg
                            className="absolute bottom-0 start-0 w-full h-2.5 stroke-ocean-twilight"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                            fill="none"
                          >
                            <path
                              d="M3,5 C35,2 65,8 97,4"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                              style={{
                                strokeDasharray: 120,
                                strokeDashoffset: 120,
                                animation: 'drawOutline 2.2s ease-in-out 0.5s forwards'
                              }}
                            />
                          </svg>
                        </span>
                      </span>
                    </h1>

                    {/* Localized Subtitles */}
                    <div className="space-y-3 max-w-lg mx-auto lg:mx-0 text-center lg:text-start">
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-700 leading-relaxed select-text">
                        {t.heroSubtitle1}
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed select-text">
                        {t.heroSubtitle2}
                      </p>
                    </div>

                    {/* WhatsApp Book Now CTA */}
                    <div className="pt-2 flex justify-center lg:justify-start">
                      <a
                        href="https://wa.me/123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3.5 px-6 py-3 sm:px-8 sm:py-4 bg-[#25D366] hover:bg-[#22c35e] text-white rounded-full font-extrabold shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/35 transition-all duration-300 transform active:scale-95 text-xs sm:text-sm"
                      >
                        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.908-6.995-1.878-1.88-4.357-2.912-6.997-2.914-5.443 0-9.868 4.42-9.873 9.864-.002 1.848.495 3.653 1.438 5.253l-.992 3.626 3.743-.982zM17.487 14.51c-.294-.147-1.736-.857-2.006-.955-.27-.098-.467-.147-.662.147-.196.294-.759.955-.931 1.15-.172.195-.344.22-.638.073-.294-.147-1.243-.458-2.37-1.462-.877-.783-1.47-1.75-1.642-2.045-.172-.295-.018-.454.13-.601.133-.13.294-.343.44-.515.15-.171.2-.294.3-.49.1-.197.05-.367-.025-.515-.074-.147-.662-1.594-.908-2.183-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.196 0-.515.073-.784.367-.27.294-1.03 1.007-1.03 2.455 0 1.448 1.054 2.846 1.202 3.04.148.196 2.074 3.168 5.025 4.444.702.304 1.25.485 1.677.62.705.224 1.347.193 1.854.117.565-.084 1.736-.71 1.98-.1.244-.707.244-1.298 0-.147-.074-.097-.27-.147-.563-.294z"/>
                        </svg>
                        <span>{t.whatsappCTA}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Lottie Animation */}
                  <div className="lg:col-span-5 flex justify-center items-center animate-[fadeIn_0.8s_ease-out_0.2s_both]">
                    <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                      <Lottie animationData={onlineLearningAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
                    </div>
                  </div>

                </div>

                {/* Centered Scroll Indicator */}
                <div className="mt-12 sm:mt-16 w-10 h-14 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300 animate-[fadeIn_0.8s_ease-out_0.4s_both]">
                  <Lottie animationData={mouseScrollAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            ) : activeSection === 'formations' ? (
              /* FORMATIONS SECTION (Nos Formations Accélérées) */
              <div id="scroll-content" className="w-full max-h-[calc(100vh-170px)] overflow-y-auto flex flex-col items-center py-4 sm:py-8 scrollbar-none select-text">
                {/* Header text container */}
                <div className="text-center space-y-4 max-w-2xl px-4 sm:px-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-twilight/10 border border-ocean-twilight/20 text-xs font-semibold text-ocean-twilight mx-auto">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-ocean-twilight animate-pulse" />
                    {t.formationsBadge}
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
                    {t.formationsTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans">
                    {t.formationsSubtitle}
                  </p>
                </div>

                {/* Creative Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mt-12 max-w-5xl px-4 sm:px-6">
                  
                  {/* 1. Web Development */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.webDevTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.webDevDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 2. Mobile App Development */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.appDevTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.appDevDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 3. Digital Marketing */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.marketingTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.marketingDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 4. Business Development */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.businessTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.businessDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 5. IoT & Internet of Things */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.iotTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.iotDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 6. Languages & Communication */}
                  <div className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-5 transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.03 1.054-.153 2.097-.366 3.109m0 0A12.015 12.015 0 018 12.83" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.languagesTitle}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.languagesDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ocean-twilight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.whatsappCTA}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 7. Robotics & Kids Space (Featured layout) */}
                  <div className="group bg-gradient-to-br from-white to-amber-50/15 border border-slate-200/60 rounded-3xl p-6 md:col-span-2 lg:col-span-3 shadow-sm hover:shadow-md hover:border-amber-400/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col lg:flex-row justify-between items-stretch gap-6">
                    
                    {/* Left Half: Robotics General */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-100/40 flex items-center justify-center text-amber-600 mb-5 transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">{t.roboticsTitle}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-lg">{t.roboticsDesc}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                        <span>{t.whatsappCTA}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Right Half: Playful Kids Space Environment */}
                    <div className="flex-1 rounded-2xl bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/50 p-5 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
                      <div className="absolute top-2 right-2 text-amber-400 opacity-60 animate-pulse">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                        </svg>
                      </div>
                      <div className="relative z-10 space-y-2">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[10px] font-black text-amber-700 uppercase tracking-widest">
                          {t.kidsBadge}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900">
                          {lang === 'fr' ? "Robotique & Arduino Junior" : lang === 'en' ? "Robotics & Arduino Junior" : "برمجة الروبوتات للصغار"}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                          {lang === 'fr' 
                            ? "Un espace d'apprentissage interactif conçu spécialement pour initier les plus jeunes à l'électronique de façon ludique !"
                            : lang === 'en'
                            ? "An interactive learning environment tailored specifically to introduce kids to electronics in a fun way!"
                            : "مسار تعليمي تفاعلي مصمم خصيصاً لتعريف الصغار بعالم الإلكترونيات بطرق ممتعة ومبسطة!"}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom spacer to provide visual breathing room and indicator of reaching the end */}
                <div className="h-16 w-full shrink-0" />
              </div>
            ) : activeSection === 'about' ? (
              /* ABOUT SECTION */
              <div id="about-scroll-content" className="w-full max-h-[calc(100vh-170px)] lg:overflow-y-auto scrollbar-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-4 sm:py-8 animate-[fadeIn_0.6s_ease-out] px-4 sm:px-8 lg:px-0 select-text">
                
                {/* Left Column: Premium Logo Showcase with breathing glows */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-[40px] bg-white border border-slate-200/60 shadow-md flex items-center justify-center group overflow-hidden">
                    {/* Subtle purple background glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-ocean-twilight/10 via-transparent to-ocean-twilight/5 z-0" />
                    
                    {/* Floating Logo with subtle hover lift and scale */}
                    <img
                      src="/nobgLogo.png"
                      alt="InnoTwist Logo"
                      className="h-28 sm:h-36 w-auto object-contain z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(65,74,190,0.25)]"
                    />
                    
                    {/* Wireframe border shines */}
                    <div className="absolute inset-0 rounded-[40px] border border-transparent group-hover:border-ocean-twilight/20 transition-colors duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Right Column: Qui Sommes-nous Badge & Structured Paragraphs */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-twilight/10 border border-ocean-twilight/20 text-xs font-semibold text-ocean-twilight mx-auto lg:mx-0">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-ocean-twilight animate-pulse" />
                    {t.aboutBadge}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
                    {t.aboutTitle}
                  </h2>

                  {/* Structured readable text blocks */}
                  <div className="space-y-4 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                    <p>
                      {t.aboutParagraph1}
                    </p>
                    <p>
                      {t.aboutParagraph2}
                    </p>
                    <p>
                      {t.aboutParagraph3}
                    </p>
                  </div>
                </div>

                {/* Bottom spacer to provide visual breathing room and indicator of reaching the end on mobile/tablet */}
                <div className="h-16 w-full shrink-0 lg:hidden" />
              </div>
            ) : (
              /* CONTACT SECTION */
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-4 sm:py-8 animate-[fadeIn_0.6s_ease-out] px-4 sm:px-8 lg:px-0 select-text">
                
                {/* Left Column: Heading & Unified portal CTA */}
                <div className="lg:col-span-6 space-y-8 text-center lg:text-start">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-twilight/10 border border-ocean-twilight/20 text-xs font-semibold text-ocean-twilight mx-auto lg:mx-0">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-ocean-twilight animate-pulse" />
                    {t.contactBadge}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
                      {t.contactTitle}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
                      {t.contactSubtitle}
                    </p>
                  </div>

                  {/* Unified portal button */}
                  <div className="pt-2 flex justify-center lg:justify-start">
                    <a
                      href="https://bio.link/innotwistacademy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-ocean-twilight text-white font-extrabold rounded-full shadow-lg shadow-ocean-twilight/20 hover:shadow-ocean-twilight/35 transition-all duration-300 hover:bg-ocean-twilight/90 transform active:scale-95 text-xs sm:text-sm"
                    >
                      <span>{t.contactButton}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Right Column: Grid of 4 contact channels linking directly to Bio.link */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  
                  {/* 1. Phone Card */}
                  <a
                    href="https://bio.link/innotwistacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-4 transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">{t.contactPhoneTitle}</h3>
                      <p className="text-xs text-slate-500">{t.contactPhoneDesc}</p>
                    </div>
                  </a>

                  {/* 2. Email Card */}
                  <a
                    href="https://bio.link/innotwistacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-4 transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">{t.contactEmailTitle}</h3>
                      <p className="text-xs text-slate-500">{t.contactEmailDesc}</p>
                    </div>
                  </a>

                  {/* 3. WhatsApp Card */}
                  <a
                    href="https://bio.link/innotwistacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-[#25D366]/30 transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4 transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.908-6.995-1.878-1.88-4.357-2.912-6.997-2.914-5.443 0-9.868 4.42-9.873 9.864-.002 1.848.495 3.653 1.438 5.253l-.992 3.626 3.743-.982zM17.487 14.51c-.294-.147-1.736-.857-2.006-.955-.27-.098-.467-.147-.662.147-.196.294-.759.955-.931 1.15-.172.195-.344.22-.638.073-.294-.147-1.243-.458-2.37-1.462-.877-.783-1.47-1.75-1.642-2.045-.172-.295-.018-.454.13-.601.133-.13.294-.343.44-.515.15-.171.2-.294.3-.49.1-.197.05-.367-.025-.515-.074-.147-.662-1.594-.908-2.183-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.196 0-.515.073-.784.367-.27.294-1.03 1.007-1.03 2.455 0 1.448 1.054 2.846 1.202 3.04.148.196 2.074 3.168 5.025 4.444.702.304 1.25.485 1.677.62.705.224 1.347.193 1.854.117.565-.084 1.736-.71 1.98-.1.244-.707.244-1.298 0-.147-.074-.097-.27-.147-.563-.294z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">{t.contactWhatsappTitle}</h3>
                      <p className="text-xs text-slate-500">{t.contactWhatsappDesc}</p>
                    </div>
                  </a>

                  {/* 4. Socials Card */}
                  <a
                    href="https://bio.link/innotwistacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-ocean-twilight/30 transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-4 transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">{t.contactSocialsTitle}</h3>
                      <p className="text-xs text-slate-500">{t.contactSocialsDesc}</p>
                    </div>
                  </a>

                </div>

              </div>
            )}

          </main>

          {/* Global Footer */}
          <footer className="w-full max-w-5xl mx-auto border-t border-slate-200/60 pt-6 mt-12 text-xs text-slate-400 select-none text-center z-20 animate-[fadeIn_0.5s_ease-out]">
            <div>&copy; {new Date().getFullYear()} InnoTwist. {t.copyright}</div>
          </footer>

          {/* Embedded CSS keyframe animations for grids, sweeps, and fades */}
          <style>{`
            @keyframes drawOutline {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes moveGrid {
              from {
                background-position: 0 0;
              }
              to {
                background-position: 45px 45px;
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            #root-container::-webkit-scrollbar {
              display: none;
            }
            #root-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            #scroll-content::-webkit-scrollbar {
              display: none;
            }
            #scroll-content {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            #about-scroll-content::-webkit-scrollbar {
              display: none;
            }
            #about-scroll-content {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}
    </>
  )
}

interface AdminViewProps {
  navigateTo: (path: string) => void
  lang: Lang
  setLang: (lang: Lang) => void
}

function AdminView({ navigateTo, lang, setLang }: AdminViewProps) {
  const t = locales[lang]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)

  // Simulated latest registration inquiry leads
  const latestLeads = [
    { id: 1, name: "Sofiane Ben Ali", formation: "Développement Web", date: "2026-07-04", status: "Nouveau" },
    { id: 2, name: "Elena Rostova", formation: "Languages & Com", date: "2026-07-03", status: "Contacté" },
    { id: 3, name: "Mohamed Amine", formation: "Robotique & Arduino", date: "2026-07-03", status: "Nouveau" },
    { id: 4, name: "Sarah Dupont", formation: "Marketing Digital", date: "2026-07-02", status: "Inscrit" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate server side authentication check
    setTimeout(() => {
      setLoading(false)
      // Validate credentials
      if (email === 'admin@innotwist.com' && password === 'admin123') {
        setIsAuthed(true)
      } else {
        setError(t.adminInvalidCreds)
      }
    }, 1200)
  }

  const handleLogout = () => {
    setIsAuthed(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-text">
      {/* Slow animated background glow circles */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] max-w-[800px] rounded-full bg-[#414abe]/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] max-w-[800px] rounded-full bg-[#6366f1]/10 blur-[130px] pointer-events-none z-0" />

      {/* Language Toggle in Top-Right Corner */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-full">
        {(['fr', 'en', 'ar'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 text-[10px] font-black rounded-full transition-all duration-200 ${
              lang === l ? 'bg-[#414abe] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {!isAuthed ? (
        /* LOGIN CARD */
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl rounded-3xl p-8 relative z-10 animate-[fadeIn_0.5s_ease-out]">
          {/* Logo and branding */}
          <div className="text-center mb-8 space-y-3">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center rounded-3xl bg-slate-800/50 border border-slate-700/30">
              <img
                src="/nobgLogo.png"
                alt="InnoTwist Logo"
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(65,74,190,0.35)] animate-pulse"
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">{t.adminLoginTitle}</h1>
            <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">{t.adminLoginSubtitle}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.adminEmailLabel}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@innotwist.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#414abe] focus:ring-1 focus:ring-[#414abe] text-sm font-sans transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{t.adminPasswordLabel}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#414abe] focus:ring-1 focus:ring-[#414abe] text-sm font-sans transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#414abe] to-[#6366f1] hover:from-[#414abe]/90 hover:to-[#6366f1]/90 text-white font-extrabold rounded-xl shadow-lg shadow-[#414abe]/20 hover:shadow-[#414abe]/35 transition-all duration-300 transform active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span>{t.adminConnectBtn}</span>
              )}
            </button>
          </form>

          {/* Spacer */}
          <div className="h-[1px] bg-slate-800 my-6" />

          {/* Back to main site link */}
          <div className="text-center">
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t.adminBackBtn}</span>
            </button>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD */
        <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-2xl rounded-3xl p-6 sm:p-8 relative z-10 animate-[fadeIn_0.5s_ease-out] space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#414abe]/10 flex items-center justify-center text-[#414abe] border border-[#414abe]/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">{t.adminDashboardTitle}</h1>
                <p className="text-xs text-slate-400 font-sans">InnoTwist Management Center</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('/')}
                className="px-4 py-2 border border-slate-800 rounded-xl text-xs font-extrabold text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{t.home}</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-xs font-extrabold text-red-400 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{t.adminLogoutBtn}</span>
              </button>
            </div>
          </div>

          {/* Grid Overview Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Widget 1 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 font-sans">TOTAL REGISTRATIONS</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white">142</span>
                <span className="text-[10px] font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">+12%</span>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 font-sans">ACTIVE CLASSES</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white">8</span>
                <span className="text-[10px] font-bold text-[#414abe] px-2 py-0.5 rounded-full bg-[#414abe]/10 border border-[#414abe]/20">Ongoing</span>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 font-sans">CONVERSION RATE</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white">12.4%</span>
                <span className="text-[10px] font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Optimal</span>
              </div>
            </div>

            {/* Widget 4 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-500 font-sans">WHATSAPP CLICKS</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white">384</span>
                <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-800">Leads</span>
              </div>
            </div>

          </div>

          {/* Lead Board Table */}
          <div className="bg-slate-950/20 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 font-extrabold text-xs tracking-wider text-slate-400 font-sans uppercase">
              Latest Admission Inquiries
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/30 text-slate-400 font-extrabold">
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Formation</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/55 text-slate-300 font-sans">
                  {latestLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/25 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{lead.name}</td>
                      <td className="px-5 py-3.5">{lead.formation}</td>
                      <td className="px-5 py-3.5 text-slate-500">{lead.date}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          lead.status === 'Nouveau'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : lead.status === 'Contacté'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default App
