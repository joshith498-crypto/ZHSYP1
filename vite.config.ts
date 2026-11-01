import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Dynamic base determination for maximum compatibility across hosts:
  // - GitHub Actions sets GITHUB_REPOSITORY (e.g. "joshith498-crypto/ZHSYP1") -> base = "/ZHSYP1/"
  // - Cloudflare Pages sets CF_PAGES -> base = "/"
  // - Custom override via VITE_BASE
  // - Default to './' for fully portable relative links
  const getBase = () => {
    if (process.env.VITE_BASE) {
      return process.env.VITE_BASE;
    }
    if (process.env.CF_PAGES) {
      return '/';
    }
    if (process.env.GITHUB_REPOSITORY) {
      const parts = process.env.GITHUB_REPOSITORY.split('/');
      const repo = parts[1];
      if (repo && !repo.toLowerCase().endsWith('.github.io')) {
        return `/${repo}/`;
      }
      return '/';
    }
    return './';
  };

  return {
    base: getBase(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
