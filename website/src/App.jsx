import React, { useState } from 'react'
import { 
  Download, 
  Layers, 
  Eye, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Github, 
  HelpCircle,
  Menu,
  X,
  Send,
  Zap,
  Info
} from 'lucide-react'
import WidgetSimulator from './components/WidgetSimulator'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(
    new URLSearchParams(window.location.search).get('installed') === 'true'
  )

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  // Handle actual EXE download
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/DailyMax.exe'
    link.download = 'DailyMax.exe'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative min-h-screen bg-[#040409] text-slate-100 overflow-x-hidden font-sans">
      
      {/* ─── Glowing Backdrops ─── */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full glow-green opacity-40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full glow-emerald opacity-30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full glow-green opacity-20 blur-[120px] pointer-events-none" />

      {/* ─── Noise Overlay ─── */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none mix-blend-overlay z-0" />

      {/* ─── Header Navigation ─── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-16 rounded-2xl glass-panel border border-white/5 flex items-center justify-between px-6 z-50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]">
        {/* Brand Logo & Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img 
            src="/logo.png" 
            className="w-7 h-7 object-contain rounded-lg border border-white/10 group-hover:scale-105 transition-all shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
            alt="DailyMax logo" 
          />
          <span className="font-outfit font-extrabold tracking-widest text-[16px] uppercase bg-gradient-to-r from-white via-white to-brand-emerald bg-clip-text text-transparent">
            DailyMax
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-white/50">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Setup</a>
          <a href="#faqs" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Download Call-to-action */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-neon hover:scale-[1.02] text-slate-950 font-outfit font-bold text-[12px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-1.5"
          >
            <Download size={13} className="stroke-[3]" />
            Download Free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-white/60 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#040409]/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 text-xl font-bold tracking-wider md:hidden">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">Live Demo</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">Setup</a>
          <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">FAQ</a>
          <button 
            onClick={() => {
              setMobileMenuOpen(false)
              handleDownload()
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-neon text-slate-950 font-outfit font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2"
          >
            <Download size={16} className="stroke-[3]" />
            Download For Windows
          </button>
        </div>
      )}

      {/* ─── Hero Section ─── */}
      <section className="relative pt-36 pb-20 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 z-10 grid-bg">
        
        {/* Left Side Hero Text */}
        <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-[11px] font-bold tracking-widest uppercase">
            <Zap size={10} className="fill-current animate-pulse" />
            V1.0.0 Stable Now Live
          </div>

          {/* Heading Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight leading-[1.08] text-white">
            Conquer Your Day, <br />
            <span className="bg-gradient-to-r from-brand-emerald via-brand-neon to-[#a7f3d0] bg-clip-text text-transparent">
              Prayer by Prayer.
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
            DailyMax is a premium, always-on-top, frameless glassmorphic Windows desktop overlay that locks your focus. It automatically filters your tasks based on Islamic prayer time blocks (Fajr, Dhuhr, Asr, Isha), ensuring absolute productivity, completely offline.
          </p>

          {/* Download CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-brand-emerald via-brand-neon to-emerald-400 hover:scale-[1.03] text-slate-950 font-outfit font-extrabold text-[13px] uppercase tracking-wider transition-all shadow-[0_15px_30px_-5px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
            >
              <Download size={15} className="stroke-[3] group-hover:translate-y-0.5 transition-transform" />
              Download for Windows
            </button>
            
            <a 
              href="#demo"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white/80 hover:text-white font-outfit font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              Try Interactive Demo
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Mini Metadata/Requirements */}
          <div className="flex items-center justify-center lg:justify-start gap-5 text-[10px] text-white/30 font-mono tracking-wider">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={10} className="text-brand-neon" /> Windows 10/11 Compatible
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1">
              <Cpu size={10} className="text-brand-neon" /> &lt; 40MB RAM (Zero Overhead)
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1">
              <ShieldCheck size={10} className="text-brand-neon" /> 100% Offline & Private
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Widget Simulator */}
        <div id="demo" className="flex-1 flex justify-center lg:justify-end animate-fade-in scroll-mt-28">
          <div className="relative">
            {/* Visual labels indicating it is interactive */}
            <div className="absolute -top-12 -left-6 z-20 bg-brand-emerald/10 border border-brand-emerald/30 rounded-xl px-3 py-1.5 text-[10px] font-bold text-brand-emerald uppercase tracking-wider backdrop-blur-md animate-bounce shadow-lg flex items-center gap-1.5">
              <Info size={11} />
              Interactive Live Demo!
            </div>
            
            <WidgetSimulator />
          </div>
        </div>
      </section>

      {/* ─── Bento Grid Features Section ─── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto z-10 scroll-mt-28">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-[11px] font-bold text-brand-emerald uppercase tracking-[0.2em] font-mono">Core Abstractions</h2>
          <p className="text-3xl sm:text-4xl font-outfit font-black tracking-tight text-white leading-tight">
            Engineered For Absolute Focus.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-emerald to-brand-neon mx-auto rounded-full mt-2" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Always-On-Top (2/3 width) */}
          <div className="md:col-span-2 glass-panel glass-panel-hover rounded-[20px] p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 rounded-full glow-green opacity-20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
              <Layers size={18} />
            </div>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-lg font-outfit font-bold text-white">Always-On-Top Floating Overlay</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Elevated at the native Windows `screen-saver` level. The DailyMax widget stays visible on your desktop above all full-screen tasks, productivity tools, and full-screen games. Keep your objectives in view at all times, without cluttering your system.
              </p>
            </div>
          </div>

          {/* Card 2: Smart Visibility (1/3 width) */}
          <div className="glass-panel glass-panel-hover rounded-[20px] p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full glow-emerald opacity-10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
              <Eye size={18} />
            </div>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-lg font-outfit font-bold text-white">Smart Visibility Blocks</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                DailyMax acts as a smart filter. It automatically hides off-block tasks. When Fajr is active, Asr and Dhuhr tasks are hidden. Focus entirely on what's ahead of you.
              </p>
            </div>
          </div>

          {/* Card 3: Local Offline First (1/3 width) */}
          <div className="glass-panel glass-panel-hover rounded-[20px] p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full glow-green opacity-10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
              <ShieldCheck size={18} />
            </div>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-lg font-outfit font-bold text-white">100% Offline & Private</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your data stays where it belongs—on your machine. Stored locally via secure JSON stores. No server syncs, no cloud tracking, no signups, and absolute zero latency.
              </p>
            </div>
          </div>

          {/* Card 4: Performance & Tray (2/3 width) */}
          <div className="md:col-span-2 glass-panel glass-panel-hover rounded-[20px] p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 rounded-full glow-emerald opacity-20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
              <Cpu size={18} />
            </div>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-lg font-outfit font-bold text-white">Native System Tray & Zero Overhead</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Runs silently as a native Windows tray application. Double-clicking the tray icon toggles the widget on and off. Built with lightweight Electron and React, consuming less than 40MB of memory, having no impact on gaming frame rates or software execution.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Timeline Block Explainer ─── */}
      <section className="py-20 px-6 max-w-6xl mx-auto z-10 border-t border-white/5 relative">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-[11px] font-bold text-brand-emerald uppercase tracking-[0.2em] font-mono">Chronological Flow</h2>
          <p className="text-3xl sm:text-4xl font-outfit font-black tracking-tight text-white">
            A Natural, Organic Task Loop.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Instead of fighting against stressful hourly deadlines, structure your daily milestones around the organic time blocks of the day.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Card: Fajr */}
          <div className="glass-panel rounded-2xl p-6 border-t-2 border-t-[#34d399] relative">
            <div className="text-[10px] font-mono text-white/30 tracking-wider mb-2">05:00 - 12:00</div>
            <h4 className="font-outfit font-bold text-[16px] text-[#34d399] uppercase tracking-wide">Fajr Block</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Early morning focus. Best suited for high-concentration coding, research, and setting up the foundation for the day.
            </p>
          </div>

          {/* Card: Dhuhr */}
          <div className="glass-panel rounded-2xl p-6 border-t-2 border-t-[#22c55e] relative">
            <div className="text-[10px] font-mono text-white/30 tracking-wider mb-2">12:00 - 15:30</div>
            <h4 className="font-outfit font-bold text-[16px] text-[#22c55e] uppercase tracking-wide">Dhuhr Block</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Midday milestones. Clear administrative tasks, handle calls, respond to reviews, and coordinate project progress.
            </p>
          </div>

          {/* Card: Asr */}
          <div className="glass-panel rounded-2xl p-6 border-t-2 border-t-[#10b981] relative">
            <div className="text-[10px] font-mono text-white/30 tracking-wider mb-2">15:30 - 18:30</div>
            <h4 className="font-outfit font-bold text-[16px] text-[#10b981] uppercase tracking-wide">Asr Block</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Late-afternoon technical wrapups. Polish code, write documentation, and perform peer evaluations.
            </p>
          </div>

          {/* Card: Isha */}
          <div className="glass-panel rounded-2xl p-6 border-t-2 border-t-[#059669] relative">
            <div className="text-[10px] font-mono text-white/30 tracking-wider mb-2">18:30 - 05:00</div>
            <h4 className="font-outfit font-bold text-[16px] text-[#059669] uppercase tracking-wide">Isha Block</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Nightly reflection and planning. Set milestones for tomorrow, clear loose ends, and prepare for a restful sleep.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Setup Guide Section ─── */}
      <section id="how-it-works" className="py-20 px-6 max-w-5xl mx-auto z-10 border-t border-white/5 scroll-mt-28">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-[11px] font-bold text-brand-emerald uppercase tracking-[0.2em] font-mono">Instant Launch</h2>
          <p className="text-3xl sm:text-4xl font-outfit font-black tracking-tight text-white">
            Get Running In 3 Simple Steps.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="glass-panel rounded-2xl p-6 flex items-start gap-4">
            <span className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center font-outfit font-bold text-sm shrink-0">1</span>
            <div className="space-y-1">
              <h4 className="font-outfit font-bold text-white text-[15px]">Download the Portable Executable</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Click the download button to grab the optimized, pre-compiled `DailyMax.exe` standalone binary.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-panel rounded-2xl p-6 flex items-start gap-4">
            <span className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center font-outfit font-bold text-sm shrink-0">2</span>
            <div className="space-y-1">
              <h4 className="font-outfit font-bold text-white text-[15px]">Double-Click to Launch Instantly</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Run the downloaded executable file directly. DailyMax requires zero installation, zero administration prompts, and runs 100% offline.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-panel rounded-2xl p-6 flex items-start gap-4">
            <span className="w-8 h-8 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center font-outfit font-bold text-sm shrink-0">3</span>
            <div className="space-y-1">
              <h4 className="font-outfit font-bold text-white text-[15px]">Stay Focused & Enjoy</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Drag the transparent widget anywhere on your desktop, adjust settings (like prayer times, always-on-top behaviors, and glass opacity) using the gear icon, and start organizing your focus blocks!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section id="faqs" className="py-20 px-6 max-w-4xl mx-auto z-10 border-t border-white/5 scroll-mt-28">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-[11px] font-bold text-brand-emerald uppercase tracking-[0.2em] font-mono">Inquiries</h2>
          <p className="text-3xl sm:text-4xl font-outfit font-black tracking-tight text-white">
            Frequently Asked Questions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Q1 */}
          <div className="glass-panel rounded-2xl p-6 space-y-2">
            <h4 className="font-outfit font-bold text-white text-[15px] flex items-center gap-2">
              <HelpCircle size={15} className="text-brand-emerald" /> Does this support custom prayer times?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              Yes, absolutely! By clicking the settings gear icon (⚙) at the top right of the desktop widget, you can set custom start and end hours/minutes for all four main prayer blocks (Fajr, Dhuhr, Asr, Isha) and they will persist locally.
            </p>
          </div>

          {/* Q2 */}
          <div className="glass-panel rounded-2xl p-6 space-y-2">
            <h4 className="font-outfit font-bold text-white text-[15px] flex items-center gap-2">
              <HelpCircle size={15} className="text-brand-emerald" /> Can it run in background of other games?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              Yes, the always-on-top feature is set to the Windows `screen-saver` level (level 1). This ensures that even when playing heavy full-screen games, the widget remains securely visible in the corner of your monitor.
            </p>
          </div>

          {/* Q3 */}
          <div className="glass-panel rounded-2xl p-6 space-y-2">
            <h4 className="font-outfit font-bold text-white text-[15px] flex items-center gap-2">
              <HelpCircle size={15} className="text-brand-emerald" /> How do I close or hide the widget?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              You can easily close the widget using the cross button (×) at the top-right, or click the minimize button (-) to tuck it away. You can double-click the green DailyMax logo in your Windows system tray to bring the widget back instantly!
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer Section ─── */}
      <footer className="relative pt-24 pb-12 px-6 max-w-6xl mx-auto z-10 border-t border-white/5">
        
        {/* Swirling glow */}
        <div className="absolute bottom-0 right-[-10%] w-[350px] h-[350px] rounded-full glow-green opacity-10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Left: Branding & Info */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" className="w-7 h-7 object-contain rounded-lg border border-white/10" alt="logo" />
              <span className="font-outfit font-extrabold tracking-widest text-[16px] uppercase text-white">DailyMax</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Beautiful, always-on-top glassmorphism overlay tracking focused tasks based on Islamic prayer time blocks. Elevate your focus.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-white/40 flex items-center justify-center transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Right: Newsletter Signup */}
          <div className="space-y-4 max-w-md w-full">
            <h4 className="font-outfit font-bold text-white text-[15px]">Stay Updated On Milestones</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up for our minimal newsletter to receive development logs, feature updates, and new templates.
            </p>
            
            {subscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-4 text-xs text-emerald-400 font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={14} className="stroke-[2.5]" />
                Awesome! You have successfully joined the DailyMax updates list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-xs text-white/95 placeholder-white/20 outline-none flex-1 transition-colors"
                />
                <button 
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-neon hover:scale-[1.02] text-slate-950 font-outfit font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                >
                  Join
                  <Send size={11} className="stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-mono tracking-wider">
          <div>© {new Date().getFullYear()} DailyMax app. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>

      </footer>

      {/* ─── Modern Custom Green Success Modal ─── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          {/* Glowing Green Backdrops inside modal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full glow-green opacity-20 blur-[100px] pointer-events-none" />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-brand-emerald/30 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-glow-green animate-scale-up">
            
            {/* Monogram Brand Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald shadow-[0_0_20px_rgba(34,197,94,0.2)] mb-6 relative">
              <img src="/logo.png" className="w-10 h-10 object-contain rounded-lg" alt="DailyMax logo" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-neon flex items-center justify-center text-slate-950 stroke-[3] scale-100 shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                <CheckCircle2 size={12} className="stroke-[3]" />
              </div>
            </div>

            {/* Title & Success Announcement */}
            <h3 className="font-outfit font-black text-2xl text-white tracking-tight uppercase">
              DailyMax Setup Successful!
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-brand-emerald to-brand-neon mx-auto rounded-full mt-2.5 mb-5" />
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
              A premium, brand-green shortcut has been dynamically created on your Desktop. 
              The task overlay application has also been started silently in the background!
            </p>

            {/* Installation Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <h5 className="font-outfit font-bold text-xs text-brand-emerald uppercase tracking-wider">Pristine Desktop</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed">Generated inside a beautiful, self-contained workspace directory.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <h5 className="font-outfit font-bold text-xs text-brand-emerald uppercase tracking-wider">Silent Booting</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed">Runs with zero clutter, zero black terminal screens, and ultra low overhead.</p>
              </div>
            </div>

            {/* Close Button / Get Started CTA */}
            <button
              onClick={closeSuccessModal}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-neon hover:scale-[1.01] text-slate-950 font-outfit font-extrabold text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
