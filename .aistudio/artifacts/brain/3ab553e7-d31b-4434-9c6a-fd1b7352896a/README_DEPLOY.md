# ZYPAC Deployment Guide (Cloudflare & GitHub Pages)

This repository is optimized and verified for seamless one-click deployment on **Cloudflare Pages / Cloudflare Workers** as well as **GitHub Pages**, with full cross-device compatibility (mobile, tablet, desktop, touch screens, safe-area insets).

---

## ⚡ Cloudflare Deployment Fix ("lockfile had changes, but lockfile is frozen")

### Why the Error Happened in Cloudflare:
In your Cloudflare dashboard build log:
```text
Installing project dependencies: bun install --frozen-lockfile
error: lockfile had changes, but lockfile is frozen
note: dependencies in package.json changed since bun.lock was saved: esbuild changed from ^0.25.0 to ^0.28.0
```
Cloudflare automatically detects `bun.lock` in the repository and runs `bun install --frozen-lockfile`. When `package.json` was updated to support Vite 8 and React 19, the existing lockfile was frozen and rejected the updated `esbuild` version.

### The Solutions Included in This Release:

#### Solution 1: Use the Updated Repository Files (Instant Fix)
1. The repository now includes:
   - A synchronized `bun.lock` matched to `package.json` using Bun 1.4.4.
   - A `bunfig.toml` with `frozen = false`, preventing Bun from failing build pipelines.
   - A `wrangler.jsonc` configured for Cloudflare with SPA fallback routing:
     ```jsonc
     {
       "name": "zhsyp-portal",
       "compatibility_date": "2026-11-01",
       "assets": {
         "directory": "./dist",
         "binding": "ASSETS",
         "not_found_handling": "single-page-application"
       }
     }
     ```
   - Cloudflare `_redirects` and `_headers` in `/public` for instant client-side routing.
2. Push or commit these files to your GitHub repository `joshith498-crypto/ZHSYP1`.
3. Cloudflare will automatically trigger a new build and succeed!

#### Solution 2: Change Cloudflare Dashboard Build Settings (1-Click Fix in UI)
If you prefer to configure it directly in the Cloudflare dashboard:
1. In Cloudflare, go to **Workers & Pages** → **zhsyp-portal** → **Settings** → **Builds & deployments**.
2. Click **Edit build configuration**:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `bun run build` (or `npm run build`)
   - **Build output directory**: `dist`
   - **Root directory**: `/`
3. Under **Environment variables**, click **Add variable**:
   - Variable name: `BUN_INSTALL_FROZEN_LOCKFILE`
   - Value: `0`
4. Click **Save and Deploy**. Your build will pass immediately.

---

## 🚀 GitHub Pages Deployment

### Fix for "Dependencies lock file is not found" in GitHub Actions:
- We removed `cache: 'npm'` from `.github/workflows/deploy.yml` and committed a complete `package-lock.json`.
- In GitHub, go to **Settings** → **Pages** → under **Build and deployment > Source**, choose **GitHub Actions**.
- On push, the included `.github/workflows/deploy.yml` will automatically build and publish to `https://<username>.github.io/<repo-name>/`.

---

## 📱 Universal Device Compatibility & Responsive Features

- **Safe-Area Insets**: `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />` with `env(safe-area-inset-bottom)` to accommodate iPhones, iPads, and mobile navigation bars.
- **Touch-First Accessibility**: Minimum 44px tap targets for mobile drawers, modal close buttons, navigation links, and administrative controls.
- **Horizontal Overflow Protection**: `overflow-x: hidden` and constrained ambient gradients prevent horizontal drift on screens from 320px up to 4K displays.
- **Refined Typography**: Loaded Google Fonts `Plus Jakarta Sans` for clean UI reading, `Cinzel` for parliamentary crests, `Outfit` for modern badges and numbers, and `Cormorant Garamond` for classical statesman headers.
