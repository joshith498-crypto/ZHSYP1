/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UpdateItem, PageId } from '../../types';
import { sortUpdatesNewestFirst } from '../../utils/logic';
import { PageFlowNext } from '../PageFlowNext';
import { Bell, Plus, Edit2, Trash2, Calendar, Pin } from 'lucide-react';

interface UpdatesViewProps {
  updates: UpdateItem[];
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onAddUpdate: () => void;
  onEditUpdate: (update: UpdateItem) => void;
  onDeleteUpdate: (id: string) => void;
}

export const UpdatesView: React.FC<UpdatesViewProps> = ({
  updates,
  isAdmin,
  onNavigate,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
}) => {
  const sortedUpdates = sortUpdatesNewestFirst(updates);

  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#E5E0D8] bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <Bell className="w-3.5 h-3.5" />
          <span>Secretariat Dispatches</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Official Bulletins &amp; Updates
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          Chronological notices issued by the Presiding Officers and Organizing Committee.
        </p>

        {isAdmin && (
          <div className="mt-8">
            <button
              onClick={onAddUpdate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-sm font-medium rounded-sm transition-colors cursor-pointer"
              aria-label="Post New Update"
            >
              <Plus className="w-4 h-4 text-[#B08D57]" />
              <span>Post New Update</span>
            </button>
          </div>
        )}
      </section>

      {/* List of Updates (Newest First) */}
      <section className="space-y-6">
        {sortedUpdates.length === 0 ? (
          <div className="text-center py-12 card-subtle rounded-sm border border-[#E5E0D8]">
            <p className="text-sm text-[#6B6B6B]">No bulletins posted currently.</p>
          </div>
        ) : (
          sortedUpdates.map((item) => (
            <article
              key={item.id}
              className="card-subtle p-6 sm:p-8 rounded-sm border border-[#E5E0D8] hover:border-[#1F3D33] transition-all relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E5E0D8]">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#6B6B6B]">
                  <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>{item.date}</span>
                  {item.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#1F3D33] bg-[#1F3D33]/10 px-2 py-0.5 rounded-xs ml-2">
                      <Pin className="w-3 h-3 text-[#B08D57]" />
                      Pinned Bulletin
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEditUpdate(item)}
                      className="text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1 cursor-pointer"
                      title="Edit update"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteUpdate(item.id)}
                      className="text-xs text-[#6B6B6B] hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      title="Delete update"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              <h2 className="font-heading text-2xl font-bold text-[#1F3D33] mb-2">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base text-[#2B2B2B] leading-relaxed">
                {item.text}
              </p>
            </article>
          ))
        )}
      </section>

      {/* Page Flow: Next link to Gallery */}
      <PageFlowNext currentPage="updates" onNavigate={onNavigate} />
    </div>
  );
};
