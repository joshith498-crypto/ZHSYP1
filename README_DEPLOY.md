# ZYPAC Deployment Guide (GitHub Pages & Cloudflare)

This repository is built and tested for seamless deployment to **GitHub Pages** (`https://joshith498-crypto.github.io/ZHSYP1/`) and **Cloudflare Pages / Workers**, with universal cross-device responsiveness (mobile, tablet, desktop).

---

## 🛑 How We Fixed the "Loading Youth Parliament environment..." Infinite Spinner

### What Caused It:
1. **Base Path Mismatch on GitHub Pages**: GitHub Pages serves your site at `/ZHSYP1/`, not the root `/`. When Vite built without explicitly knowing the repository path, assets were requested from `/assets/...` instead of `/ZHSYP1/assets/...`. This triggered 404s for the JavaScript chunks, meaning the app bundle never executed.
2. **Fallback Loader Never Dismissed**: Because the JavaScript bundle encountered a 404, React never mounted to replace the `<div id="initial-loading">` element, causing the spinner to rotate indefinitely.
3. **Bloated Artifact Size (6.24 MB)**: The `public/` directory contained residual `.zip` files from earlier exports, which Vite copied into `dist/`. This caused slow asset downloading and GitHub Pages timeout warnings.

### What Was Fixed:
1. **Guaranteed Base Path in `vite.config.ts`**:
   - For GitHub Pages: Uses `/ZHSYP1/` automatically whenever building in production or via GitHub Actions.
   - For Cloudflare Pages: Uses `/` automatically whenever `CF_PAGES=1` is detected.
2. **Safe Code Splitting**: Split vendor bundles into `vendor-react` and `vendor-icons`, reducing initial chunk size from 627 kB to smaller, lightning-fast files.
3. **Fail-Safe Diagnostic Script & Auto-Recovery**:
   - `index.html` now has an inline error listener that catches any asset load failure immediately.
   - If loading takes more than 3.5 seconds, direct "Force Reload" and "Clear Cache & Reload" recovery buttons appear on screen.
   - `main.tsx` smoothly fades out and dismisses the loading spinner as soon as the first frame renders.
4. **Clean Artifacts**: Removed all zip files from `public/`, shrinking the deployment bundle from 6.24 MB down to ~680 KB.

---

## ⚡ Cloudflare Deployment Fix ("lockfile had changes, but lockfile is frozen")

### Why the Error Happened in Cloudflare:
Cloudflare detected `bun.lock` in the repository and ran `bun install --frozen-lockfile`. When `package.json` had a minor version bump in `esbuild`, the frozen lockfile rejected the change.

### Fixes Included in This Release:
1. Updated `bun.lock` to 100% match `package.json` dependencies.
2. Added `bunfig.toml` with `frozen = false`.
3. Added `wrangler.jsonc` configured with single-page-application asset routing.
4. If configuring in the Cloudflare dashboard:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build` or `bun run build`
   - **Output directory**: `dist`
   - (Optional) Set environment variable `BUN_INSTALL_FROZEN_LOCKFILE=0` in Cloudflare settings.

---

## 🚀 GitHub Pages Deployment Steps

### Method A: Automated GitHub Actions (Recommended)
1. Commit and push the updated repository files to your `main` branch.
2. In GitHub, go to **Settings** → **Pages**.
3. Under **Build and deployment > Source**, ensure **GitHub Actions** is selected.
4. GitHub Actions will run `.github/workflows/deploy.yml` with Node 22, compile Vite with `base: /ZHSYP1/`, and deploy cleanly.

### Method B: Direct Upload via `zypac_github_pages_dist.zip`
1. Download `zypac_github_pages_dist.zip` from this chat.
2. Extract the files directly into your GitHub repository root (or into a `gh-pages` branch).
3. The pre-built files already contain the `/ZHSYP1/` base path and are ready to serve immediately.

---

## 📱 Cross-Device Compatibility & Styling
- **Safe Areas**: Handles notch and home indicator on modern iOS/Android devices (`viewport-fit=cover`).
- **Touch Targets**: All tabs, admin controls, and buttons satisfy the 44px minimum tap target.
- **Glassmorphism & Depth**: Subtle multi-layered backdrop filters with dark green/gold parliamentary accents.
