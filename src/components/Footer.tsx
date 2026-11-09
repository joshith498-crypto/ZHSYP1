/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, SiteBranding } from '../types';
import { PAGE_ORDER, PAGE_TITLES } from '../utils/logic';
import { Mail, Calendar, MapPin, Lock, Check, Edit2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  branding: SiteBranding;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onEditBranding: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  branding,
  isAdmin,
  onOpenLogin,
  onEditBranding,
}) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E5E0D8] pt-14 pb-12 mt-20 text-[#2B2B2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5E0D8]">
          {/* Main School & Event Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center font-crest text-lg font-bold border border-[#B08D57]/40 shadow-xs">
                {branding.schoolName.charAt(0)}
              </div>
              <span className="font-heading text-2xl font-semibold text-[#1F3D33] tracking-tight">
                {branding.eventName}
              </span>
            </div>
            <p className="text-base text-[#2B2B2B] font-heading font-medium">
              {branding.footerSchoolTitle}
            </p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm">
              {branding.footerDescription}
            </p>
            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-[#6B6B6B]">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B08D57]" />
                Event Date: <strong className="text-[#1F3D33]">14 November</strong> · 9:00 AM – 2:00 PM
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B08D57]" />
                Contact Email: <a href={`mailto:${branding.officialEmail}`} className="text-[#1F3D33] hover:text-[#B08D57] underline">{branding.officialEmail}</a>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B08D57]" />
                {branding.schoolAddress}
              </span>
            </div>

            {isAdmin && (
              <div className="pt-2">
                <button
                  onClick={onEditBranding}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B08D57] hover:text-[#1F3D33] font-medium border border-[#E5E0D8] px-2.5 py-1 rounded-xs hover:border-[#B08D57] transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Footer &amp; School Branding</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[#1F3D33] font-semibold mb-3">
              Parliament Portal
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {PAGE_ORDER.map((pageId) => (
                <button
                  key={pageId}
                  onClick={() => {
                    onNavigate(pageId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-[#6B6B6B] hover:text-[#B08D57] transition-colors cursor-pointer py-0.5"
                >
                  {PAGE_TITLES[pageId]}
                </button>
              ))}
            </div>
          </div>

          {/* Parliamentary Principles & Admin */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#1F3D33] font-semibold mb-2">
              Official Governance
            </h4>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              &quot;Debate. Decide. Deliver.&quot; An educational civic forum operated under strict parliamentary decorum and school regulations.
            </p>
            <div className="pt-3">
              {isAdmin ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1F3D33]/10 text-[#1F3D33] text-xs font-semibold rounded-sm">
                  <Check className="w-3.5 h-3.5 text-[#1F3D33]" />
                  Admin Mode Active
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#1F3D33] border border-[#E5E0D8] px-3 py-1.5 rounded-sm hover:border-[#B08D57] transition-colors cursor-pointer"
                  aria-label="Secretariat Admin Login"
                >
                  <Lock className="w-3 h-3 text-[#B08D57]" />
                  Secretariat Admin Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B6B] space-y-2 sm:space-y-0">
          <div>
            {branding.copyrightNotice}
          </div>
          <div className="text-right">
            <span>Resolutions &amp; Communiqués Archive · All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
