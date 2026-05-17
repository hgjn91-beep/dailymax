import React from 'react'
import { useTaskStore } from '../store/useTasks'

// SVG Icons
const PinIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L8.5 8H4l4 5.5L6 22l6-3 6 3-2-8.5L20 8h-4.5L12 2z"/>
  </svg>
)

const GearIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const MinimizeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const LogoIcon = () => (
  <img 
    src="./logo.png" 
    style={{ 
      width: 14, 
      height: 14, 
      borderRadius: 3, 
      objectFit: 'contain',
      border: '1px solid rgba(255,255,255,0.1)'
    }} 
    alt="DM" 
  />
)

export default function DragHandle({ onSettings, blockMeta }) {
  const { settings, updateSetting } = useTaskStore()
  const pinned = settings.pinned

  const handleClose = () => {
    if (window.electronAPI) window.electronAPI.closeWindow()
  }

  const handleMinimize = () => {
    if (window.electronAPI) window.electronAPI.minimizeWindow()
  }

  const handlePin = () => {
    updateSetting('pinned', !pinned)
  }

  return (
    <div className="drag-handle" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {/* App name + live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flex: 1 }}>
        <LogoIcon />
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase',
        }}>
          DailyMax
        </span>
      </div>

      {/* Controls — no-drag region */}
      <div style={{ display: 'flex', gap: 4 }}>
        <button className={`ctrl-btn ${pinned ? 'active' : ''}`} onClick={handlePin} title={pinned ? 'Unpin' : 'Pin on top'}>
          <PinIcon filled={pinned} />
        </button>
        <button className="ctrl-btn" onClick={onSettings} title="Settings">
          <GearIcon />
        </button>
        <button className="ctrl-btn" onClick={handleMinimize} title="Minimize">
          <MinimizeIcon />
        </button>
        <button className="ctrl-btn danger" onClick={handleClose} title="Close to tray">
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
