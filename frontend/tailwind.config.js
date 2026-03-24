import dockPreset from './src/styles/dock-tailwind-preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dockPreset],
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // CSS custom properties for white-label overrides (dock_enterprise)
      // --dock-bar-bg and --dock-bar-fg are the two enterprise override points
    },
  },
  plugins: [],
}
