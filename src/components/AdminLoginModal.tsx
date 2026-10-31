/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { verifyAdminCredentials } from '../utils/logic';
import { Lock, X, AlertCircle, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminCredentials(username, password)) {
      setError(null);
      setUsername('');
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Invalid username or password. Please verify your credentials.');
    }
  };

  const handleFillDemo = () => {
    setUsername('xyz');
    setPassword('b1234');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F3D33]/40 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-[#FAF8F5] border border-[#E5E0D8] rounded-sm p-6 sm:p-8 card-subtle relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#1F3D33] p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#B08D57]" />
          </div>
          <div>
            <h3 id="admin-modal-title" className="font-heading text-2xl font-bold text-[#1F3D33]">
              Secretariat Admin Login
            </h3>
            <p className="text-xs text-[#6B6B6B]">
              Authorized administrative access for ZYPAC event editors
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1F3D33] uppercase tracking-wide mb-1">
              Admin Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (xyz)"
              required
              className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-sm text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3D33] uppercase tracking-wide mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (b1234)"
              required
              className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-sm text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-sm font-medium rounded-sm transition-colors cursor-pointer"
            >
              Authenticate &amp; Enable Editing
            </button>

            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-1.5 text-xs text-[#6B6B6B] hover:text-[#B08D57] flex items-center justify-center gap-1.5 border border-dashed border-[#E5E0D8] rounded-sm cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-[#B08D57]" />
              Fill configured credentials (<span className="font-mono text-[#1F3D33]">xyz</span> / <span className="font-mono text-[#1F3D33]">b1234</span>)
            </button>
          </div>
        </form>

        <p className="mt-4 text-[11px] text-[#6B6B6B] text-center border-t border-[#E5E0D8] pt-3">
          Public students and visitors remain in read-only mode. No external account or sign-up required.
        </p>
      </div>
    </div>
  );
};
