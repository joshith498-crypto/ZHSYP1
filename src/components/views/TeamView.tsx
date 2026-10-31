/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TeamMember, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Interactive3DCard } from '../Interactive3DCard';
import { UserCheck, Plus, Edit2, Trash2, Upload } from 'lucide-react';

interface TeamViewProps {
  members: TeamMember[];
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditMember: (member: TeamMember) => void;
  onAddMember: () => void;
  onDeleteMember: (id: string) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  members,
  isAdmin,
  onNavigate,
  onEditMember,
  onAddMember,
  onDeleteMember,
}) => {
  const getInitials = (name: string, role: string) => {
    const source = (name && name.trim()) ? name : role;
    return source
      .split(' ')
      .filter((w) => !['the', 'and', 'for', 'of', 'in', '&', '—'].includes(w.toLowerCase()))
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/80 bg-white/60 backdrop-blur-md shadow-xs text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Secretariat &amp; Chamber Leadership</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Organising Team &amp; Executive Board
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          The student convenors, chamber officers, faculty mentors, and parliamentary corps executing ZYPAC 2026.
        </p>

        {/* Add Member button for admin */}
        {isAdmin && (
          <div className="mt-8">
            <button
              onClick={onAddMember}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-sm font-medium rounded-sm transition-colors cursor-pointer shadow-xs"
              aria-label="Add Member Slot"
            >
              <Plus className="w-4 h-4 text-[#B08D57]" />
              <span>Add Member</span>
            </button>
          </div>
        )}
      </section>

      {/* Grid of 3D Liquid Glass Team Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member, index) => (
          <Interactive3DCard
            key={member.id}
            intensity={7}
            glare={true}
            glareColor="brass"
            liquidVariant="elevated"
            className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-[#B08D57]/60 transition-colors group"
          >
            {/* Picture on LEFT with 3D depth */}
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xs overflow-hidden border border-[#E5E0D8]/80 bg-[#FAF8F5] relative flex flex-col items-center justify-center shadow-xs"
              style={{ transform: 'translateZ(16px)' }}
            >
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1F3D33]/5 text-[#1F3D33] p-2 text-center select-none">
                  <span className="font-heading text-2xl sm:text-3xl font-bold tracking-wider text-[#1F3D33]">
                    {getInitials(member.name, member.role)}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#B08D57] font-medium mt-1">
                    Photo Slot
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => onEditMember(member)}
                      className="mt-1 text-[10px] text-[#1F3D33] hover:text-[#B08D57] underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      Upload
                    </button>
                  )}
                </div>
              )}
              <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.2 bg-[#FAF8F5]/90 border border-[#E5E0D8] rounded-xs text-[#6B6B6B]">
                #{index + 1}
              </span>
            </div>

            {/* Name + Role + Description with 3D parallax */}
            <div
              className="flex-1 min-w-0"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B08D57]">
                  {member.role}
                </span>
                {isAdmin && (
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => onEditMember(member)}
                      className="p-1 text-[#6B6B6B] hover:text-[#1F3D33] cursor-pointer"
                      title="Edit member details"
                      aria-label={`Edit ${member.name}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteMember(member.id)}
                      className="p-1 text-[#6B6B6B] hover:text-red-700 cursor-pointer"
                      title="Delete slot"
                      aria-label={`Delete ${member.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1F3D33] truncate">
                {member.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mt-1 line-clamp-3 group-hover:line-clamp-none transition-all">
                {member.description}
              </p>
            </div>
          </Interactive3DCard>
        ))}
      </section>

      {/* Page Flow: Next link to Resources */}
      <PageFlowNext currentPage="team" onNavigate={onNavigate} />
    </div>
  );
};
