/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HomeData, PageId } from '../../types';
import { calculateCountdown, CountdownResult } from '../../utils/logic';
import { PageFlowNext } from '../PageFlowNext';
import { Interactive3DCard } from '../Interactive3DCard';
import { ArrowRight, Bell, Calendar, Clock, Edit2, Landmark, Users, Sparkles } from 'lucide-react';

interface HomeViewProps {
  data: HomeData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditSection: (sectionKey: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditSection,
}) => {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateCountdown(data.eventDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(data.eventDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [data.eventDate]);

  return (
    <div className="space-y-16 relative overflow-x-clip w-full">
      {/* Ambient Liquid Glass Refractive Glows (Constrained to viewport) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] h-[350px] bg-gradient-to-tr from-[#1F3D33]/4 via-[#B08D57]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[480px] -left-10 w-[80vw] max-w-[400px] h-[400px] bg-gradient-to-br from-[#B08D57]/5 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      {/* News Ticker with subtle glass finish */}
      <div className="border-y border-[#E5E0D8] bg-[#FAF8F5]/90 backdrop-blur-sm py-2.5 overflow-hidden shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1F3D33] text-[#FAF8F5] font-display text-[11px] uppercase tracking-wider font-semibold rounded-xs shrink-0 shadow-xs">
              <Bell className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Gazette Bulletin</span>
            </div>
            <div className="overflow-hidden relative w-full">
              <div className="text-sm font-medium text-[#2B2B2B] whitespace-nowrap animate-marquee">
                {data.newsTicker}
              </div>
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => onEditSection('home.newsTicker')}
              className="ml-3 text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 shrink-0 cursor-pointer min-h-[36px] px-2"
              title="Edit Ticker"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center pt-6 pb-2 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-white/80 bg-white/70 backdrop-blur-md shadow-xs font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#1F3D33] mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>{data.eventTimeDisplay}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-[#1F3D33] tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6">
          {data.heroHeading}
        </h1>

        <div className="flex items-center justify-center space-x-3 text-xl sm:text-2xl md:text-3xl font-serif text-[#B08D57] italic tracking-wide mb-6">
          <span>{data.heroTagline}</span>
        </div>

        {/* Vision Line */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#6B6B6B] leading-relaxed mb-10 px-2">
          &quot;{data.visionLine}&quot;
        </p>

        {/* 3D Interactive Liquid Glass Countdown Panel */}
        <div className="max-w-xl mx-auto mb-12 px-2 sm:px-0">
          <Interactive3DCard
            intensity={6}
            glare={true}
            glareColor="neutral"
            liquidVariant="elevated"
            className="p-5 sm:p-7 rounded-sm border border-white/80"
          >
            <div className="flex items-center justify-center space-x-2 font-display text-xs uppercase tracking-[0.2em] text-[#1F3D33] font-semibold mb-4">
              <Clock className="w-4 h-4 text-[#B08D57]" />
              <span>Parliament Convening Countdown</span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0D8]/80 rounded-xs shadow-xs">
                <span className="block font-display text-2xl sm:text-4xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Days
                </span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0D8]/80 rounded-xs shadow-xs">
                <span className="block font-display text-2xl sm:text-4xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Hours
                </span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0D8]/80 rounded-xs shadow-xs">
                <span className="block font-display text-2xl sm:text-4xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Mins
                </span>
              </div>
              <div className="p-2.5 sm:p-3 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0D8]/80 rounded-xs shadow-xs">
                <span className="block font-display text-2xl sm:text-4xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Secs
                </span>
              </div>
            </div>
          </Interactive3DCard>
        </div>

        {/* 3D Liquid Glass Stats Dock */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <Interactive3DCard
            intensity={5}
            glare={true}
            glareColor="brass"
            liquidVariant="clear"
            className="p-6 sm:p-7 border border-white/80 shadow-[0_12px_32px_rgba(31,61,51,0.05)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center sm:border-r border-[#E5E0D8]/80 sm:pr-4">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {data.stats.stat1}
                </div>
                <div className="font-display text-xs uppercase tracking-[0.18em] text-[#6B6B6B] font-medium mt-1">
                  {data.stats.label1}
                </div>
              </div>
              <div className="text-center sm:border-r border-[#E5E0D8]/80 sm:pr-4">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {data.stats.stat2}
                </div>
                <div className="font-display text-xs uppercase tracking-[0.18em] text-[#6B6B6B] font-medium mt-1">
                  {data.stats.label2}
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3D33] tabular-nums tracking-tight">
                  {data.stats.stat3}
                </div>
                <div className="font-display text-xs uppercase tracking-[0.18em] text-[#6B6B6B] font-medium mt-1">
                  {data.stats.label3}
                </div>
              </div>
            </div>
          </Interactive3DCard>
        </div>
      </section>

      {/* Two 3D Interactive Moving Panels — Deliberative Houses */}
      <section className="pt-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B08D57]/10 text-[#8b6932] text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-[#B08D57]" />
            <span>Deliberative Houses</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F3D33]">
            Choose a Parliamentary Chamber
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2">
            Move your cursor across the chambers to inspect specialized mandates, agendas, and procedural session flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Chamber Box 1 — LOK SABHA (3D Interactive Liquid Glass Panel) */}
          <Interactive3DCard
            intensity={9}
            glare={true}
            glareColor="green"
            liquidVariant="elevated"
            className="p-8 sm:p-10 flex flex-col justify-between hover:border-[#1F3D33]/60 transition-colors group"
          >
            <div>
              <div
                className="flex items-center justify-between mb-4"
                style={{ transform: 'translateZ(18px)' }}
              >
                <span className="px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] bg-[#1F3D33]/10 text-[#1F3D33] rounded-xs border border-[#1F3D33]/20 shadow-xs">
                  {data.lokSabhaBox.themeBadge}
                </span>
                <div className="w-10 h-10 rounded-sm bg-[#1F3D33]/5 flex items-center justify-center border border-[#1F3D33]/10 group-hover:bg-[#1F3D33] group-hover:text-[#FAF8F5] transition-colors">
                  <Landmark className="w-5 h-5 text-[#1F3D33] group-hover:text-[#FAF8F5] transition-colors" />
                </div>
              </div>

              <h3
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F3D33] mb-2"
                style={{ transform: 'translateZ(24px)' }}
              >
                {data.lokSabhaBox.title}
              </h3>
              <p
                className="font-display text-xs text-[#6B6B6B] font-semibold uppercase tracking-[0.18em] mb-6"
                style={{ transform: 'translateZ(16px)' }}
              >
                {data.lokSabhaBox.subtitle}
              </p>

              {/* Agenda Glass Card */}
              <div
                className="p-4 bg-[#FAF8F5]/90 backdrop-blur-md border-l-3 border-[#1F3D33] border-y border-r border-[#E5E0D8]/60 mb-8 rounded-r-xs shadow-xs"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#1F3D33] mb-1">
                  Official Agenda
                </span>
                <p className="text-sm text-[#2B2B2B] leading-relaxed">
                  {data.lokSabhaBox.agendaText}
                </p>
              </div>
            </div>

            <div
              className="pt-4 border-t border-[#E5E0D8]/80 flex items-center justify-between"
              style={{ transform: 'translateZ(22px)' }}
            >
              <button
                onClick={() => onNavigate('agendas')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] font-display text-sm font-semibold tracking-wide rounded-sm transition-all duration-200 cursor-pointer shadow-sm group-hover:shadow-md"
                aria-label="View Lok Sabha Agenda"
              >
                <span>View Agenda →</span>
                <ArrowRight className="w-4 h-4 text-[#B08D57]" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => onEditSection('home.lokSabhaBox')}
                  className="text-xs text-[#6B6B6B] hover:text-[#1F3D33] p-2 rounded-sm hover:bg-white/60 cursor-pointer flex items-center gap-1 min-h-[36px]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Box</span>
                </button>
              )}
            </div>
          </Interactive3DCard>

          {/* Chamber Box 2 — AIPPM (3D Interactive Liquid Glass Panel) */}
          <Interactive3DCard
            intensity={9}
            glare={true}
            glareColor="brass"
            liquidVariant="elevated"
            className="p-8 sm:p-10 flex flex-col justify-between hover:border-[#B08D57]/70 transition-colors group"
          >
            <div>
              <div
                className="flex items-center justify-between mb-4"
                style={{ transform: 'translateZ(18px)' }}
              >
                <span className="px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] bg-[#B08D57]/15 text-[#8b6932] rounded-xs border border-[#B08D57]/30 shadow-xs">
                  {data.aippmBox.themeBadge}
                </span>
                <div className="w-10 h-10 rounded-sm bg-[#B08D57]/10 flex items-center justify-center border border-[#B08D57]/20 group-hover:bg-[#B08D57] group-hover:text-[#FAF8F5] transition-colors">
                  <Users className="w-5 h-5 text-[#8b6932] group-hover:text-[#FAF8F5] transition-colors" />
                </div>
              </div>

              <h3
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F3D33] mb-2"
                style={{ transform: 'translateZ(24px)' }}
              >
                {data.aippmBox.title}
              </h3>
              <p
                className="font-display text-xs text-[#6B6B6B] font-semibold uppercase tracking-[0.18em] mb-6"
                style={{ transform: 'translateZ(16px)' }}
              >
                {data.aippmBox.subtitle}
              </p>

              {/* Agenda Glass Card */}
              <div
                className="p-4 bg-[#FAF8F5]/90 backdrop-blur-md border-l-3 border-[#B08D57] border-y border-r border-[#E5E0D8]/60 mb-8 rounded-r-xs shadow-xs"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b6932] mb-1">
                  Official Agenda
                </span>
                <p className="text-sm text-[#2B2B2B] leading-relaxed">
                  {data.aippmBox.agendaText}
                </p>
              </div>
            </div>

            <div
              className="pt-4 border-t border-[#E5E0D8]/80 flex items-center justify-between"
              style={{ transform: 'translateZ(22px)' }}
            >
              <button
                onClick={() => onNavigate('agendas')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] font-display text-sm font-semibold tracking-wide rounded-sm transition-all duration-200 cursor-pointer shadow-sm group-hover:shadow-md"
                aria-label="View AIPPM Agenda"
              >
                <span>View Agenda →</span>
                <ArrowRight className="w-4 h-4 text-[#B08D57]" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => onEditSection('home.aippmBox')}
                  className="text-xs text-[#6B6B6B] hover:text-[#1F3D33] p-1.5 rounded-sm hover:bg-white/60 cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Box</span>
                </button>
              )}
            </div>
          </Interactive3DCard>
        </div>
      </section>

      {/* Page Flow: Next link to About */}
      <PageFlowNext currentPage="home" onNavigate={onNavigate} />
    </div>
  );
};
