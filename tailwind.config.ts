import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'accent-1': 'var(--color-accent-1)',
        'accent-2': 'var(--color-accent-2)',
        'accent-3': 'var(--color-accent-3)',
        'accent-4': 'var(--color-accent-4)',
        'accent-5': 'var(--color-accent-5)',
        'accent-6': 'var(--color-accent-6)',
        'button': 'var(--color-button)',
        'error': 'var(--color-error)',
        'warning': 'var(--color-warning)',
        'success': 'var(--color-success)',
        'info': 'var(--color-info)',
        'background-1': 'var(--color-background-1)',
        'background-2': 'var(--color-background-2)',
        'primary': 'var(--color-primary)',
        'border-1': 'var(--color-border-1)',
      }
    },
  },
  plugins: [],
}
export default config
