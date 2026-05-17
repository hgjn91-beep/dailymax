import React, { useState } from 'react'
import { useTaskStore } from '../store/useTasks'

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
)

export default function TaskItem({ task, block, index }) {
  const { toggleTask, deleteTask } = useTaskStore()
  const [hovered, setHovered] = useState(false)
  const [removing, setRemoving] = useState(false)

  const handleToggle = () => {
    toggleTask(block, task.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    setRemoving(true)
    setTimeout(() => deleteTask(block, task.id), 280)
  }

  return (
    <div
      className={`task-item ${task.done ? 'done' : ''}`}
      style={{
        animationDelay: `${index * 0.04}s`,
        animation: removing
          ? 'fadeOut 0.28s ease forwards'
          : 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        opacity: removing ? 0 : undefined,
        transform: removing ? 'translateX(20px)' : undefined,
        transition: removing ? 'opacity 0.28s ease, transform 0.28s ease' : undefined,
        marginBottom: 6,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleToggle}
    >
      {/* Checkbox */}
      <div className={`task-checkbox ${task.done ? 'checked' : ''}`}>
        {task.done && <CheckIcon />}
      </div>

      {/* Text */}
      <span
        className="task-text"
        style={{
          flex: 1,
          fontSize: 13,
          color: task.done ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.82)',
          lineHeight: 1.4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.25s ease',
        }}
        title={task.text}
      >
        {task.text}
      </span>

      {/* Delete button — visible on hover */}
      <button
        onClick={handleDelete}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.15)',
          padding: 4,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease, color 0.2s ease',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgb(239,68,68)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}
        title="Delete task"
      >
        <TrashIcon />
      </button>
    </div>
  )
}
