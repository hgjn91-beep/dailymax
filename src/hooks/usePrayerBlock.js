import { useState, useEffect, useCallback } from 'react'

// ─── Default prayer times ─────────────────────────────────────────────────────
const DEFAULT_TIMES = {
  fajr:  { start: '05:00', end: '12:00' },
  dhuhr: { start: '12:00', end: '15:30' },
  asr:   { start: '15:30', end: '18:30' },
  isha:  { start: '18:30', end: '05:00' },
}

const BLOCK_META = {
  fajr:  { label: 'After Fajr',  icon: '🌙', emoji: '🌅', color: '#818cf8' },
  dhuhr: { label: 'After Dhuhr', icon: '☀️',  emoji: '☀️',  color: '#38bdf8' },
  asr:   { label: 'After Asr',   icon: '🌤️', emoji: '🌤️', color: '#fb923c' },
  isha:  { label: 'After Isha',  icon: '🌌', emoji: '🌌', color: '#a78bfa' },
  night: { label: 'Night',       icon: '🌑', emoji: '🌑', color: '#64748b' },
}

// Parse "HH:MM" → total minutes from midnight
function parseMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

// Get current minutes from midnight
function nowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

// Check if current time (in minutes) is within [start, end]
// Handles overnight ranges (e.g., 18:30 → 05:00)
function isInRange(current, startMin, endMin) {
  if (startMin <= endMin) {
    return current >= startMin && current < endMin
  } else {
    // Overnight: e.g., 22:00 → 05:00
    return current >= startMin || current < endMin
  }
}

function detectBlock(times) {
  const current = nowMinutes()
  const blocks = ['fajr', 'dhuhr', 'asr', 'isha']

  for (const block of blocks) {
    const t = times[block] || DEFAULT_TIMES[block]
    const startMin = parseMinutes(t.start)
    const endMin   = parseMinutes(t.end)
    if (isInRange(current, startMin, endMin)) {
      return block
    }
  }
  return 'night'
}

function minutesUntilNext(times, currentBlock) {
  const blocks = ['fajr', 'dhuhr', 'asr', 'isha']
  const current = nowMinutes()
  const idx = blocks.indexOf(currentBlock)

  if (idx === -1) {
    // Night — time until fajr
    const fajrStart = parseMinutes((times.fajr || DEFAULT_TIMES.fajr).start)
    const diff = fajrStart > current ? fajrStart - current : (24 * 60 - current + fajrStart)
    return diff
  }

  const nextBlock = blocks[(idx + 1) % blocks.length]
  const nextStart = parseMinutes((times[nextBlock] || DEFAULT_TIMES[nextBlock]).start)
  const diff = nextStart > current ? nextStart - current : (24 * 60 - current + nextStart)
  return diff
}

function formatCountdown(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function usePrayerBlock(prayerTimes) {
  const times = prayerTimes || DEFAULT_TIMES

  const compute = useCallback(() => {
    const block = detectBlock(times)
    const minutesLeft = minutesUntilNext(times, block)
    return {
      block,
      meta: BLOCK_META[block],
      minutesLeft,
      countdownLabel: formatCountdown(minutesLeft),
    }
  }, [JSON.stringify(times)])

  const [state, setState] = useState(compute)

  useEffect(() => {
    setState(compute())
    const interval = setInterval(() => setState(compute()), 30_000)
    return () => clearInterval(interval)
  }, [compute])

  return state
}

export { DEFAULT_TIMES, BLOCK_META }
