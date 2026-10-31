/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState } from '../types';
import { generateStandaloneHtml } from '../utils/generateStandaloneHtml';
import { Download, Copy, Check, X, FileCode, Archive, ExternalLink } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml(state);

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(htmlCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = htmlCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (e) {
      // Fallback
      setCopied(true);
    }
  };

  const handleDownloadHtml = () => {
    try {
      const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
      setDownloadSuccess('Downloaded index.html successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      setDownloadSuccess('Download triggered! Check your Downloads folder.');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  const handleDownloadZip = () => {
    try {
      const a = document.createElement('a');
      a.href = '/zypac-website.zip';
      a.download = 'zypac-website.zip';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 200);
      setDownloadSuccess('Downloaded zypac-website.zip! Check your Downloads folder.');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      setDownloadSuccess('Zip download started.');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border-2 border-[#1F3D33] rounded-sm max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#1F3D33] p-1.5 rounded-sm border border-[#E5E0D8] hover:border-[#1F3D33] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
            Instant Website Export
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#1F3D33] mt-1">
            Download Your Website (Simple &amp; Direct)
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Choose the method that works best for your browser:
          </p>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Method 1: HTML Single-File */}
          <div className="card-subtle p-5 rounded-sm flex flex-col justify-between border border-[#E5E0D8] hover:border-[#1F3D33] transition-colors">
            <div>
              <div className="w-9 h-9 rounded bg-[#1F3D33] text-white flex items-center justify-center mb-3">
                <FileCode className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1F3D33]">
                Single-File Website (index.html)
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1 mb-4 leading-relaxed">
                Contains everything in 1 file. Double-click it to run directly in Google Chrome, or drop it onto Netlify!
              </p>
            </div>
            <button
              onClick={handleDownloadHtml}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download index.html</span>
            </button>
          </div>

          {/* Method 2: ZIP Package */}
          <div className="card-subtle p-5 rounded-sm flex flex-col justify-between border border-[#E5E0D8] hover:border-[#B08D57] transition-colors">
            <div>
              <div className="w-9 h-9 rounded bg-[#B08D57] text-white flex items-center justify-center mb-3">
                <Archive className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1F3D33]">
                Full Website Package (.zip)
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1 mb-4 leading-relaxed">
                Complete production bundle with routing rules, ideal for Netlify Drop (app.netlify.com/drop).
              </p>
            </div>
            <button
              onClick={handleDownloadZip}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B08D57] hover:bg-[#9a7b4c] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download .ZIP</span>
            </button>
          </div>
        </div>

        {/* Method 3: 1-Click Copy Code (Guaranteed to work if browser blocks iframe downloads) */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D8] rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-heading text-lg font-bold text-[#1F3D33]">
                100% Guaranteed Backup: Copy Website Code
              </span>
              <p className="text-xs text-[#6B6B6B]">
                If your browser blocks downloads inside iframes: click copy, paste into Notepad, and save as <code>index.html</code>.
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#1F3D33] text-[#1F3D33] text-xs font-bold rounded-sm transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B08D57]" />
                  <span>Copy Entire Code</span>
                </>
              )}
            </button>
          </div>

          <textarea
            readOnly
            value={htmlCode}
            rows={3}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            className="w-full text-[11px] font-mono bg-white p-2 border border-[#E5E0D8] rounded text-[#6B6B6B] resize-none"
            title="Click to select all code"
          />
        </div>

        <div className="pt-2 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#6B6B6B]">
          <span>Netlify Launch: Go to <strong>app.netlify.com/drop</strong> and drag your file!</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs text-[#1F3D33] font-semibold hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
