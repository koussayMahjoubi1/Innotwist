import { useState, useEffect } from 'react'
import { locales } from './locales'
import type { Lang } from './locales'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [lang, setLang] = useState<Lang>('fr')
  const [activeTab, setActiveTab] = useState<'About Us' | 'Courses' | 'Contact' | 'Blog'>('About Us')

  // Smooth loading progress incrementer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Hold full progress briefly for premium UX transition
          setTimeout(() => setLoading(false), 250)
          return 100
        }
        // Random increments to feel natural and advanced
        const increment = Math.floor(Math.random() * 8) + 4
        return Math.min(prev + increment, 100)
      })
    }, 60)
    return () => clearInterval(timer)
  }, [])

  // Get current translations
  const t = locales[lang]

  return (
    <>
      {/* Advanced Full Screen Loading Animation */}
      <div
        className={`fixed inset-0 z-[100] bg-[#FAF8F4] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          loading ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center gap-8">
          {/* Logo container with complex outer glowing rings */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Pulsing outer glow */}
            <div className="absolute inset-0 rounded-full bg-ocean-blue/5 animate-ping" />
            
            {/* Spinning gradient border track */}
            <div className="absolute inset-2 rounded-full border border-slate-200" />
            <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-ocean-blue animate-spin" style={{ animationDuration: '0.8s' }} />
            
            {/* Opposite spinning outer accent ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-laser-blue/20 animate-[spin_8s_linear_infinite_reverse]" />

            {/* Centered logo icon */}
            <img
              src="/nobgLogo.png"
              alt="InnoTwist Logo"
              className="h-14 w-auto object-contain z-10 drop-shadow-[0_0_12px_rgba(19,142,201,0.3)]"
            />
          </div>

          <div className="space-y-2 text-center">
            {/* Premium branding */}
            <div className="text-lg font-extrabold tracking-[0.2em] text-slate-900 uppercase">
              InnoTwist
            </div>
            {/* Localized loading status and counter */}
            <div className="text-xs font-bold tracking-widest text-slate-400 font-sans">
              {progress < 100 ? `${progress}%` : 'READY'}
            </div>
          </div>

          {/* Minimal progress bar */}
          <div className="w-40 h-[2px] bg-slate-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-ocean-blue to-laser-blue transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#FAF8F4] text-slate-900 font-sans relative overflow-hidden select-none transition-all duration-300"
      >
        {/* Background radial glows */}
        <div className={`absolute top-[-10%] ${lang === 'ar' ? 'right-[-15%]' : 'left-[-15%]'} w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-amber-100/40 blur-[130px] pointer-events-none`} />
        <div className={`absolute top-[10%] ${lang === 'ar' ? 'left-[-15%]' : 'right-[-15%]'} w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-ocean-blue/10 blur-[140px] pointer-events-none`} />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-laser-blue/5 blur-[120px] pointer-events-none" />

        {/* Header / Navbar */}
        <header className="relative z-50 max-w-7xl mx-auto px-6 pt-5 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <img src="/nobgLogo.png" alt="InnoTwist Logo" className="h-9 w-auto object-contain" />
              <span className="text-xl font-bold tracking-tight text-slate-900">InnoTwist</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 md:gap-8">
              {(['About Us', 'Courses', 'Contact', 'Blog'] as const).map((tab) => {
                const navLabel =
                  tab === 'About Us' ? t.navAbout :
                  tab === 'Courses' ? t.navCourses :
                  tab === 'Contact' ? t.navContact : t.navBlog;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                      activeTab === tab ? 'text-slate-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {navLabel}
                    {activeTab === tab && (
                      <svg
                        className="absolute -inset-x-4 -inset-y-1.5 w-[calc(100%+32px)] h-[calc(100%+12px)] pointer-events-none stroke-ocean-twilight"
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M5,20 C8,6 92,4 95,18 C98,32 18,37 8,24 C5,18 72,8 93,12"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: 300,
                            strokeDashoffset: 300,
                            animation: 'drawOutline 0.8s ease-out forwards',
                          }}
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1 p-1 bg-slate-900/5 border border-slate-200 rounded-full">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                      lang === l ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {t.signIn}
              </button>
              <button className="px-5 py-2 text-sm font-medium text-slate-900 border border-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300">
                {t.signUp}
              </button>
            </div>

          </div>
        </header>

        {/* Separator Line and Breathing Space for UI prettiness */}
        <div className="w-[calc(100%-48px)] max-w-7xl mx-auto h-[1px] bg-slate-200/40 my-3" />

        {/* Hero Section */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 space-y-8 text-start relative">
              
              <div className={`absolute -top-12 ${lang === 'ar' ? 'right-[10%]' : 'left-[60%]'} text-ocean-twilight animate-[pulse_3s_infinite] select-none pointer-events-none`}>
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] select-text">
                  {t.heroTitleLine1} <br />
                  {t.heroTitleLine2} <br />
                  <span className={`relative inline-block font-hand text-6xl md:text-7xl lg:text-8xl text-ocean-twilight mt-2 ${lang === 'ar' ? 'pr-2' : 'pl-2'}`}>
                    {t.heroTitleEasy}
                    <svg
                      className="absolute -inset-x-8 -inset-y-5 w-[calc(100%+64px)] h-[calc(100%+40px)] pointer-events-none stroke-ocean-twilight"
                      viewBox="0 0 120 50"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M10,25 C15,8 105,5 110,25 C115,42 15,46 10,30 C8,22 80,10 105,15"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 400,
                          strokeDashoffset: 400,
                          animation: 'drawOutline 1s ease-out 0.3s forwards',
                        }}
                      />
                    </svg>
                  </span>
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-500 max-w-md leading-relaxed select-text">
                {t.heroSubtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button className="px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-full font-semibold shadow-lg shadow-slate-950/10 hover:shadow-slate-950/20 transition-all duration-300 transform active:scale-[0.98]">
                  {t.getStarted}
                </button>
              </div>

              <div className="pt-4">
                <button className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 transform active:scale-90">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Animation Placeholder inside Arched Dome Container */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <div className="relative w-full max-w-[430px]">
                
                {/* Arched Dome Container */}
                <div className="relative mx-auto rounded-t-full rounded-b-3xl w-[320px] sm:w-[350px] h-[430px] sm:h-[470px] bg-gradient-to-tr from-ocean-blue/20 via-ocean-twilight/15 to-laser-blue/25 border border-white/50 shadow-xl overflow-hidden flex items-center justify-center">
                  {/* Subtle inner card overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent z-0" />
                  
                  {/* Premium Rotating Animation Placeholder */}
                  <div className="relative w-44 h-44 flex items-center justify-center z-10 select-none pointer-events-none">
                    {/* Glowing background halo */}
                    <div className="absolute inset-2 rounded-full bg-ocean-blue/5 blur-xl animate-pulse" />
                    
                    {/* Rotating outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-ocean-blue/30 animate-[spin_25s_linear_infinite]" />
                    
                    {/* Counter-rotating inner double ring */}
                    <div className="absolute inset-4 rounded-full border-2 border-double border-laser-blue/40 animate-[spin_12s_linear_infinite_reverse]" />
                    
                    {/* Internal orbital particles */}
                    <div className="absolute inset-10 rounded-full border border-slate-300/40 animate-[spin_6s_linear_infinite]" />
                    
                    {/* Pulsing center node representing core application engine */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ocean-blue to-laser-blue animate-ping opacity-75" />
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-ocean-blue via-laser-blue to-ocean-twilight shadow-[0_0_20px_rgba(19,142,201,0.6)] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>

                  {/* Floating bubbles for 3D depth */}
                  <div className="absolute top-[20%] left-[10%] w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-inner z-20 animate-pulse" />
                  <div className="absolute top-[50%] right-[8%] w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-inner z-20 animate-bounce" style={{ animationDuration: '6s' }} />
                </div>

                {/* Circular Rotating "Watch video" Widget */}
                <div className={`absolute -bottom-6 ${lang === 'ar' ? 'right-[-20px]' : 'left-[-20px]'} z-30`}>
                  <div className="relative w-28 sm:w-32 h-28 sm:h-32 flex items-center justify-center bg-[#FAF8F4] rounded-full shadow-lg border border-slate-100">
                    <svg className="absolute w-24 sm:w-28 h-24 sm:h-28 animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                      <defs>
                        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                      </defs>
                      <text className="text-[7.5px] font-bold fill-slate-800 uppercase tracking-[0.24em] font-sans">
                        <textPath href="#circlePath" startOffset="0%">
                          {t.watchVideo} • {t.watchVideo} • {t.watchVideo} •
                        </textPath>
                      </text>
                    </svg>
                    <button className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-md z-10 transform active:scale-95 ${lang === 'ar' ? 'pr-1' : 'pl-1'}`}>
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        {lang === 'ar' ? (
                          <path d="M16 5v14l-11-7z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Section: What Will You Get */}
          <div className="mt-28 pt-12 border-t border-slate-200/50">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {t.whatWillYouGet}
                </h2>
                <div className={`h-1 bg-slate-950 w-20 rounded-full ${lang === 'ar' ? 'mr-6' : 'ml-6'}`} />
              </div>
              
              <div className="text-slate-300">
                <svg className="w-12 h-12 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                  <path d="M12,2 C12,12 12,12 2,12 C12,12 12,12 12,22 C12,12 12,12 22,12 C12,12 12,12 12,2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Arched / Rounded Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="group h-[360px] rounded-t-[140px] rounded-b-3xl relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/50 flex flex-col justify-end p-6 bg-slate-100">
                <img
                  src="/portfolio_mockup.png"
                  alt="Portfolio Mockup"
                  className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500 rounded-t-[140px] rounded-b-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10" />
                <div className="relative z-20 text-start text-white space-y-1">
                  <div className="text-4xl font-extrabold tracking-tight">{t.card1Val}</div>
                  <div className="text-sm font-medium text-slate-200">{t.card1Label}</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group h-[360px] rounded-t-[140px] rounded-b-3xl relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/50 flex flex-col justify-end p-6 bg-slate-100">
                <img
                  src="/workspace_learning.png"
                  alt="Workspace learning"
                  className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500 rounded-t-[140px] rounded-b-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10" />
                <div className="relative z-20 text-start text-white space-y-1">
                  <div className="text-4xl font-extrabold tracking-tight">{t.card2Val}</div>
                  <div className="text-sm font-medium text-slate-200">{t.card2Label}</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group h-[360px] rounded-tl-[140px] rounded-br-[140px] rounded-tr-3xl rounded-bl-3xl relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/50 flex flex-col justify-end p-6 bg-slate-100">
                <img
                  src="/teacher_designer.png"
                  alt="Experienced teachers"
                  className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500 rounded-tl-[140px] rounded-br-[140px] rounded-tr-3xl rounded-bl-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10" />
                <div className="relative z-20 text-start text-white space-y-1">
                  <div className="text-4xl font-extrabold tracking-tight">{t.card3Val}</div>
                  <div className="text-sm font-medium text-slate-200">{t.card3Label}</div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group h-[360px] rounded-t-[140px] rounded-b-3xl relative overflow-hidden shadow-md border border-slate-200/50 flex flex-col justify-end p-6 bg-slate-100">
                <img
                  src="/creative_sketch.png"
                  alt="Creative sketch"
                  className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-95 rounded-t-[140px] rounded-b-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10" />
                
                <div className="absolute top-[45%] inset-x-6 flex items-center justify-between z-20">
                  <button className="w-11 h-11 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-800 hover:bg-white hover:scale-105 transition-all transform active:scale-95">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={lang === 'ar' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                  </button>
                  <button className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-800 hover:bg-white hover:scale-105 transition-all transform active:scale-95">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={lang === 'ar' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </button>
                </div>

                <div className="relative z-20 text-start text-white space-y-1">
                  <div className="text-lg font-bold tracking-tight">{t.card4Title}</div>
                  <div className="text-xs text-slate-200 font-medium">{t.card4Label}</div>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/50 bg-[#FAF8F4] py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} InnoTwist. {t.copyright}
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="https://vite.dev" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">Vite</a>
              <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">React</a>
              <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">Tailwind CSS</a>
            </div>
          </div>
        </footer>

        {/* Embedded CSS animation styles for natural draw effect */}
        <style>{`
          @keyframes drawOutline {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default App
