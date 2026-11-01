/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScheduleData, ScheduleSlot, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Interactive3DCard } from '../Interactive3DCard';
import { Clock, Landmark, Users, Edit2, Calendar, MapPin } from 'lucide-react';

interface ScheduleViewProps {
  data: ScheduleData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditSlot: (chamber: 'lokSabha' | 'aippm', slotId: string) => void;
  onEditHeader: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditSlot,
  onEditHeader,
}) => {
  const renderSlotCard = (slot: ScheduleSlot, chamber: 'lokSabha' | 'aippm') => {
    const hasTime = slot.timeRange && slot.timeRange.trim().length > 0;

    return (
      <Interactive3DCard
        key={slot.id}
        intensity={5}
        glare={true}
        glareColor="neutral"
        liquidVariant="clear"
        className="p-5 border border-white/80 rounded-xs hover:border-[#1F3D33]/40 transition-colors relative group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wider bg-[#1F3D33] text-[#FAF8F5] rounded-xs shadow-xs">
              {slot.sessionLabel}
            </span>
            <span
              className={`font-display text-xs font-semibold tabular-nums ${
                hasTime ? 'text-[#1F3D33]' : 'text-[#6B6B6B] italic'
              }`}
            >
              {hasTime ? slot.timeRange : '(Time to be designated by Secretariat)'}
            </span>
          </div>

          {isAdmin && (
            <button
              onClick={() => onEditSlot(chamber, slot.id)}
              className="text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer min-h-[36px] px-2"
              title={`Edit ${slot.sessionLabel} timing and notes`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{hasTime ? 'Edit Time' : 'Fill Time'}</span>
            </button>
          )}
        </div>

        <h4 className="font-heading text-lg font-bold text-[#1F3D33] mb-1">
          {slot.activityTitle || slot.sessionLabel}
        </h4>

        {slot.notes && (
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            {slot.notes}
          </p>
        )}
      </Interactive3DCard>
    );
  };

  return (
    <div className="space-y-16 max-w-6xl mx-auto w-full">
      {/* Header with 9:00 AM – 2:00 PM */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-white/80 bg-white/70 backdrop-blur-md shadow-xs font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57] mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Official Timetable · 14 November</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#1F3D33] tracking-tight mb-2 tabular-nums">
          {data.headerTime}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#6B6B6B] mt-2">
          <span className="flex items-center gap-1.5 text-center">
            <Calendar className="w-4 h-4 text-[#B08D57] shrink-0" />
            <span className="font-medium">{data.dateDisplay}</span>
          </span>
          <span className="hidden sm:inline text-[#E5E0D8]">·</span>
          <span className="flex items-center gap-1.5 text-center">
            <MapPin className="w-4 h-4 text-[#B08D57] shrink-0" />
            <span className="font-medium">{data.venueNote}</span>
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={onEditHeader}
            className="mt-4 text-xs text-[#B08D57] hover:text-[#1F3D33] inline-flex items-center gap-1 cursor-pointer min-h-[36px] px-2"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Schedule Header &amp; Venue</span>
          </button>
        )}
      </section>

      {/* Side-by-side on desktop, stacked on mobile */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lok Sabha Schedule Column */}
        <Interactive3DCard
          intensity={3}
          glare={true}
          glareColor="green"
          liquidVariant="elevated"
          className="p-6 sm:p-8 rounded-sm border border-white/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E0D8]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center shadow-xs">
                  <Landmark className="w-5 h-5 text-[#B08D57]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#B08D57] font-semibold">
                    House of the People
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[#1F3D33]">
                    Lok Sabha Schedule
                  </h2>
                </div>
              </div>
              <span className="text-xs text-[#6B6B6B] font-mono">
                4 Sessions
              </span>
            </div>

            <div className="space-y-4">
              {data.lokSabhaSlots.map((slot) => renderSlotCard(slot, 'lokSabha'))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E0D8] text-xs text-[#6B6B6B]">
            <span>Admin note: Click &quot;Fill Time&quot; on any empty session to record parliamentary hours.</span>
          </div>
        </Interactive3DCard>

        {/* AIPPM Schedule Column */}
        <Interactive3DCard
          intensity={3}
          glare={true}
          glareColor="brass"
          liquidVariant="elevated"
          className="p-6 sm:p-8 rounded-sm border border-white/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E0D8]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-sm bg-[#B08D57] text-[#FAF8F5] flex items-center justify-center shadow-xs">
                  <Users className="w-5 h-5 text-[#FAF8F5]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8b6932] font-semibold">
                    All-Party Meet
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[#1F3D33]">
                    AIPPM Schedule
                  </h2>
                </div>
              </div>
              <span className="text-xs text-[#6B6B6B] font-mono">
                4 Sessions
              </span>
            </div>

            <div className="space-y-4">
              {data.aippmSlots.map((slot) => renderSlotCard(slot, 'aippm'))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E0D8] text-xs text-[#6B6B6B]">
            <span>Admin note: Click &quot;Fill Time&quot; on any empty session to record consultation hours.</span>
          </div>
        </Interactive3DCard>
      </section>

      {/* Page Flow: Next link to Team */}
      <PageFlowNext currentPage="schedule" onNavigate={onNavigate} />
    </div>
  );
};
