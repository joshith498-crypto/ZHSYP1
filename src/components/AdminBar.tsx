/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { PAGE_TITLES } from '../utils/logic';
import { ShieldCheck, Edit3, RotateCcw } from 'lucide-react';

interface AdminBarProps {
  currentPage: PageId;
  onOpenPageEditor: () => void;
  onEditBranding: () => void;
  onOpenPublish: () => void;
  onResetDefaults: () => void;
  onLogout: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  currentPage,
  onOpenPageEditor,
  onEditBranding,
  onOpenPublish,
  onResetDefaults,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  return (
    <div className="bg-[#1F3D33] text-[#FAF8F5] border-b border-[#B08D57]/30 px-4 py-2 sm:py-2.5 text-xs transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="flex h-2 w-2 rounded-full bg-[#B08D57] animate-ping" />
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
            <span>Admin Active: <strong className="text-[#FAF8F5]">xyz</strong></span>
          </div>
          <span className="hidden md:inline text-white/50">|</span>
          <span className="hidden md:inline text-white/80">
            Viewing: <strong>{PAGE_TITLES[currentPage]}</strong> · Edits save automatically
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenPublish}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm font-semibold transition-colors cursor-pointer shadow-xs animate-pulse"
            title="Publish changes so all visitors on Netlify see them"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            <span>Publish to Netlify / Everyone</span>
          </button>

          <button
            onClick={onOpenPageEditor}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B08D57] hover:bg-[#9a7b4c] text-[#FAF8F5] rounded-sm font-semibold transition-colors cursor-pointer shadow-xs"
            aria-label={`Edit ${PAGE_TITLES[currentPage]} Page`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit {PAGE_TITLES[currentPage]}</span>
          </button>

          <button
            onClick={onEditBranding}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-sm transition-colors cursor-pointer"
            title="Edit school name, event acronym, footer & contact address"
          >
            <Edit3 className="w-3 h-3 text-[#B08D57]" />
            <span className="hidden sm:inline">Edit School &amp; Footer</span>
          </button>

          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-sm transition-colors cursor-pointer"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 bg-red-900/80 px-2 py-0.5 rounded-sm">
              <span className="text-[11px] text-white">Confirm reset?</span>
              <button
                onClick={() => {
                  onResetDefaults();
                  setShowConfirmReset(false);
                }}
                className="px-1.5 py-0.5 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xs text-[10px]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-1.5 py-0.5 text-white/80 hover:text-white text-[10px]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
