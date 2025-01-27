import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tags-input/', // For GitHub docs support
  build: {
    outDir: '../docs', // Actual root "docs" folder because we're in "root" context here
  },
  root: 'example',
});
