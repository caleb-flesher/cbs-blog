/// <reference types="vitest" />
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import path from 'path';

export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2022'],           // aligned with tsconfig
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    mainFields: ['module', 'browser'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    analog({
      content: {
        highlighter: 'prism',
      },
      prerender: {
        routes: async () => {
          const { globSync } = await import('glob');
          const slugs = globSync('src/content/**/*.md').map((file) =>
            `/blog/${path.basename(file, '.md')}`
          );
          return ['/blog', ...slugs];
        },
        sitemap: {
          host: 'https://calebsbikeshop.com',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/test-setup.ts'],
    },
  },
}));