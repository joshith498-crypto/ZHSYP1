/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { PAGE_ORDER, PAGE_TITLES } from '../utils/logic';
import { Menu, X, Check, Lock, LogOut } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  branding?: {
    schoolName: string;
    eventName: string;
    eventSubtext: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isAdmin,
  onOpenLogin,
  onLogout,
  branding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const schoolName = branding?.schoolName || 'ZHS';
  const eventName = branding?.eventName || 'ZYPAC';
  const eventSubtext = branding?.eventSubtext || 'ZHS · 14 November';

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E5E0D8] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
            aria-label={`Go to ${eventName} Home`}
          >
            <div className="w-11 h-11 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center font-heading text-2xl font-bold tracking-wider shadow-sm border border-[#B08D57]/40 group-hover:border-[#B08D57] transition-colors">
              {schoolName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#1F3D33] leading-none group-hover:text-[#B08D57] transition-colors">
                {eventName}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-medium mt-1">
                {eventSubtext}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {PAGE_ORDER.map((pageId) => {
              const isActive = currentPage === pageId;
              return (
                <button
                  key={pageId}
                  onClick={() => handleNavClick(pageId)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1F3D33] font-semibold border-b-2 border-[#1F3D33] bg-[#E5E0D8]/30'
                      : 'text-[#6B6B6B] hover:text-[#1F3D33] hover:bg-[#E5E0D8]/40'
                  }`}
                >
                  {PAGE_TITLES[pageId]}
                </button>
              );
            })}
          </nav>

          {/* Admin status / Login action */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {isAdmin ? (
              <div className="flex items-center space-x-2 bg-[#1F3D33]/10 border border-[#1F3D33]/20 px-3 py-1.5 rounded-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#1F3D33] animate-pulse" />
                <span className="text-xs font-semibold text-[#1F3D33] uppercase tracking-wide">
                  Admin: xyz
                </span>
                <button
                  onClick={onLogout}
                  className="ml-2 text-xs text-[#6B6B6B] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer"
                  title="Logout Admin"
                  aria-label="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="text-xs font-medium text-[#6B6B6B] hover:text-[#1F3D33] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E0D8] bg-white/50 backdrop-blur-xs rounded-sm hover:border-[#B08D57] transition-colors cursor-pointer shadow-xs"
                aria-label="Admin Login"
              >
                <Lock className="w-3 h-3 text-[#B08D57]" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {isAdmin && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#1F3D33] text-[#FAF8F5]">
                ADMIN
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-[#1F3D33] hover:bg-[#E5E0D8]/50 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E5E0D8] px-4 pt-2 pb-6 space-y-1 shadow-md">
          {PAGE_ORDER.map((pageId) => {
            const isActive = currentPage === pageId;
            return (
              <button
                key={pageId}
                onClick={() => handleNavClick(pageId)}
                className={`w-full text-left px-3 py-2.5 text-base font-medium rounded-sm flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'text-[#1F3D33] font-semibold bg-[#E5E0D8]/50 border-l-4 border-[#1F3D33]'
                    : 'text-[#2B2B2B] hover:bg-[#E5E0D8]/30'
                }`}
              >
                <span>{PAGE_TITLES[pageId]}</span>
                {isActive && <Check className="w-4 h-4 text-[#1F3D33]" />}
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#E5E0D8] mt-3">
            {isAdmin ? (
              <div className="flex items-center justify-between px-3 py-2 bg-[#1F3D33]/5 rounded-sm">
                <span className="text-xs font-semibold text-[#1F3D33]">
                  Admin Session Active (xyz)
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-[#6B6B6B] hover:text-[#1F3D33] underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 px-3 text-sm font-medium text-[#1F3D33] border border-[#1F3D33] rounded-sm hover:bg-[#1F3D33] hover:text-[#FAF8F5] transition-colors"
              >
                Admin Login (xyz / b1234)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
