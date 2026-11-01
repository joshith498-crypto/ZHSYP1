const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

// Read pristine source index.html
let html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Find built CSS and JS in dist/assets
let cssContent = '';
let jsContent = '';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    const fullPath = path.join(assetsDir, file);
    if (file.endsWith('.css') && file.startsWith('index-')) {
      cssContent = fs.readFileSync(fullPath, 'utf8');
    } else if (file.endsWith('.js') && file.startsWith('index-')) {
      jsContent = fs.readFileSync(fullPath, 'utf8');
    }
  }
}

// Remove dev script tag
html = html.replace(/<script[^>]*src=["']\/src\/main\.tsx["'][^>]*><\/script>/gi, '');

// Inject CSS before </head> (first occurrence only)
if (cssContent) {
  const styleTag = `\n<style id="zypac-bundle-css">\n${cssContent}\n</style>\n`;
  const headIdx = html.indexOf('</head>');
  if (headIdx !== -1) {
    html = html.slice(0, headIdx) + styleTag + html.slice(headIdx);
  }
}

// Inject JS before </body> (first occurrence only)
if (jsContent) {
  const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');
  const scriptTag = `\n<script type="module" id="zypac-bundle-js">\n${safeJs}\n</script>\n`;
  const bodyIdx = html.indexOf('</body>');
  if (bodyIdx !== -1) {
    html = html.slice(0, bodyIdx) + scriptTag + html.slice(bodyIdx);
  }
}

// Write clean self-contained dist/index.html
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
const kb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
console.log(`[inline-build] Clean self-contained dist/index.html created: ${kb} kB`);

// Write identical 404.html
fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');
