import React, { useRef, useEffect } from 'react'
import { useTaskStore } from '../store/useTasks'

const BLOCK_ORDER = ['fajr', 'dhuhr', 'asr', 'isha']

// ─── Circular progress ring ───────────────────────────────────────────────────
function ProgressRing({ pct, size = 48, stroke = 3, color }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * Math.min(pct, 1)

  return (
    <svg width={size} height={size} className="progress-ring">
      {/* Track */}
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      {/* Progress */}
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease', filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  )
}

// ─── Block sequence dots ──────────────────────────────────────────────────────
function BlockDots({ currentBlock }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {BLOCK_ORDER.map((b, i) => {
        const isActive = b === currentBlock
        const isPast   = BLOCK_ORDER.indexOf(currentBlock) > i
        return (
          <div key={b} style={{
            width: isActive ? 16 : 5,
            height: 5,
            borderRadius: 99,
            background: isActive
              ? 'var(--accent)'
              : isPast
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(255,255,255,0.07)',
            boxShadow: isActive ? '0 0 8px var(--accent)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}/>
        )
      })}
    </div>
  )
}

export default function BlockHeader({ block, meta, minutesLeft }) {
  const { tasks } = useTaskStore()
  const blockTasks = tasks[block] || []
  const total = blockTasks.length
  const done  = blockTasks.filter(t => t.done).length
  const pct   = total > 0 ? done / total : 0

  // Max minutes in a block (rough estimate for ring fill)
  const maxMinutes = block === 'fajr' ? 420 : block === 'dhuhr' ? 210 : block === 'asr' ? 180 : block === 'isha' ? 600 : 480
  const timePct = Math.max(0, 1 - (minutesLeft / maxMinutes))

  return (
    <div className="animate-block-in" style={{ padding: '14px 16px 12px', position: 'relative' }}>
      {/* Glow blob behind */}
      <div style={{
        position: 'absolute',
        top: -20, left: '50%', transform: 'translateX(-50%)',
        width: 180, height: 80,
        background: 'var(--accent-glow)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        pointerEvents: 'none',
        animation: 'pulseGlow 4s ease-in-out infinite',
      }}/>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Progress ring wrapping emoji */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <ProgressRing pct={pct} size={50} stroke={2.5} color="var(--accent)" />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>
            {meta.emoji}
          </div>
        </div>

        {/* Block info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 4 }}>
            <span className="block-badge">{meta.label}</span>
          </div>

          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {total === 0
              ? 'No tasks yet'
              : done === total
                ? `✓ All ${total} done`
                : `${done} / ${total} done`
            }
            {minutesLeft > 0 && (
              <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.20)' }}>
                · {formatTimeLeft(minutesLeft)} left
              </span>
            )}
          </div>
        </div>

        {/* Block sequence dots */}
        <BlockDots currentBlock={block} />
      </div>
    </div>
  )
}

function formatTimeLeft(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h > 0) return `${h}h${m > 0 ? ` ${m}m` : ''}`
  return `${m}m`
}
