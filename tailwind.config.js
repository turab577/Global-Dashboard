// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'progress': 'progress 1.5s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'scaleX(0)' },
          '50%': { transform: 'scaleX(0.5)' },
          '100%': { transform: 'scaleX(1)' },
        }
      }
    }
  }
}