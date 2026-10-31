/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AboutData, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Interactive3DCard } from '../Interactive3DCard';
import {
  BookOpen,
  CheckCircle,
  Briefcase,
  Edit2,
  Mic,
} from 'lucide-react';

interface AboutViewProps {
  data: AboutData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditSection: (sectionKey: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditSection,
}) => {
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Header and Intro */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/80 bg-white/60 backdrop-blur-md shadow-xs text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Foundational Briefing</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-6">
          {data.heading}
        </h1>

        <div className="relative">
          <p className="text-lg sm:text-xl text-[#2B2B2B] leading-relaxed max-w-3xl mx-auto border-l-2 sm:border-l-0 border-[#1F3D33] pl-4 sm:pl-0 font-serif italic">
            &quot;{data.introText}&quot;
          </p>
          {isAdmin && (
            <button
              onClick={() => onEditSection('about.intro')}
              className="mt-3 text-xs text-[#B08D57] hover:text-[#1F3D33] inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit About Overview</span>
            </button>
          )}
        </div>
      </section>

      {/* Core Principles (4 Bullets) 3D Liquid Glass Panel */}
      <Interactive3DCard
        intensity={3}
        glare={true}
        glareColor="brass"
        liquidVariant="elevated"
        className="p-8 rounded-sm border border-white/80 relative"
      >
        <div className="flex items-center justify-between max-w-lg mx-auto mb-8 text-center relative">
          <div className="w-full">
            <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold">
              The Bedrock of Governance
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F3D33] mt-1">
              Core Principles
            </h2>
          </div>
          {isAdmin && (
            <button
              onClick={() => onEditSection('about.principles')}
              className="absolute right-0 top-0 text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer"
              title="Edit Principles"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.corePrinciples.map((principle, index) => (
            <Interactive3DCard
              key={index}
              intensity={6}
              glare={true}
              glareColor="neutral"
              liquidVariant="clear"
              className="p-5 text-center border border-white/70 rounded-xs"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#1F3D33]/10 text-[#1F3D33] flex items-center justify-center font-heading font-bold text-lg shadow-xs">
                0{index + 1}
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1F3D33] mb-1">
                {principle}
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                {principle === 'Democracy' && 'Every voice has a seat and a vote.'}
                {principle === 'Procedure' && 'Rules ensure fairness and structure.'}
                {principle === 'Respect' && 'Adversaries in debate, allies in civics.'}
                {principle === 'Consensus' && 'Progress through shared resolution.'}
              </p>
            </Interactive3DCard>
          ))}
        </div>
      </Interactive3DCard>

      {/* Addressing the Chair & What to Bring */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Interactive3DCard
          intensity={4}
          glare={true}
          glareColor="green"
          liquidVariant="elevated"
          className="p-6 sm:p-8 rounded-sm border border-white/80 relative"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#1F3D33] font-semibold">
              <Mic className="w-4 h-4 text-[#B08D57]" />
              <span>How to Address the Chair</span>
            </div>
            {isAdmin && (
              <button
                onClick={() => onEditSection('about.chair')}
                className="text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#1F3D33] mb-4">
            Presiding Forms of Address
          </h3>

          <div className="space-y-4 text-sm">
            <div className="p-3 bg-[#FAF8F5]/90 backdrop-blur-md border-l-3 border-[#1F3D33] border-y border-r border-[#E5E0D8]/60 rounded-r-xs shadow-xs">
              <span className="block text-xs uppercase text-[#6B6B6B] font-medium">
                In Lok Sabha:
              </span>
              <strong className="text-base text-[#1F3D33] font-heading font-bold">
                &quot;{data.addressingChair.lokSabha}&quot;
              </strong>
            </div>

            <div className="p-3 bg-[#FAF8F5]/90 backdrop-blur-md border-l-3 border-[#B08D57] border-y border-r border-[#E5E0D8]/60 rounded-r-xs shadow-xs">
              <span className="block text-xs uppercase text-[#6B6B6B] font-medium">
                In AIPPM:
              </span>
              <strong className="text-base text-[#8b6932] font-heading font-bold">
                &quot;{data.addressingChair.aippm}&quot;
              </strong>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed pt-2">
              {data.addressingChair.guideline}
            </p>
          </div>
        </Interactive3DCard>

        {/* What to Bring */}
        <Interactive3DCard
          intensity={4}
          glare={true}
          glareColor="brass"
          liquidVariant="elevated"
          className="p-6 sm:p-8 rounded-sm border border-white/80 relative"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#1F3D33] font-semibold">
              <Briefcase className="w-4 h-4 text-[#B08D57]" />
              <span>Delegate Readiness</span>
            </div>
            {isAdmin && (
              <button
                onClick={() => onEditSection('about.whatToBring')}
                className="text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#1F3D33] mb-4">
            What to Bring to Chamber
          </h3>

          <ul className="space-y-3 text-sm text-[#2B2B2B]">
            {data.whatToBring.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#1F3D33] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Interactive3DCard>
      </section>

      {/* Parliamentary Glossary (8 terms) */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D8]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              Official Terminology
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#1F3D33] mt-1">
              Parliamentary Glossary
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1">
              Essential parliamentary vocabulary codified for debate decorum and rules of procedure.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => onEditSection('about.glossary')}
              className="text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Glossary</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.glossary.map((item, index) => (
            <Interactive3DCard
              key={index}
              intensity={4}
              glare={true}
              glareColor="neutral"
              liquidVariant="clear"
              className="p-5 border border-white/80 rounded-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading text-xl font-bold text-[#1F3D33]">
                  {item.term}
                </h4>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] px-2 py-0.5 border border-[#E5E0D8] rounded-xs bg-[#FAF8F5]/80">
                  Rule #{index + 1}
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {item.definition}
              </p>
            </Interactive3DCard>
          ))}
        </div>
      </section>

      {/* Page Flow: Next link to Agendas */}
      <PageFlowNext currentPage="about" onNavigate={onNavigate} />
    </div>
  );
};
