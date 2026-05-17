import React from 'react'
import { useTaskStore } from '../store/useTasks'
import { BLOCK_META } from '../hooks/usePrayerBlock'

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const PRAYER_BLOCKS = ['fajr', 'dhuhr', 'asr', 'isha']

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 8,
      marginTop: 16,
    }}>
      {children}
    </div>
  )
}

function Row({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '7px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      {children}
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 34,
        height: 18,
        borderRadius: 99,
        background: value ? 'var(--accent)' : 'rgba(255,255,255,0.10)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.25s ease',
        boxShadow: value ? '0 0 8px var(--accent-glow)' : 'none',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 2, left: value ? 18 : 2,
        width: 14, height: 14,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}/>
    </div>
  )
}

export default function SettingsPanel({ onClose }) {
  const { prayerTimes, updatePrayerTime, settings, updateSetting, clearAll } = useTaskStore()

  return (
    <div className="settings-panel" style={{ padding: '0 0 16px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: 4,
      }}>
        <span style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.04em',
        }}>
          ⚙ Settings
        </span>
        <button className="ctrl-btn" onClick={onClose}><CloseIcon /></button>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Prayer times */}
        <SectionLabel>Prayer Block Times</SectionLabel>
        {PRAYER_BLOCKS.map(block => (
          <Row key={block}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>{BLOCK_META[block]?.emoji}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'capitalize' }}>
                {BLOCK_META[block]?.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="time"
                className="time-input"
                value={prayerTimes[block]?.start || '00:00'}
                onChange={e => updatePrayerTime(block, 'start', e.target.value)}
              />
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>→</span>
              <input
                type="time"
                className="time-input"
                value={prayerTimes[block]?.end || '00:00'}
                onChange={e => updatePrayerTime(block, 'end', e.target.value)}
              />
            </div>
          </Row>
        ))}

        {/* Preferences */}
        <SectionLabel>Preferences</SectionLabel>

        <Row>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Auto-clear done tasks</span>
          <Toggle
            value={settings.autoClearDone}
            onChange={v => updateSetting('autoClearDone', v)}
          />
        </Row>

        <Row>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Always on top</span>
          <Toggle
            value={settings.pinned}
            onChange={v => updateSetting('pinned', v)}
          />
        </Row>

        {/* Opacity slider */}
        <div style={{ paddingTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Opacity</span>
            <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
              {Math.round(settings.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={settings.opacity}
            onChange={e => updateSetting('opacity', parseFloat(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent)',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Danger zone */}
        <SectionLabel>Data</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PRAYER_BLOCKS.map(block => (
            <button
              key={block}
              onClick={() => clearAll(block)}
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.12)',
                borderRadius: 7,
                color: 'rgba(239,68,68,0.55)',
                fontSize: 11,
                padding: '5px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                e.currentTarget.style.color = 'rgba(239,68,68,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.06)'
                e.currentTarget.style.color = 'rgba(239,68,68,0.55)'
              }}
            >
              Clear all {BLOCK_META[block]?.label} tasks
            </button>
          ))}
        </div>

        {/* Version */}
        <div style={{
          marginTop: 16,
          textAlign: 'center',
          fontSize: 10,
          color: 'rgba(255,255,255,0.12)',
          letterSpacing: '0.06em',
        }}>
          DailyMax v1.0.0
        </div>
      </div>
    </div>
  )
}
