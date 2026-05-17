import React from 'react'
import { useTaskStore } from '../store/useTasks'
import TaskItem from './TaskItem'

const EmptyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.2)' }}>
    <rect x="3" y="3" width="18" height="18" rx="4"/>
    <line x1="9" y1="9" x2="15" y2="9"/>
    <line x1="9" y1="13" x2="13" y2="13"/>
  </svg>
)

const BroomIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l9-9"/>
    <path d="M12.22 6.22 18 12c.85 1 .8 2.44-.17 3.38L13 20H7l-1-6 3.78-5.78c.77-1.19 2.22-1.5 3.44-.77z"/>
  </svg>
)

export default function TaskList({ block }) {
  const { tasks, clearDone } = useTaskStore()
  const list = tasks[block] || []
  const hasDone = list.some(t => t.done)

  const pending   = list.filter(t => !t.done)
  const completed = list.filter(t => t.done)

  if (list.length === 0) {
    return (
      <div className="empty-state">
        <EmptyIcon />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.6 }}>
          No tasks for this block.<br/>
          <span style={{ color: 'var(--accent)', opacity: 0.6 }}>Add something above ↑</span>
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 10px 8px' }}>
      {/* Pending tasks */}
      {pending.map((task, i) => (
        <TaskItem key={task.id} task={task} block={block} index={i} />
      ))}

      {/* Completed section */}
      {completed.length > 0 && (
        <div style={{ marginTop: pending.length > 0 ? 8 : 0 }}>
          {/* Section header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
            paddingLeft: 2,
          }}>
            <div style={{
              flex: 1,
              height: 1,
              background: 'rgba(255,255,255,0.05)',
            }}/>
            <span style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              Done · {completed.length}
            </span>
            <button
              onClick={() => clearDone(block)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10,
                color: 'rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 5,
                padding: '2px 6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <BroomIcon /> clear
            </button>
            <div style={{
              flex: 1,
              height: 1,
              background: 'rgba(255,255,255,0.05)',
            }}/>
          </div>

          {completed.map((task, i) => (
            <TaskItem key={task.id} task={task} block={block} index={pending.length + i} />
          ))}
        </div>
      )}
    </div>
  )
}
