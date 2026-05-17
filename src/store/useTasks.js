import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_TIMES } from '../hooks/usePrayerBlock'

let idCounter = Date.now()
const uid = () => `task_${++idCounter}`

const BLOCKS = ['fajr', 'dhuhr', 'asr', 'isha', 'night']

const initialTasks = Object.fromEntries(BLOCKS.map(b => [b, []]))

export const useTaskStore = create(
  persist(
    (set, get) => ({
      // ── Tasks: { [block]: Task[] }
      tasks: initialTasks,

      // ── Prayer time config
      prayerTimes: DEFAULT_TIMES,

      // ── Settings
      settings: {
        autoClearDone: false,
        opacity: 0.98,
        pinned: true,
        mode: 'planning',
        theme: 'night',
        useSingleAccent: false,
        masterColor: '#22c55e',
        blockColors: {
          fajr: '#34d399',
          dhuhr: '#22c55e',
          asr: '#10b981',
          isha: '#059669',
          night: '#a7f3d0'
        }
      },

      // ─── Task Actions ──────────────────────────────────────
      addTask: (block, text) => {
        if (!text.trim()) return
        const task = {
          id: uid(),
          text: text.trim(),
          done: false,
          createdAt: Date.now(),
        }
        set(state => ({
          tasks: {
            ...state.tasks,
            [block]: [task, ...state.tasks[block]],
          },
        }))
      },

      toggleTask: (block, id) => {
        set(state => ({
          tasks: {
            ...state.tasks,
            [block]: state.tasks[block].map(t =>
              t.id === id ? { ...t, done: !t.done } : t
            ),
          },
        }))
      },

      deleteTask: (block, id) => {
        set(state => ({
          tasks: {
            ...state.tasks,
            [block]: state.tasks[block].filter(t => t.id !== id),
          },
        }))
      },

      clearDone: (block) => {
        set(state => ({
          tasks: {
            ...state.tasks,
            [block]: state.tasks[block].filter(t => !t.done),
          },
        }))
      },

      clearAll: (block) => {
        set(state => ({
          tasks: {
            ...state.tasks,
            [block]: [],
          },
        }))
      },

      reorderTask: (block, fromIdx, toIdx) => {
        set(state => {
          const list = [...state.tasks[block]]
          const [item] = list.splice(fromIdx, 1)
          list.splice(toIdx, 0, item)
          return { tasks: { ...state.tasks, [block]: list } }
        })
      },

      // ─── Prayer Time Config ────────────────────────────────
      updatePrayerTime: (block, field, value) => {
        set(state => ({
          prayerTimes: {
            ...state.prayerTimes,
            [block]: { ...state.prayerTimes[block], [field]: value },
          },
        }))
        // Sync to electron-store if available
        if (window.electronAPI) {
          window.electronAPI.storeSet('prayerTimes', get().prayerTimes)
        }
      },

      // ─── Settings ──────────────────────────────────────────
      updateSetting: (key, value) => {
        set(state => ({
          settings: { ...state.settings, [key]: value },
        }))
        if (key === 'opacity' && window.electronAPI) {
          window.electronAPI.setOpacity(value)
        }
        if (key === 'pinned' && window.electronAPI) {
          window.electronAPI.togglePin(value)
        }
      },

      updateBlockColor: (block, color) => {
        set(state => ({
          settings: {
            ...state.settings,
            blockColors: {
              ...(state.settings.blockColors || {
                fajr: '#34d399',
                dhuhr: '#22c55e',
                asr: '#10b981',
                isha: '#059669',
                night: '#a7f3d0'
              }),
              [block]: color
            }
          }
        }))
      },
    }),
    {
      name: 'dailymax-store',
      version: 1,
    }
  )
)
