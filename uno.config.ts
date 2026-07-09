import { defineConfig, presetUno, presetTypography } from 'unocss'

// Restrained, typographic design system.
// Severity is the only strong color accent (see PLAN §6).
export default defineConfig({
  presets: [
    presetUno(),
    presetTypography()
  ],
  theme: {
    colors: {
      // Neutral ink/paper scale
      ink: '#1a1a1a',
      muted: '#5c5c5c',
      faint: '#8a8a8a',
      line: '#e5e5e5',
      paper: '#ffffff',
      // Severity accents — the only strong colors in the UI
      severity: {
        low: '#3a7d44',
        medium: '#b7791f',
        high: '#c05621',
        critical: '#c53030'
      }
    },
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
    }
  },
  shortcuts: {
    'container-prose': 'max-w-3xl mx-auto px-6',
    'container-wide': 'max-w-5xl mx-auto px-6'
  }
})
