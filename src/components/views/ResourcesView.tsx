/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ResourcesData, ResourceSection, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { FolderDown, Download, FileText, CheckCircle, Edit2, ExternalLink } from 'lucide-react';

interface ResourcesViewProps {
  data: ResourcesData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditSection: (section: ResourceSection) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditSection,
}) => {
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownload = (section: ResourceSection) => {
    // Generate text dossier download for delegates
    const content = `ZYPAC 2026 - OFFICIAL RESOURCE\n\nTitle: ${section.title}\n\nSummary:\n${section.description}\n\nDetails & Guidelines:\n${section.details}\n\nDate: 14 November · ZHS Youth Parliament for Action and Change`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${section.title.replace(/[^a-zA-Z0-9]/g, '_')}_ZYPAC.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessId(section.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#E5E0D8] bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <FolderDown className="w-3.5 h-3.5" />
          <span>Delegate Briefing Archives</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Official Resources &amp; Kits
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          Access the 5 official preparatory documents, procedure manuals, templates, and dossiers sanctioned by the Secretariat.
        </p>
      </section>

      {/* 5 Sub-sections */}
      <section className="space-y-6">
        {data.sections.map((section, index) => {
          const isDownloaded = downloadSuccessId === section.id;

          return (
            <div
              key={section.id}
              className="card-subtle p-6 sm:p-8 rounded-sm border border-[#E5E0D8] hover:border-[#1F3D33] transition-all relative group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-sm bg-[#1F3D33]/10 text-[#1F3D33] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5 text-[#B08D57]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B08D57]">
                      Section 0{index + 1}
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-[#1F3D33]">
                      {section.title}
                    </h2>
                    <p className="text-sm font-medium text-[#2B2B2B] mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => onEditSection(section)}
                    className="self-start sm:self-auto text-xs text-[#B08D57] hover:text-[#1F3D33] flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E0D8] rounded-xs cursor-pointer shrink-0"
                    title={`Edit ${section.title}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Section</span>
                  </button>
                )}
              </div>

              {/* Body Details */}
              <div className="py-4 text-sm text-[#6B6B6B] leading-relaxed">
                <p className="whitespace-pre-line">{section.details}</p>
              </div>

              {/* Download / Access Action */}
              <div className="pt-4 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[#6B6B6B]">
                  Sanctioned for delegates of Lok Sabha &amp; AIPPM
                </div>

                <button
                  onClick={() => handleDownload(section)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-xs font-medium rounded-xs transition-colors cursor-pointer"
                  aria-label={section.downloadLabel || `Download ${section.title}`}
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Downloaded Document</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#B08D57]" />
                      <span>{section.downloadLabel || 'Download Dossier'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Page Flow: Next link to Updates */}
      <PageFlowNext currentPage="resources" onNavigate={onNavigate} />
    </div>
  );
};
