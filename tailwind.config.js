/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Base
        base: {
          DEFAULT: 'rgba(8, 8, 18, 0.0)',
          glass: 'rgba(12, 12, 28, 0.55)',
          surface: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        // Prayer block accents
        fajr: {
          DEFAULT: '#34d399',   // Bright minty green
          glow: 'rgba(52, 211, 153, 0.25)',
          dim: 'rgba(52, 211, 153, 0.08)',
        },
        dhuhr: {
          DEFAULT: '#22c55e',   // Vibrant emerald brand green
          glow: 'rgba(34, 197, 94, 0.25)',
          dim: 'rgba(34, 197, 94, 0.08)',
        },
        asr: {
          DEFAULT: '#10b981',   // Rich green-teal accent
          glow: 'rgba(16, 185, 129, 0.25)',
          dim: 'rgba(16, 185, 129, 0.08)',
        },
        isha: {
          DEFAULT: '#059669',   // Deep glowing green
          glow: 'rgba(5, 150, 105, 0.25)',
          dim: 'rgba(5, 150, 105, 0.08)',
        },
        night: {
          DEFAULT: '#a7f3d0',   // Very soft sage/mint
          glow: 'rgba(167, 243, 208, 0.18)',
          dim: 'rgba(167, 243, 208, 0.05)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'check-bounce': 'checkBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'block-transition': 'blockTransition 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        checkBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        blockTransition: {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      backdropBlur: {
        glass: '24px',
      },
    },
  },
  plugins: [],
}
