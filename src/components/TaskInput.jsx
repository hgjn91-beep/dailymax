import React, { useState, useRef } from 'react'
import { useTaskStore } from '../store/useTasks'

const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

export default function TaskInput({ block }) {
  const [value, setValue] = useState('')
  const { addTask } = useTaskStore()
  const inputRef = useRef(null)

  const submit = () => {
    if (!value.trim()) return
    addTask(block, value)
    setValue('')
    inputRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') submit()
    if (e.key === 'Escape') setValue('')
  }

  return (
    <div style={{ padding: '0 12px 10px', position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          className="task-input"
          style={{ paddingRight: 38 }}
          type="text"
          placeholder="Add a task… (Enter)"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          maxLength={120}
          autoFocus
        />
        {value.trim() && (
          <button
            onClick={submit}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 6,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              boxShadow: '0 0 10px var(--accent-glow)',
              animation: 'fadeIn 0.15s ease forwards',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              e.currentTarget.style.boxShadow = '0 0 16px var(--accent-glow)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              e.currentTarget.style.boxShadow = '0 0 10px var(--accent-glow)'
            }}
          >
            <SendIcon />
          </button>
        )}
      </div>
    </div>
  )
}
