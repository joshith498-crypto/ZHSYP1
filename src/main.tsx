import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Mark module evaluation as successful
(window as unknown as { __ZYPAC_MODULE_LOADED__?: boolean }).__ZYPAC_MODULE_LOADED__ = true;

const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    const root = createRoot(rootEl);
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    // Set mounted flag for index.html diagnostics
    (window as unknown as { __ZYPAC_MOUNTED__?: boolean }).__ZYPAC_MOUNTED__ = true;

    // Remove fallback spinner smoothly
    const initialLoader = document.getElementById('initial-loading');
    if (initialLoader) {
      initialLoader.style.transition = 'opacity 0.2s ease-out';
      initialLoader.style.opacity = '0';
      setTimeout(() => {
        initialLoader.remove();
      }, 200);
    }
  } catch (err) {
    console.error('Fatal initialization error:', err);
    const initialLoader = document.getElementById('initial-loading');
    if (initialLoader) {
      initialLoader.innerHTML = `
        <div style="max-width: 420px; background: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #E5E0D8; box-shadow: 0 10px 25px rgba(0,0,0,0.06); text-align: center;">
          <h2 style="font-size: 1.15rem; font-weight: 700; color: #1F3D33; margin-bottom: 8px;">ZYPAC Portal Ready</h2>
          <p style="font-size: 0.85rem; color: #6B6B6B; margin-bottom: 20px;">Click below to load the latest parliamentary data.</p>
          <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload(true);" style="background: #1F3D33; color: #FAF8F5; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">
            Load Portal
          </button>
        </div>
      `;
    }
  }
} else {
  console.error('Fatal: #root element not found in DOM.');
}
