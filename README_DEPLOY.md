# ZYPAC Deployment Guide (GitHub Pages & Cloudflare)

This repository is optimized and verified for seamless one-click deployment on **GitHub Pages** as well as **Cloudflare Pages / Workers**, with complete cross-device responsiveness.

---

## 🛠️ GitHub Pages White Screen Fix

If your GitHub Actions build passed ("Deployed to Pages") but visiting the site showed a **blank white screen**, here is why and how it is fixed:

### 1. Root Cause 1: Missing Trailing Slash on Repository URLs
- **The Issue**: On GitHub Pages, repository sites are hosted at `https://<username>.github.io/<repo-name>/`.
  When a visitor or browser opens `https://<username>.github.io/<repo-name>` (without the trailing `/`), relative assets like `./assets/index.js` resolve to `https://<username>.github.io/assets/index.js` (at the root instead of inside `/ZHSYP1/`), resulting in a 404 HTML response and a blank white screen!
- **The Solution**: 
  - In `vite.config.ts`, Vite now detects `GITHUB_REPOSITORY` in GitHub Actions and automatically configures `base: '/ZHSYP1/'`. All script and CSS links resolve to the exact absolute repository path.
  - In `index.html`, an instant inline script in `<head>` automatically detects missing trailing slashes on `github.io` and normalizes the URL to `https://<username>.github.io/ZHSYP1/` before scripts evaluate.
  - An `#initial-loading` indicator displays while React initializes, and an `<ErrorBoundary>` prevents fatal render errors from causing a white screen.

### 2. Root Cause 2: GitHub Pages Source Setting in GitHub
Ensure your repository's GitHub Pages settings use **GitHub Actions**:
1. In your GitHub repository (`joshith498-crypto/ZHSYP1`), click the **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment > Source**:
   - Select **GitHub Actions** (do NOT select "Deploy from a branch").
   - *Why?* If "Deploy from a branch" is selected, GitHub Pages ignores the compiled `dist/` directory from the workflow and tries to serve raw unbuilt TypeScript source files from the `main` branch root, resulting in a blank screen.
4. Push your changes or trigger the workflow under **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

---

## ⚡ Cloudflare Pages / Workers Deployment

### Fix for "lockfile had changes, but lockfile is frozen":
1. Cloudflare automatically detects `bun.lock` and executes `bun install --frozen-lockfile`.
2. This project includes:
   - A synchronized `bun.lock` matching `package.json`.
   - A `bunfig.toml` with `frozen = false`.
   - A `wrangler.jsonc` configured with SPA routing:
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
   - Cloudflare `_redirects` and `_headers` in `/public` for instant SPA fallback routing.

---

## 📦 Downloadable Files Included

1. **`zypac_github_repo_source.zip`**: Complete source code ready to push to your GitHub repo, including `.github/workflows/deploy.yml`, synchronized `bun.lock`, `bunfig.toml`, and dynamic `vite.config.ts`.
2. **`zypac_github_pages_dist.zip`**: Pre-built static distribution ready for instant deployment to GitHub Pages (configured for `/ZHSYP1/`).
3. **`zypac_website.zip`**: Standalone portable distribution with relative paths for local viewing, Cloudflare Pages, Netlify, or custom hosting.
