/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgendasData, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Interactive3DCard } from '../Interactive3DCard';
import { Landmark, Users, ArrowRight, Edit2, FileText } from 'lucide-react';

interface AgendasViewProps {
  data: AgendasData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditSection: (sectionKey: string) => void;
}

export const AgendasView: React.FC<AgendasViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditSection,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'lokSabha' | 'aippm'>('both');

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/80 bg-white/60 backdrop-blur-md shadow-xs text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Substantive Orders of the Day</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Chamber Agendas
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          Deliberations focus on pressing constitutional and civic questions facing the nation. All final proceedings culminate in official <strong>Resolutions &amp; Communiqués</strong>.
        </p>

        {/* Chamber Tab Filter */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs border cursor-pointer transition-colors ${
              activeTab === 'both'
                ? 'bg-[#1F3D33] text-[#FAF8F5] border-[#1F3D33]'
                : 'text-[#6B6B6B] border-[#E5E0D8] bg-white/40 hover:border-[#1F3D33]'
            }`}
          >
            All Chambers
          </button>
          <button
            onClick={() => setActiveTab('lokSabha')}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs border cursor-pointer transition-colors ${
              activeTab === 'lokSabha'
                ? 'bg-[#1F3D33] text-[#FAF8F5] border-[#1F3D33]'
                : 'text-[#6B6B6B] border-[#E5E0D8] bg-white/40 hover:border-[#1F3D33]'
            }`}
          >
            Lok Sabha
          </button>
          <button
            onClick={() => setActiveTab('aippm')}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xs border cursor-pointer transition-colors ${
              activeTab === 'aippm'
                ? 'bg-[#1F3D33] text-[#FAF8F5] border-[#1F3D33]'
                : 'text-[#6B6B6B] border-[#E5E0D8] bg-white/40 hover:border-[#1F3D33]'
            }`}
          >
            AIPPM
          </button>
        </div>
      </section>

      {/* Chamber 1: LOK SABHA */}
      {(activeTab === 'both' || activeTab === 'lokSabha') && (
        <Interactive3DCard
          intensity={4}
          glare={true}
          glareColor="green"
          liquidVariant="elevated"
          className="p-8 sm:p-10 rounded-sm border border-white/80 space-y-8 relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center shadow-xs">
                <Landmark className="w-6 h-6 text-[#B08D57]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B08D57]">
                  Chamber I · Legislative Body
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F3D33]">
                  {data.lokSabha.chamberName}
                </h2>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => onEditSection('agendas.lokSabha')}
                className="self-start sm:self-auto text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E0D8] bg-white/60 rounded-xs cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Lok Sabha Agenda</span>
              </button>
            )}
          </div>

          {/* Agenda Statement */}
          <div className="p-6 bg-[#FAF8F5]/90 backdrop-blur-md border-l-4 border-[#1F3D33] rounded-r-xs border-y border-r border-[#E5E0D8]/60 shadow-xs">
            <span className="block text-xs uppercase tracking-widest font-bold text-[#1F3D33] mb-2">
              Formal Agenda Text
            </span>
            <p className="text-base sm:text-lg text-[#2B2B2B] leading-relaxed font-serif">
              &quot;{data.lokSabha.agendaText}&quot;
            </p>
            {data.lokSabha.backgroundContext && (
              <p className="text-xs text-[#6B6B6B] mt-3 pt-3 border-t border-[#E5E0D8]/60">
                <strong>Context:</strong> {data.lokSabha.backgroundContext}
              </p>
            )}
          </div>

          {/* 4-Step Session Flow */}
          <div>
            <div className="mb-4">
              <h3 className="font-heading text-xl font-bold text-[#1F3D33]">
                Mandated Session Flow (4 Phases)
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                Strict procedure governing the chronological progression of debate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.lokSabha.sessionFlow.map((step) => (
                <Interactive3DCard
                  key={step.stepNumber}
                  intensity={6}
                  glare={true}
                  glareColor="neutral"
                  liquidVariant="clear"
                  className="p-5 border border-white/80 rounded-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center font-heading text-xs font-bold mb-3 shadow-xs">
                      {step.stepNumber}
                    </div>
                    <h4 className="font-heading text-base font-bold text-[#1F3D33] mb-2">
                      ({step.stepNumber}) {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-2">
                    {step.description}
                  </p>
                </Interactive3DCard>
              ))}
            </div>
          </div>

          {/* Deliverable notice */}
          <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 rounded-xs flex items-center justify-between text-xs text-[#6B6B6B]">
            <span>
              Chamber Outcome Document: <strong className="text-[#1F3D33]">{data.lokSabha.documentDeliverable}</strong>
            </span>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-[#1F3D33] hover:text-[#B08D57] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>View Session Timings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Interactive3DCard>
      )}

      {/* Chamber 2: AIPPM */}
      {(activeTab === 'both' || activeTab === 'aippm') && (
        <Interactive3DCard
          intensity={4}
          glare={true}
          glareColor="brass"
          liquidVariant="elevated"
          className="p-8 sm:p-10 rounded-sm border border-white/80 space-y-8 relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-sm bg-[#B08D57] text-[#FAF8F5] flex items-center justify-center shadow-xs">
                <Users className="w-6 h-6 text-[#FAF8F5]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8b6932]">
                  Chamber II · All-Party Consultation
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F3D33]">
                  {data.aippm.chamberName}
                </h2>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={() => onEditSection('agendas.aippm')}
                className="self-start sm:self-auto text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E0D8] bg-white/60 rounded-xs cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit AIPPM Agenda</span>
              </button>
            )}
          </div>

          {/* Agenda Statement */}
          <div className="p-6 bg-[#FAF8F5]/90 backdrop-blur-md border-l-4 border-[#B08D57] rounded-r-xs border-y border-r border-[#E5E0D8]/60 shadow-xs">
            <span className="block text-xs uppercase tracking-widest font-bold text-[#8b6932] mb-2">
              Formal Agenda Text
            </span>
            <p className="text-base sm:text-lg text-[#2B2B2B] leading-relaxed font-serif">
              &quot;{data.aippm.agendaText}&quot;
            </p>
            {data.aippm.backgroundContext && (
              <p className="text-xs text-[#6B6B6B] mt-3 pt-3 border-t border-[#E5E0D8]/60">
                <strong>Context:</strong> {data.aippm.backgroundContext}
              </p>
            )}
          </div>

          {/* 4-Step Session Flow */}
          <div>
            <div className="mb-4">
              <h3 className="font-heading text-xl font-bold text-[#1F3D33]">
                Mandated Session Flow (4 Phases)
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                Strict procedure governing cross-party consensus and communiqués.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.aippm.sessionFlow.map((step) => (
                <Interactive3DCard
                  key={step.stepNumber}
                  intensity={6}
                  glare={true}
                  glareColor="neutral"
                  liquidVariant="clear"
                  className="p-5 border border-white/80 rounded-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#B08D57] text-[#FAF8F5] flex items-center justify-center font-heading text-xs font-bold mb-3 shadow-xs">
                      {step.stepNumber}
                    </div>
                    <h4 className="font-heading text-base font-bold text-[#1F3D33] mb-2">
                      ({step.stepNumber}) {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-2">
                    {step.description}
                  </p>
                </Interactive3DCard>
              ))}
            </div>
          </div>

          {/* Deliverable notice */}
          <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 rounded-xs flex items-center justify-between text-xs text-[#6B6B6B]">
            <span>
              Chamber Outcome Document: <strong className="text-[#1F3D33]">{data.aippm.documentDeliverable}</strong>
            </span>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-[#1F3D33] hover:text-[#B08D57] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>View Session Timings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Interactive3DCard>
      )}

      {/* Page Flow: Next link to Schedule */}
      <PageFlowNext currentPage="agendas" onNavigate={onNavigate} />
    </div>
  );
};
