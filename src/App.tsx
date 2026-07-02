import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'stack' | 'features' | 'about'>('stack')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-ocean-blue selection:text-white relative overflow-hidden">
      {/* Background glowing effects utilizing the new color palette */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-ocean-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-laser-blue/15 blur-[130px] pointer-events-none" />

      {/* Header / Navbar - Glassmorphic design */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="InnoTwist Logo" className="h-9 w-9 rounded-lg object-cover ring-2 ring-ocean-blue/50" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-white-2 to-ocean-blue bg-clip-text text-transparent">
              InnoTwist
            </span>
          </div>

          {/* Navigation - Glassmorphic tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === 'stack' ? 'bg-ocean-blue/20 text-ocean-blue border border-ocean-blue/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              Tech Stack
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === 'features' ? 'bg-ocean-blue/20 text-ocean-blue border border-ocean-blue/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === 'about' ? 'bg-ocean-blue/20 text-ocean-blue border border-ocean-blue/30' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              About
            </button>
          </nav>

          <div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-laser-blue/10 border border-laser-blue/20 text-xs font-semibold text-ocean-blue">
              <span className="flex h-2 w-2 rounded-full bg-ocean-blue animate-pulse" />
              Tailwind CSS v4 & Color System Applied
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Pushing boundaries with{' '}
              <span className="bg-gradient-to-r from-ocean-blue via-laser-blue to-ocean-twilight bg-clip-text text-transparent">
                InnoTwist
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Welcome to your brand new, ultra-fast React + Vite development environment. Enhanced with a single source of truth color palette and Tailwind CSS v4 for absolute styling flexibility.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Button with Ocean Blue main color */}
              <button
                type="button"
                onClick={() => setCount((c) => c + 1)}
                className="group relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-ocean-blue to-laser-blue hover:from-ocean-blue/90 hover:to-laser-blue/90 shadow-lg shadow-ocean-blue/25 transition-all duration-300 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Count is {count}</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <a
                href="https://vite.dev"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Learn Vite
              </a>
            </div>
          </div>

          {/* Interactive visual column - High glassmorphism */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              {/* Outer glowing border utilizing palette colors */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-ocean-blue to-laser-blue opacity-20 group-hover:opacity-40 blur-lg transition-all duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-3xl w-full max-w-sm flex flex-col items-center">
                <img
                  src={heroImg}
                  alt="InnoTwist Hero"
                  className="w-40 h-40 object-contain drop-shadow-[0_10px_20px_rgba(19,142,201,0.35)] animate-bounce"
                  style={{ animationDuration: '4s' }}
                />
                
                <div className="flex gap-6 mt-8 justify-center items-center">
                  <a href="https://vite.dev" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
                    <img src={viteLogo} className="h-10 w-10 filter drop-shadow-[0_0_10px_rgba(19,142,201,0.5)]" alt="Vite logo" />
                  </a>
                  <span className="text-xl text-slate-600 font-light">+</span>
                  <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
                    <img src={reactLogo} className="h-10 w-10 filter drop-shadow-[0_0_10px_rgba(46,95,196,0.5)] animate-[spin_10s_linear_infinite]" alt="React logo" />
                  </a>
                </div>

                <div className="mt-8 text-center text-xs text-slate-400">
                  Edit <code className="text-ocean-blue bg-slate-950 px-2 py-1 rounded border border-white/5">src/App.tsx</code> to start building.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab content view - Glassmorphic panels */}
        <div className="mt-24 border-t border-white/5 pt-16">
          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/[0.02] border border-white/5 hover:border-ocean-blue/30 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-md">
                <div className="h-12 w-12 rounded-xl bg-ocean-blue/10 flex items-center justify-center text-ocean-blue mb-6 font-bold text-xl border border-ocean-blue/20">R</div>
                <h3 className="text-xl font-bold mb-3 text-white">React 19</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Leverage the power of components, Hooks, and high efficiency UI rendering for standard modern web development.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 hover:border-laser-blue/30 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-md">
                <div className="h-12 w-12 rounded-xl bg-laser-blue/10 flex items-center justify-center text-laser-blue mb-6 font-bold text-xl border border-laser-blue/20">V</div>
                <h3 className="text-xl font-bold mb-3 text-white">Vite Dev Server</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Instant server start, lightning fast Hot Module Replacement (HMR), and optimized builds out-of-the-box.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 hover:border-ocean-twilight/30 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-md">
                <div className="h-12 w-12 rounded-xl bg-ocean-twilight/10 flex items-center justify-center text-ocean-twilight mb-6 font-bold text-xl border border-ocean-twilight/20">T</div>
                <h3 className="text-xl font-bold mb-3 text-white">Tailwind CSS v4</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Zero configuration required. Lightning fast compiler powered by Rust and optimized specifically for Vite.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl text-left max-w-3xl mx-auto space-y-6 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-4">Key Environment Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-ocean-blue font-bold">✓</span>
                  <div>
                    <strong className="text-slate-200">Native CSS Imports:</strong> No postcss configs, no configuration files. Tailwind compiles automatically.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ocean-blue font-bold">✓</span>
                  <div>
                    <strong className="text-slate-200">TypeScript Support:</strong> Strongly typed React components, fully configured tsconfigs.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ocean-blue font-bold">✓</span>
                  <div>
                    <strong className="text-slate-200">Optimal Performance:</strong> Smaller bundle footprint, ultra fast building pipeline.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="text-center max-w-2xl mx-auto space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">About InnoTwist</h3>
              <p className="text-slate-300 leading-relaxed">
                InnoTwist represents a modern take on project scaffolding, utilizing cutting-edge web frameworks and tooling. Designed to be lightweight, stunning, and highly responsive.
              </p>
              <div className="flex justify-center gap-4 text-sm text-slate-500">
                <span>Version 1.0.0</span>
                <span>•</span>
                <span>MIT License</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 mt-12 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} InnoTwist. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="https://vite.dev" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">Vite</a>
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">React</a>
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-ocean-blue transition-colors">Tailwind CSS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
