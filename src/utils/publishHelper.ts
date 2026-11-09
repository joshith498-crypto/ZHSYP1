/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import JSZip from 'jszip';
import { AppData } from '../types';

/**
 * Injects the updated AppData into an HTML document as window.__INITIAL_ZYPAC_DATA__
 */
export function injectDataIntoHtml(html: string, data: AppData): string {
  const serialized = JSON.stringify(data);
  const injectionScript = `<script id="zypac-published-data">window.__INITIAL_ZYPAC_DATA__ = ${serialized};</script>`;

  // If already contains previous injection, replace it
  if (html.includes('<script id="zypac-published-data">')) {
    return html.replace(
      /<script id="zypac-published-data">[\s\S]*?<\/script>/i,
      injectionScript
    );
  }

  // Otherwise inject right before <div id="root"> or inside </head>
  if (html.includes('<div id="root">')) {
    return html.replace('<div id="root">', `${injectionScript}\n    <div id="root">`);
  }

  return html.replace('</head>', `${injectionScript}\n  </head>`);
}

/**
 * Downloads a string as a file in the user's browser
 */
export function triggerBrowserDownload(content: string | Blob, fileName: string, mimeType: string = 'text/html') {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Builds the standalone index.html containing the current live admin edits
 */
export async function getLiveIndexHtml(data: AppData): Promise<string> {
  // If running in browser, try to fetch current page HTML as template
  let baseHtml = '';
  try {
    const res = await fetch(window.location.href, { cache: 'no-store' });
    if (res.ok) {
      baseHtml = await res.text();
    }
  } catch {
    // ignore
  }

  // Fallback: construct full HTML from document.documentElement
  if (!baseHtml || !baseHtml.includes('<!doctype') && !baseHtml.includes('<!DOCTYPE')) {
    baseHtml = '<!doctype html>\n' + document.documentElement.outerHTML;
  }

  return injectDataIntoHtml(baseHtml, data);
}

/**
 * 1-Click Download of updated index.html for Netlify / GitHub
 */
export async function downloadLiveIndexHtml(data: AppData) {
  const html = await getLiveIndexHtml(data);
  triggerBrowserDownload(html, 'index.html', 'text/html;charset=utf-8');
}

/**
 * 1-Click Download of full Netlify Drag-and-Drop Deploy ZIP
 */
export async function downloadNetlifyDeployZip(data: AppData) {
  const html = await getLiveIndexHtml(data);
  const zip = new JSZip();

  // 1. index.html with live edits embedded
  zip.file('index.html', html);

  // 2. 404.html (exact replica so SPA routes work seamlessly on refresh)
  zip.file('404.html', html);

  // 3. _redirects for Netlify SPA routing
  zip.file('_redirects', '/* /index.html 200\n');

  // 4. _headers for clean security & cache headers
  zip.file('_headers', '/*\n  X-Frame-Options: SAMEORIGIN\n  X-Content-Type-Options: nosniff\n');

  // 5. .nojekyll for GitHub Pages compatibility
  zip.file('.nojekyll', '');

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBrowserDownload(blob, 'zypac_netlify_deploy.zip', 'application/zip');
}

/**
 * Exports data as a TypeScript file (src/data/defaultData.ts)
 */
export function downloadDefaultDataTs(data: AppData) {
  const tsContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppData } from '../types';

export const DEFAULT_APP_DATA: AppData = ${JSON.stringify(data, null, 2)};
`;
  triggerBrowserDownload(tsContent, 'defaultData.ts', 'text/typescript;charset=utf-8');
}

/**
 * Exports data as a JSON file
 */
export function downloadDataJson(data: AppData) {
  const jsonContent = JSON.stringify(data, null, 2);
  triggerBrowserDownload(jsonContent, 'zypac_portal_data.json', 'application/json;charset=utf-8');
}
