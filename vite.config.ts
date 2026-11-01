import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  // Dynamic base determination for maximum compatibility across hosts:
  // - BASE_URL or VITE_BASE environment override
  // - Cloudflare Pages (CF_PAGES=1) -> "/"
  // - GitHub Actions (GITHUB_REPOSITORY) -> "/<repo>/"
  // - Production default for this project -> "/ZHSYP1/" (guarantees absolute paths on GitHub Pages)
  // - Local / Dev default -> "/"
  const getBase = () => {
    if (process.env.BASE_URL) {
      return process.env.BASE_URL.endsWith('/') ? process.env.BASE_URL : `${process.env.BASE_URL}/`;
    }
    if (process.env.VITE_BASE) {
      return process.env.VITE_BASE;
    }
    if (process.env.CF_PAGES || process.env.VERCEL || process.env.NETLIFY) {
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
    if (mode === 'production') {
      return '/ZHSYP1/';
    }
    return '/';
  };

  return {
    base: getBase(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
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
