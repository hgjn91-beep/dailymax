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

// Clock display in top-right of header area
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

export default function App() {
  const { prayerTimes, settings } = useTaskStore()
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

  return (
    <div
      className="glass-shell"
      data-block={block}
      style={{ '--glass-opacity': settings?.opacity || 0.88, position: 'relative' }}
    >
      {/* ── Drag Handle / Title Bar ─────────────────────────── */}
      <DragHandle onSettings={() => setShowSettings(s => !s)} blockMeta={meta} />

      {/* ── Block Header ────────────────────────────────────── */}
      <div key={`header-${blockKey}`}>
        <LiveClock />
        <BlockHeader block={block} meta={meta} minutesLeft={minutesLeft} />
      </div>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div style={{
        height: 1,
        margin: '0 12px 8px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }}/>

      {/* ── Task Input ──────────────────────────────────────── */}
      <TaskInput block={block} />

      {/* ── Task List (scrollable) ───────────────────────────── */}
      <div className="tasks-scroll" style={{ flex: 1 }}>
        <div key={`list-${blockKey}`} className="animate-fade-in">
          <TaskList block={block} />
        </div>
      </div>

      {/* ── Resize hint ─────────────────────────────────────── */}
      <ResizeHandle />

      {/* ── Settings Overlay ────────────────────────────────── */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
