/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId } from '../types';
import { getNextPage, PAGE_TITLES } from '../utils/logic';
import { ArrowRight } from 'lucide-react';

interface PageFlowNextProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const PageFlowNext: React.FC<PageFlowNextProps> = ({
  currentPage,
  onNavigate,
}) => {
  const nextPage = getNextPage(currentPage);
  const nextTitle = PAGE_TITLES[nextPage];

  const handleClick = () => {
    onNavigate(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-16 pt-8 border-t border-[#E5E0D8] flex items-center justify-between">
      <div className="text-xs text-[#6B6B6B] tracking-wide uppercase">
        Section {PAGE_TITLES[currentPage]}
      </div>

      <button
        onClick={handleClick}
        className="group inline-flex items-center gap-2 text-base font-heading font-medium text-[#1F3D33] hover:text-[#B08D57] transition-all cursor-pointer focus:outline-none"
        aria-label={`Go to next page: ${nextTitle}`}
      >
        <span>Next: {nextTitle}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#B08D57]" />
      </button>
    </div>
  );
};
