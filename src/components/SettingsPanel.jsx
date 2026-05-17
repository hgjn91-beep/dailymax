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
const ALL_BLOCKS = ['fajr', 'dhuhr', 'asr', 'isha', 'night']

function SectionLabel({ children, isMorning }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: isMorning ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255,255,255,0.32)',
      marginBottom: 8,
      marginTop: 18,
    }}>
      {children}
    </div>
  )
}

function Row({ children, isMorning }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '7px 0',
      borderBottom: isMorning ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.04)',
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
        background: value ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
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
  const { prayerTimes, updatePrayerTime, settings, updateSetting, updateBlockColor, clearAll } = useTaskStore()

  const isMorning = settings.theme === 'morning'
  const useSingleAccent = settings.useSingleAccent || false
  const masterColor = settings.masterColor || '#22c55e'
  const blockColors = settings.blockColors || {}

  // Adaptive Visual Styles
  const textColor = isMorning ? '#0f172a' : 'rgba(255, 255, 255, 0.78)'
  const subtextColor = isMorning ? '#475569' : 'rgba(255, 255, 255, 0.52)'
  const headerBorder = isMorning ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)'

  return (
    <div className="settings-panel animate-fade-in" style={{ padding: '0 0 16px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: headerBorder,
        marginBottom: 4,
      }}>
        <span style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 700,
          color: textColor,
          letterSpacing: '0.04em',
        }}>
          ⚙ Settings
        </span>
        <button
          className="ctrl-btn"
          onClick={onClose}
          style={{ color: isMorning ? '#475569' : 'rgba(255,255,255,0.4)' }}
        >
          <CloseIcon />
        </button>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Style & Theme Preference */}
        <SectionLabel isMorning={isMorning}>Theme Style</SectionLabel>
        <div style={{
          display: 'flex',
          background: isMorning ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
          border: isMorning ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
          borderRadius: 10,
          padding: 2,
          gap: 2,
          marginBottom: 10,
        }}>
          <button
            style={{
              flex: 1,
              padding: '6px 0',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              background: !isMorning ? 'var(--accent-dim)' : 'transparent',
              color: !isMorning ? 'var(--accent)' : (isMorning ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)'),
              border: !isMorning ? '1px solid var(--accent-border)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
            onClick={() => updateSetting('theme', 'night')}
          >
            🌌 Night (Dark)
          </button>
          <button
            style={{
              flex: 1,
              padding: '6px 0',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              background: isMorning ? 'var(--accent-dim)' : 'transparent',
              color: isMorning ? 'var(--accent)' : (isMorning ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)'),
              border: isMorning ? '1px solid var(--accent-border)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
            onClick={() => updateSetting('theme', 'morning')}
          >
            ☀️ Morning (Light)
          </button>
        </div>

        {/* Dynamic Theme Color Pickers */}
        <SectionLabel isMorning={isMorning}>Theme Colors</SectionLabel>
        
        {/* Toggle between Single Accent or Individual Block Colors */}
        <Row isMorning={isMorning}>
          <span style={{ fontSize: 12, color: subtextColor }}>Use Unified App Color</span>
          <Toggle
            value={useSingleAccent}
            onChange={v => updateSetting('useSingleAccent', v)}
          />
        </Row>

        {useSingleAccent ? (
          /* Single Master Accent Color Selector */
          <Row isMorning={isMorning}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>🎨</span>
              <span style={{ fontSize: 12, color: subtextColor }}>
                Master Accent Color
              </span>
            </div>
            <input
              type="color"
              value={masterColor}
              onChange={e => updateSetting('masterColor', e.target.value)}
              style={{
                border: 'none',
                width: 38,
                height: 22,
                borderRadius: 5,
                cursor: 'pointer',
                background: 'transparent',
              }}
            />
          </Row>
        ) : (
          /* Individual Block Color Customization */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ALL_BLOCKS.map(block => (
              <Row key={block} isMorning={isMorning}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{BLOCK_META[block]?.emoji}</span>
                  <span style={{ fontSize: 12, color: subtextColor, textTransform: 'capitalize' }}>
                    {BLOCK_META[block]?.label} Color
                  </span>
                </div>
                <input
                  type="color"
                  value={blockColors[block] || BLOCK_META[block]?.color}
                  onChange={e => updateBlockColor(block, e.target.value)}
                  style={{
                    border: 'none',
                    width: 38,
                    height: 22,
                    borderRadius: 5,
                    cursor: 'pointer',
                    background: 'transparent',
                  }}
                />
              </Row>
            ))}
          </div>
        )}

        {/* Prayer times schedule */}
        <SectionLabel isMorning={isMorning}>Prayer Block Times</SectionLabel>
        {PRAYER_BLOCKS.map(block => (
          <Row key={block} isMorning={isMorning}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>{BLOCK_META[block]?.emoji}</span>
              <span style={{ fontSize: 12, color: subtextColor, textTransform: 'capitalize' }}>
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
              <span style={{ color: isMorning ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)', fontSize: 11 }}>→</span>
              <input
                type="time"
                className="time-input"
                value={prayerTimes[block]?.end || '00:00'}
                onChange={e => updatePrayerTime(block, 'end', e.target.value)}
              />
            </div>
          </Row>
        ))}

        {/* Preferences toggles */}
        <SectionLabel isMorning={isMorning}>Preferences</SectionLabel>

        <Row isMorning={isMorning}>
          <span style={{ fontSize: 12, color: subtextColor }}>Auto-clear done tasks</span>
          <Toggle
            value={settings.autoClearDone}
            onChange={v => updateSetting('autoClearDone', v)}
          />
        </Row>

        <Row isMorning={isMorning}>
          <span style={{ fontSize: 12, color: subtextColor }}>Always on top</span>
          <Toggle
            value={settings.pinned}
            onChange={v => updateSetting('pinned', v)}
          />
        </Row>

        {/* Opacity slider */}
        <div style={{ paddingTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: subtextColor }}>Opacity</span>
            <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
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

        {/* Danger zone / Data clear button */}
        <SectionLabel isMorning={isMorning}>Clear Task Data</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PRAYER_BLOCKS.map(block => (
            <button
              key={block}
              onClick={() => {
                if (window.confirm(`Are you sure you want to clear all tasks in ${BLOCK_META[block]?.label}?`)) {
                  clearAll(block)
                }
              }}
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.12)',
                borderRadius: 7,
                color: 'rgba(239,68,68,0.65)',
                fontSize: 11,
                padding: '5px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontWeight: 600,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                e.currentTarget.style.color = 'rgba(239,68,68,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.06)'
                e.currentTarget.style.color = 'rgba(239,68,68,0.65)'
              }}
            >
              Clear all {BLOCK_META[block]?.label} tasks
            </button>
          ))}
        </div>

        {/* Version label */}
        <div style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 9,
          color: isMorning ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.12)',
          letterSpacing: '0.06em',
          fontWeight: 600,
        }}>
          DailyMax v1.0.0
        </div>
      </div>
    </div>
  )
}
