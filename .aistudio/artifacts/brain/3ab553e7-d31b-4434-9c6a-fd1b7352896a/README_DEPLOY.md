# How to Host ZYPAC on GitHub Pages

This project is configured and verified to run on **GitHub Pages** (both `https://<username>.github.io/<repo-name>/` and custom domains).

---

## Why GitHub Pages Often Fails & What We Fixed
1. **Relative Asset Paths (`base: './'`)**: Default Vite configs generate absolute asset paths (`/assets/index.js`), which 404 when hosted inside a repository subfolder (`github.io/my-repo/`). We configured `base: './'` in `vite.config.ts`, ensuring assets resolve relatively in any subfolder or custom domain.
2. **Jekyll Processing Bypassed (`.nojekyll`)**: GitHub Pages runs Jekyll by default, which hides or ignores files and folders with underscores. We added `.nojekyll` to the output.
3. **SPA Routing Fallback (`404.html`)**: When users refresh or share a link to a section, GitHub Pages serves `404.html`. We added a smart SPA redirect script in `404.html` so direct reloads or bookmarks instantly redirect and render the correct page.
4. **Automated GitHub Actions (`.github/workflows/deploy.yml`)**: Pre-configured workflow to build and deploy on every `git push`.
5. **No Lock File Dependency (`cache: 'npm'` removed & `package-lock.json` provided)**: Prevents the common `Dependencies lock file is not found` error during the `Set up Node` step in GitHub Actions.

---

## Quick Fix for Existing Repositories with the "Dependencies lock file is not found" Error

If you encountered the red error `Error: Dependencies lock file is not found in ... Supported file patterns: package-lock.json`:
- **Option A (Instant web edit on GitHub)**: Open `.github/workflows/deploy.yml` on GitHub, click the pencil edit button, and remove `cache: 'npm'` under `Set up Node` (or replace the file with the one in the updated zip). Click **Commit changes**. GitHub Actions will run again and succeed!
- **Option B**: Add the generated `package-lock.json` file from the updated repository zip to the root of your GitHub repository.

---

## Method 1: Automatic Push-to-Deploy with GitHub Actions (Recommended)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g. `zypac`).
2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for ZYPAC portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Turn on GitHub Pages**:
   - On GitHub, click on **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - That's it! GitHub will automatically trigger the included workflow (`.github/workflows/deploy.yml`), compile the project, and publish your live website at `https://<your-username>.github.io/<your-repo-name>/`.

---

## Method 2: Direct Static Deploy (Without CI)

If you only want to host the pre-built HTML/CSS/JS without setting up Node.js or Actions:

1. In your terminal:
   ```bash
   npm run deploy
   ```
   *(This uses `gh-pages` to automatically publish the `dist` folder to your `gh-pages` branch).*
2. In **Settings** → **Pages**:
   - Under **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `gh-pages` and `/ (root)`, then click **Save**.

---

## Method 3: Manual Upload via GitHub Web Interface

1. Extract the contents of `zypac_github_pages_dist.zip`.
2. In your GitHub repository, create a branch named `gh-pages`.
3. Drag and drop all the files from `zypac_github_pages_dist.zip` (including `index.html`, `404.html`, `.nojekyll`, and the `assets` folder) directly into the repository.
4. In **Settings** → **Pages**, select branch `gh-pages` and `/ (root)`.
