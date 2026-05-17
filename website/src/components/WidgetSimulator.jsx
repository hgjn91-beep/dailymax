import React, { useState, useEffect } from 'react'
import { Check, Plus, Trash2, Pin, Settings, Minus, X } from 'lucide-react'

const BLOCK_METAS = {
  fajr: {
    label: 'Fajr Block',
    timeRange: '05:00 - 12:00',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.08)',
    border: 'rgba(52, 211, 153, 0.22)',
    desc: 'Focus on early morning study, planning, and high-energy coding.'
  },
  dhuhr: {
    label: 'Dhuhr Block',
    timeRange: '12:00 - 15:30',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(26, 107, 46, 0.35)',
    desc: 'Perfect for administrative duties, reviews, and secondary tasks.'
  },
  asr: {
    label: 'Asr Block',
    timeRange: '15:30 - 18:30',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.20)',
    desc: 'Wrap up deep technical sprints and documentation reviews.'
  },
  isha: {
    label: 'Isha Block',
    timeRange: '18:30 - 05:00',
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.08)',
    border: 'rgba(5, 150, 105, 0.20)',
    desc: 'Nightly reviews, relaxing projects, and personal reflection.'
  },
  night: {
    label: 'Night Block',
    timeRange: '05:00 - 05:00',
    color: '#a7f3d0',
    bg: 'rgba(167, 243, 208, 0.05)',
    border: 'rgba(167, 243, 208, 0.12)',
    desc: 'Unwind, read, and prep for the upcoming Fajr block.'
  }
}

const INITIAL_TASKS = {
  fajr: [
    { id: '1', text: 'Write product specifications document', done: true },
    { id: '2', text: 'Draft email newsletter copy', done: false },
    { id: '3', text: 'Morning sprint planning call', done: false },
  ],
  dhuhr: [
    { id: '4', text: 'Clean up git branch merges', done: false },
    { id: '5', text: 'Review team merge requests', done: true },
  ],
  asr: [
    { id: '6', text: 'Complete code walkthrough review', done: false },
  ],
  isha: [
    { id: '7', text: 'Set tomorrow\'s priority milestones', done: false },
    { id: '8', text: 'Refactor widget state store logic', done: true },
  ],
  night: []
}

export default function WidgetSimulator() {
  const [activeBlock, setActiveBlock] = useState('fajr')
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [inputText, setInputText] = useState('')
  const [currentTime, setCurrentTime] = useState('08:30:15')
  const [pinned, setPinned] = useState(true)

  // Real-looking clock effect
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date()
      setCurrentTime(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    const newTask = {
      id: Date.now().toString(),
      text: inputText.trim(),
      done: false
    }
    setTasks(prev => ({
      ...prev,
      [activeBlock]: [newTask, ...prev[activeBlock]]
    }))
    setInputText('')
  }

  const toggleTask = (id) => {
    setTasks(prev => ({
      ...prev,
      [activeBlock]: prev[activeBlock].map(t => t.id === id ? { ...t, done: !t.done } : t)
    }))
  }

  const deleteTask = (id) => {
    setTasks(prev => ({
      ...prev,
      [activeBlock]: prev[activeBlock].filter(t => t.id !== id)
    }))
  }

  const activeMeta = BLOCK_METAS[activeBlock]
  const activeTaskList = tasks[activeBlock] || []
  const doneCount = activeTaskList.filter(t => t.done).length
  const totalCount = activeTaskList.length
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="relative group select-none">
      {/* Dynamic Glowing Neon Backdrop matched to active block colors */}
      <div 
        className="absolute -inset-4 rounded-[26px] blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeMeta.color} 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Main Glass Widget Frame */}
      <div 
        className="relative w-[340px] h-[550px] rounded-[22px] border border-white/10 overflow-hidden flex flex-col text-slate-100 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] noise-overlay"
        style={{
          background: 'rgba(12, 12, 24, 0.90)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)'
        }}
      >
        {/* Glowing top line accent matched to active block colors */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1.5px] transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${activeMeta.color}, transparent)`
          }}
        />

        {/* ── Drag Bar Header ── */}
        <div className="h-[40px] flex items-center justify-between px-3.5 border-bottom border-white/5 relative z-10">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-[15px] h-[15px] object-contain rounded-[3px] border border-white/10" alt="DM" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase Outfit">
              DailyMax
            </span>
          </div>

          {/* Simulated Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPinned(!pinned)} 
              className={`w-[26px] h-[26px] rounded-lg flex items-center justify-center transition-all ${pinned ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40' : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60'}`}
              title="Pin overlay"
            >
              <Pin size={11} className={pinned ? 'fill-current' : ''} />
            </button>
            <button className="w-[26px] h-[26px] rounded-lg bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 flex items-center justify-center transition-all">
              <Settings size={11} />
            </button>
            <button className="w-[26px] h-[26px] rounded-lg bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60 flex items-center justify-center transition-all">
              <Minus size={11} />
            </button>
            <button className="w-[26px] h-[26px] rounded-lg bg-white/5 text-white/30 hover:bg-red-500/15 hover:text-red-400 flex items-center justify-center transition-all">
              <X size={11} />
            </button>
          </div>
        </div>

        {/* ── Interactive Block Selector Tabs ── */}
        <div className="flex justify-between px-3 py-1.5 border-b border-white/5 bg-white/[0.01] gap-1 shrink-0 relative z-10">
          {Object.keys(BLOCK_METAS).map((blockKey) => {
            const meta = BLOCK_METAS[blockKey]
            const isActive = activeBlock === blockKey
            return (
              <button
                key={blockKey}
                onClick={() => setActiveBlock(blockKey)}
                className={`flex-1 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive 
                    ? 'text-white border' 
                    : 'text-white/30 hover:text-white/60 hover:bg-white/5 border-transparent'
                }`}
                style={{
                  backgroundColor: isActive ? meta.bg : 'transparent',
                  borderColor: isActive ? meta.border : 'transparent',
                  color: isActive ? meta.color : undefined
                }}
              >
                {blockKey}
              </button>
            )
          })}
        </div>

        {/* ── Simulated Widget Body ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col relative z-10">
          
          {/* Live Clock inside widget */}
          <div className="text-[10px] font-mono text-center text-white/20 mb-0.5 tracking-wider">
            {currentTime}
          </div>

          {/* Active Block Info */}
          <div className="text-center mb-3">
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase border"
              style={{
                borderColor: activeMeta.border,
                backgroundColor: activeMeta.bg,
                color: activeMeta.color
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeMeta.color }} />
              {activeMeta.label}
            </span>
            <div className="text-[10px] text-white/40 mt-1 font-mono tracking-wide">{activeMeta.timeRange}</div>
          </div>

          {/* Task Input Form */}
          <form onSubmit={handleAddTask} className="mb-3.5 relative">
            <input 
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Add task for ${activeMeta.label.split(' ')[0]}...`}
              className="w-full bg-white/5 border border-white/5 hover:border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/90 placeholder-white/20 outline-none transition-all duration-200"
              style={{
                caretColor: activeMeta.color
              }}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1.5 w-6 h-6 rounded-md flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all"
            >
              <Plus size={14} />
            </button>
          </form>

          {/* Simulated Task List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {activeTaskList.length > 0 ? (
              activeTaskList.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] border transition-all cursor-pointer relative overflow-hidden group/item ${
                    task.done 
                      ? 'bg-white/[0.01] border-white/5 opacity-60' 
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                  }`}
                  style={{
                    borderColor: !task.done ? 'rgba(255,255,255,0.05)' : undefined
                  }}
                >
                  {/* Task Checkbox */}
                  <div 
                    className={`w-[16px] h-[16px] rounded-[5px] border flex items-center justify-center transition-all shrink-0 ${
                      task.done 
                        ? 'border-transparent' 
                        : 'border-white/20'
                    }`}
                    style={{
                      backgroundColor: task.done ? activeMeta.color : 'transparent'
                    }}
                  >
                    {task.done && <Check size={10} className="text-slate-900 stroke-[3.5]" />}
                  </div>

                  {/* Task Text */}
                  <span className={`text-[12px] flex-1 leading-tight select-none transition-all ${
                    task.done ? 'line-through text-white/30' : 'text-white/85'
                  }`}>
                    {task.text}
                  </span>

                  {/* Delete Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteTask(task.id)
                    }}
                    className="opacity-0 group-hover/item:opacity-100 w-5 h-5 rounded-md flex items-center justify-center hover:bg-white/10 text-white/30 hover:text-red-400 transition-all shrink-0"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))
            ) : (
              /* Simulated Empty State */
              <div className="flex flex-col items-center justify-center py-10 opacity-30 gap-2">
                <div className="w-8 h-8 rounded-lg border border-dashed border-white/40 flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div className="text-[11px] text-center max-w-[150px] leading-relaxed">
                  No tasks for this block. Add something above!
                </div>
              </div>
            )}
          </div>

          {/* Progress Indicator inside widget */}
          {totalCount > 0 && (
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: activeMeta.color }} />
                <span>Progress</span>
              </div>
              <div>{progressPercent}% ({doneCount}/{totalCount})</div>
            </div>
          )}
        </div>

        {/* Small simulated resize handle */}
        <div className="absolute bottom-1 right-1 opacity-20 pointer-events-none">
          <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
            <path d="M6 1.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 .5-.5zm0 2a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
