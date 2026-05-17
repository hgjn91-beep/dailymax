import React, { useState, useEffect, useRef } from 'react'
import DragHandle from './components/DragHandle'
import BlockHeader from './components/BlockHeader'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import SettingsPanel from './components/SettingsPanel'
import { usePrayerBlock } from './hooks/usePrayerBlock'
import { useTaskStore } from './store/useTasks'

function ResizeHandle() {
  return (
    <div className="resize-handle">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <path d="M11 5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0 0 1h9a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h6a.5.5 0 0 0 .5-.5zm0-6a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5z"/>
      </svg>
    </div>
  )
}

function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const t = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'JetBrains Mono, monospace',
      color: 'rgba(255,255,255,0.28)',
      letterSpacing: '0.05em',
      marginBottom: 2,
      textAlign: 'center',
    }}>
      {time}
    </div>
  )
}

function formatTime(d) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// Convert HEX color to RGBA with dynamic transparency
function hexToRgba(hex, alpha) {
  if (!hex) return 'transparent'
  let c = hex.substring(0, 1) === '#' ? hex.substring(1) : hex
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]
  }
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// ⚡ Focus (Doing) Mode Sub-Component with Stopwatch
function FocusDashboard({ block, tasks, toggleTask, reorderTask }) {
  const blockTasks = tasks[block] || []
  const activeTasks = blockTasks.filter(t => !t.done)
  const focusTask = activeTasks[0]

  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Reset timer whenever focus task ID changes
  useEffect(() => {
    setSeconds(0)
    setIsRunning(false)
  }, [focusTask?.id])

  // Stopwatch interval
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatStopwatch = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600)
    const mins = Math.floor((totalSecs % 3600) / 60)
    const secs = totalSecs % 60
    const pad = (n) => String(n).padStart(2, '0')
    if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    return `${pad(mins)}:${pad(secs)}`
  }

  const handleSkip = () => {
    const idx = blockTasks.findIndex(t => t.id === focusTask.id)
    if (idx !== -1 && blockTasks.length > 1) {
      reorderTask(block, idx, blockTasks.length - 1)
    }
  }

  if (activeTasks.length === 0) {
    return (
      <div className="empty-state animate-fade-in" style={{ padding: '40px 16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ fontSize: 32 }}>🎉</span>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginTop: 8 }}>
          Block Fully Completed!
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, maxWidth: 200, margin: '4px auto 0' }}>
          All tasks in this block have been completed. Take a breather or enjoy a break!
        </div>
      </div>
    )
  }

  return (
    <div className="focus-card animate-slide-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="block-badge" style={{ transform: 'scale(0.9)', marginBottom: -4 }}>
        🎯 Active Task
      </div>
      
      <div className="focus-task-text">
        {focusTask.text}
      </div>

      {/* Focus Timer */}
      <div className="focus-timer">
        <span style={{ fontSize: 13, opacity: 0.4, fontWeight: 600 }}>⏱️</span>
        {formatStopwatch(seconds)}
      </div>

      {/* Timer Controls */}
      <div className="timer-controls">
        <button
          className="ctrl-btn"
          style={{ width: 32, height: 32, borderRadius: 10 }}
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? 'Pause' : 'Start Focus'}
        >
          {isRunning ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>

        <button
          className="focus-btn primary"
          onClick={() => toggleTask(block, focusTask.id)}
        >
          ✓ Complete
        </button>

        {blockTasks.length > 1 && (
          <button
            className="focus-btn secondary"
            onClick={handleSkip}
            title="Skip to end of list"
          >
            → Skip
          </button>
        )}
      </div>

      {/* Progress Pips */}
      <div className="focus-progress-pips">
        {blockTasks.map((t) => {
          let status = 'pending'
          if (t.done) status = 'done'
          else if (t.id === focusTask.id) status = 'active'
          return (
            <div
              key={t.id}
              className={`progress-pip ${status}`}
              title={t.text}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const { prayerTimes, settings, updateSetting, tasks, toggleTask, reorderTask } = useTaskStore()
  const { block, meta, minutesLeft } = usePrayerBlock(prayerTimes)
  const [showSettings, setShowSettings] = useState(false)
  const prevBlockRef = useRef(block)
  const [blockKey, setBlockKey] = useState(0)

  // Detect block change → re-mount header for animation
  useEffect(() => {
    if (prevBlockRef.current !== block) {
      prevBlockRef.current = block
      setBlockKey(k => k + 1)
    }
  }, [block])

  const mode = settings?.mode || 'planning'
  const blockColors = settings?.blockColors || {}
  const useSingleAccent = settings?.useSingleAccent || false
  const masterColor = settings?.masterColor || '#22c55e'
  const theme = settings?.theme || 'night'

  // Determine dynamic colors to inject
  const colorsToInject = useSingleAccent
    ? {
        fajr: masterColor,
        dhuhr: masterColor,
        asr: masterColor,
        isha: masterColor,
        night: masterColor
      }
    : {
        fajr: blockColors.fajr || '#34d399',
        dhuhr: blockColors.dhuhr || '#22c55e',
        asr: blockColors.asr || '#10b981',
        isha: blockColors.isha || '#059669',
        night: blockColors.night || '#a7f3d0'
      }

  return (
    <div
      className="glass-shell"
      data-block={block}
      data-theme={theme}
      style={{ '--glass-opacity': settings?.opacity || 0.88, position: 'relative' }}
    >
      {/* Dynamic CSS Variables Injector for Custom Swatches */}
      <style>
        {Object.entries(colorsToInject).map(([b, color]) => `
          [data-block="${b}"] {
            --accent: ${color} !important;
            --accent-glow: ${hexToRgba(color, 0.25)} !important;
            --accent-dim: ${hexToRgba(color, 0.08)} !important;
            --accent-border: ${hexToRgba(color, 0.22)} !important;
          }
        `).join('\n')}
      </style>

      {/* ── Drag Handle / Title Bar ─────────────────────────── */}
      <DragHandle onSettings={() => setShowSettings(s => !s)} blockMeta={meta} />

      {/* ── Block Header ────────────────────────────────────── */}
      <div key={`header-${blockKey}`}>
        <LiveClock />
        <BlockHeader block={block} meta={meta} minutesLeft={minutesLeft} />
      </div>

      {/* ── Mode Switcher Tab Bar ───────────────────────────── */}
      <div className="mode-tab-bar">
        <div
          className={`mode-tab ${mode === 'planning' ? 'active' : ''}`}
          onClick={() => updateSetting('mode', 'planning')}
        >
          📝 Plan
        </div>
        <div
          className={`mode-tab ${mode === 'doing' ? 'active' : ''}`}
          onClick={() => updateSetting('mode', 'doing')}
        >
          ⚡ Focus
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div style={{
        height: 1,
        margin: '0 12px 8px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }}/>

      {/* ── Conditional Content Layout ───────────────────────── */}
      {mode === 'planning' ? (
        <>
          {/* Plan Mode: Input + Checklist */}
          <TaskInput block={block} />
          <div className="tasks-scroll" style={{ flex: 1 }}>
            <div key={`list-${blockKey}`} className="animate-fade-in">
              <TaskList block={block} />
            </div>
          </div>
        </>
      ) : (
        /* Focus (Doing) Mode Dashboard */
        <FocusDashboard
          block={block}
          tasks={tasks}
          toggleTask={toggleTask}
          reorderTask={reorderTask}
        />
      )}

      {/* ── Resize hint ─────────────────────────────────────── */}
      <ResizeHandle />

      {/* ── Settings Overlay ────────────────────────────────── */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
