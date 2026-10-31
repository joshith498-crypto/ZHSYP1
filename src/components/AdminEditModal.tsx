/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppData,
  TeamMember,
  ScheduleSlot,
  ResourceSection,
  UpdateItem,
  GalleryItem,
  RoleContact,
} from '../types';
import { X, Upload, Check, AlertCircle, Trash2 } from 'lucide-react';

export type EditModalTarget =
  | { type: 'site_branding'; data: AppData['branding'] }
  | { type: 'home_hero'; data: AppData['home'] }
  | { type: 'home_ticker'; data: string }
  | { type: 'home_chamber_box'; chamber: 'lokSabha' | 'aippm'; data: AppData['home']['lokSabhaBox'] }
  | { type: 'about_overview'; heading: string; introText: string; corePrinciples: string[] }
  | { type: 'about_principles'; principles: string[] }
  | { type: 'about_chair'; addressingChair: AppData['about']['addressingChair'] }
  | { type: 'about_what_to_bring'; whatToBring: string[] }
  | { type: 'about_glossary'; glossary: AppData['about']['glossary'] }
  | { type: 'agenda_chamber'; chamber: 'lokSabha' | 'aippm'; data: AppData['agendas']['lokSabha'] }
  | { type: 'schedule_slot'; chamber: 'lokSabha' | 'aippm'; slot: ScheduleSlot }
  | { type: 'schedule_header'; headerTime: string; dateDisplay: string; venueNote: string }
  | { type: 'team_member'; member: TeamMember; isNew?: boolean }
  | { type: 'resource_section'; section: ResourceSection }
  | { type: 'update_item'; update: UpdateItem; isNew?: boolean }
  | { type: 'gallery_add' }
  | { type: 'contact_item'; contact: RoleContact }
  | { type: 'contact_header'; officialEmail: string; schoolAddress: string };

interface AdminEditModalProps {
  target: EditModalTarget | null;
  onClose: () => void;
  onSave: (target: EditModalTarget) => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  target,
  onClose,
  onSave,
}) => {
  if (!target) return null;

  // Local form state cloned from target
  const [formState, setFormState] = useState<any>(() => {
    return JSON.parse(JSON.stringify(target));
  });

  useEffect(() => {
    setFormState(JSON.parse(JSON.stringify(target)));
  }, [target]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (fieldName.includes('.')) {
          const parts = fieldName.split('.');
          setFormState((prev: any) => ({
            ...prev,
            [parts[0]]: {
              ...prev[parts[0]],
              [parts[1]]: result,
            },
          }));
        } else {
          setFormState((prev: any) => ({
            ...prev,
            [fieldName]: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F3D33]/50 backdrop-blur-xs overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E5E0D8] rounded-sm p-6 sm:p-8 card-subtle relative my-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#1F3D33] p-1 cursor-pointer"
          aria-label="Close editor"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-[#1F3D33] mb-1">
          Secretariat Content Editor
        </h3>
        <p className="text-xs text-[#6B6B6B] mb-6">
          Modifications persist instantly to the public view and browser storage.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SITE BRANDING & FOOTER */}
          {formState.type === 'site_branding' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    School Acronym / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.data.schoolName}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: { ...formState.data, schoolName: e.target.value },
                      })
                    }
                    placeholder="e.g. ZHS"
                    className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Event Acronym
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.data.eventName}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: { ...formState.data, eventName: e.target.value },
                      })
                    }
                    placeholder="e.g. ZYPAC"
                    className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Footer School / Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.footerSchoolTitle}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, footerSchoolTitle: e.target.value },
                    })
                  }
                  placeholder="e.g. ZHS Youth Parliament"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Footer Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.data.footerDescription}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, footerDescription: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.data.officialEmail}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: { ...formState.data, officialEmail: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Event Date &amp; Tagline Subtext
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.data.eventSubtext}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: { ...formState.data, eventSubtext: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  School Campus / Venue Address
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.schoolAddress}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, schoolAddress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.copyrightNotice}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, copyrightNotice: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* HOME HERO */}
          {formState.type === 'home_hero' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Hero Heading
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.heroHeading}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, heroHeading: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.heroTagline}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, heroTagline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Vision Line
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.data.visionLine}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, visionLine: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Stat 1 (e.g. 60–70 Delegates)
                  </label>
                  <input
                    type="text"
                    value={formState.data.stats.stat1}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: {
                          ...formState.data,
                          stats: { ...formState.data.stats, stat1: e.target.value },
                        },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-white border border-[#E5E0D8] rounded-xs text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Stat 2 (e.g. 2 Chambers)
                  </label>
                  <input
                    type="text"
                    value={formState.data.stats.stat2}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: {
                          ...formState.data,
                          stats: { ...formState.data.stats, stat2: e.target.value },
                        },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-white border border-[#E5E0D8] rounded-xs text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                    Stat 3 (e.g. 4 Sessions Each)
                  </label>
                  <input
                    type="text"
                    value={formState.data.stats.stat3}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        data: {
                          ...formState.data,
                          stats: { ...formState.data.stats, stat3: e.target.value },
                        },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-white border border-[#E5E0D8] rounded-xs text-xs"
                  />
                </div>
              </div>
            </>
          )}

          {/* HOME TICKER */}
          {formState.type === 'home_ticker' && (
            <div>
              <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                News Ticker Headline Text
              </label>
              <textarea
                rows={3}
                required
                value={formState.data}
                onChange={(e) => setFormState({ ...formState, data: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
              />
              <p className="text-[11px] text-[#6B6B6B] mt-1">
                Use dots (&quot;·&quot;) to separate news announcements.
              </p>
            </div>
          )}

          {/* HOME CHAMBER BOX */}
          {formState.type === 'home_chamber_box' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Chamber Title
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.title}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formState.data.subtitle}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Agenda Text Displayed on Homepage Box
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.data.agendaText}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, agendaText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* ABOUT OVERVIEW */}
          {formState.type === 'about_overview' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  required
                  value={formState.heading}
                  onChange={(e) => setFormState({ ...formState, heading: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Definition &amp; Overview Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.introText}
                  onChange={(e) => setFormState({ ...formState, introText: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* ABOUT PRINCIPLES */}
          {formState.type === 'about_principles' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Core Principles (4 Pillars)
                </label>
                <div className="space-y-3">
                  {formState.principles.map((principle: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1F3D33] w-20 shrink-0">
                        Pillar {idx + 1}:
                      </span>
                      <input
                        type="text"
                        required
                        value={principle}
                        onChange={(e) => {
                          const updated = [...formState.principles];
                          updated[idx] = e.target.value;
                          setFormState({ ...formState, principles: updated });
                        }}
                        className="flex-1 px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ABOUT CHAIR */}
          {formState.type === 'about_chair' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  How to Address Chair in Lok Sabha
                </label>
                <input
                  type="text"
                  required
                  value={formState.addressingChair.lokSabha}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      addressingChair: {
                        ...formState.addressingChair,
                        lokSabha: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g. Honourable Speaker'
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  How to Address Chair in AIPPM
                </label>
                <input
                  type="text"
                  required
                  value={formState.addressingChair.aippm}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      addressingChair: {
                        ...formState.addressingChair,
                        aippm: e.target.value,
                      },
                    })
                  }
                  placeholder='e.g. Honourable Chairman'
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Presiding Protocol Guideline Note
                </label>
                <textarea
                  rows={3}
                  value={formState.addressingChair.guideline}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      addressingChair: {
                        ...formState.addressingChair,
                        guideline: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* ABOUT WHAT TO BRING */}
          {formState.type === 'about_what_to_bring' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  What to Bring Items
                </label>
                <div className="space-y-3">
                  {formState.whatToBring.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={item}
                        onChange={(e) => {
                          const updated = [...formState.whatToBring];
                          updated[idx] = e.target.value;
                          setFormState({ ...formState, whatToBring: updated });
                        }}
                        className="flex-1 px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formState.whatToBring.filter((_: any, i: number) => i !== idx);
                          setFormState({ ...formState, whatToBring: updated });
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormState({
                        ...formState,
                        whatToBring: [...formState.whatToBring, 'New required item'],
                      });
                    }}
                    className="text-xs text-[#1F3D33] font-semibold hover:text-[#B08D57] underline cursor-pointer"
                  >
                    + Add another item
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ABOUT GLOSSARY */}
          {formState.type === 'about_glossary' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Parliamentary Glossary (8 Core Terms)
                </label>
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {formState.glossary.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white border border-[#E5E0D8] rounded-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          required
                          value={item.term}
                          onChange={(e) => {
                            const updated = [...formState.glossary];
                            updated[idx].term = e.target.value;
                            setFormState({ ...formState, glossary: updated });
                          }}
                          placeholder="Term Name"
                          className="font-bold text-sm text-[#1F3D33] border-b border-[#E5E0D8] px-1 py-0.5 w-1/2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formState.glossary.filter((_: any, i: number) => i !== idx);
                            setFormState({ ...formState, glossary: updated });
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        required
                        value={item.definition}
                        onChange={(e) => {
                          const updated = [...formState.glossary];
                          updated[idx].definition = e.target.value;
                          setFormState({ ...formState, glossary: updated });
                        }}
                        placeholder="Definition"
                        className="w-full text-xs text-[#2B2B2B] border border-[#E5E0D8] rounded-xs p-1.5"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormState({
                        ...formState,
                        glossary: [
                          ...formState.glossary,
                          { term: 'New Term', definition: 'Definition of parliamentary rule.' },
                        ],
                      });
                    }}
                    className="text-xs text-[#1F3D33] font-semibold hover:text-[#B08D57] underline cursor-pointer"
                  >
                    + Add Term to Glossary
                  </button>
                </div>
              </div>
            </>
          )}

          {/* AGENDAS CHAMBER */}
          {formState.type === 'agenda_chamber' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Chamber Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.data.chamberName}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, chamberName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Official Agenda Text
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.data.agendaText}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, agendaText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Background Context
                </label>
                <textarea
                  rows={3}
                  value={formState.data.backgroundContext}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      data: { ...formState.data, backgroundContext: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Session Flow (4 Steps)
                </label>
                <div className="space-y-3">
                  {formState.data.sessionFlow.map((step: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white border border-[#E5E0D8] rounded-xs text-xs space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1F3D33]">Step {step.stepNumber}:</span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const newFlow = [...formState.data.sessionFlow];
                            newFlow[idx].title = e.target.value;
                            setFormState({
                              ...formState,
                              data: { ...formState.data, sessionFlow: newFlow },
                            });
                          }}
                          className="flex-1 px-2 py-1 border border-[#E5E0D8] rounded-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={step.description}
                        onChange={(e) => {
                          const newFlow = [...formState.data.sessionFlow];
                          newFlow[idx].description = e.target.value;
                          setFormState({
                            ...formState,
                            data: { ...formState.data, sessionFlow: newFlow },
                          });
                        }}
                        placeholder="Description of flow"
                        className="w-full px-2 py-1 border border-[#E5E0D8] rounded-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SCHEDULE SLOT */}
          {formState.type === 'schedule_slot' && (
            <>
              <div>
                <span className="text-xs uppercase font-bold text-[#B08D57]">
                  {formState.chamber === 'lokSabha' ? 'Lok Sabha' : 'AIPPM'} Chamber
                </span>
                <h4 className="font-heading text-xl font-bold text-[#1F3D33]">
                  {formState.slot.sessionLabel}
                </h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Session Time (e.g. &quot;09:00 AM – 10:15 AM&quot;)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 09:00 AM – 10:15 AM"
                  value={formState.slot.timeRange}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      slot: { ...formState.slot, timeRange: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Activity Topic / Title
                </label>
                <input
                  type="text"
                  required
                  value={formState.slot.activityTitle}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      slot: { ...formState.slot, activityTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Session Notes &amp; Parliamentary Rules
                </label>
                <textarea
                  rows={3}
                  value={formState.slot.notes}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      slot: { ...formState.slot, notes: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* SCHEDULE HEADER */}
          {formState.type === 'schedule_header' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Timetable Header Time (e.g. &quot;9:00 AM – 2:00 PM&quot;)
                </label>
                <input
                  type="text"
                  required
                  value={formState.headerTime}
                  onChange={(e) => setFormState({ ...formState, headerTime: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Date Display
                </label>
                <input
                  type="text"
                  required
                  value={formState.dateDisplay}
                  onChange={(e) => setFormState({ ...formState, dateDisplay: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Venue Note
                </label>
                <input
                  type="text"
                  value={formState.venueNote}
                  onChange={(e) => setFormState({ ...formState, venueNote: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* TEAM MEMBER */}
          {formState.type === 'team_member' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.member.name}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      member: { ...formState.member, name: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Role / Designation
                </label>
                <input
                  type="text"
                  required
                  value={formState.member.role}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      member: { ...formState.member, role: e.target.value },
                    })
                  }
                  placeholder="e.g. General Secretary"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Description / Responsibilities
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.member.description}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      member: { ...formState.member, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              {/* Photo Upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Member Photo
                </label>
                <div className="flex items-center gap-4">
                  {formState.member.imageUrl && (
                    <img
                      src={formState.member.imageUrl}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xs border border-[#E5E0D8]"
                    />
                  )}
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      placeholder="Paste Image URL or upload below"
                      value={formState.member.imageUrl}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          member: { ...formState.member, imageUrl: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5E0D8] rounded-xs text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1F3D33]/10 hover:bg-[#1F3D33]/20 text-[#1F3D33] text-xs font-medium rounded-xs cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'member.imageUrl')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* RESOURCE SECTION */}
          {formState.type === 'resource_section' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  required
                  value={formState.section.title}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      section: { ...formState.section, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={formState.section.description}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      section: { ...formState.section, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Full Details &amp; Guidelines Content
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.section.details}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      section: { ...formState.section, details: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Download Button Label
                </label>
                <input
                  type="text"
                  value={formState.section.downloadLabel || ''}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      section: { ...formState.section, downloadLabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* UPDATE ITEM */}
          {formState.type === 'update_item' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Date
                </label>
                <input
                  type="text"
                  required
                  value={formState.update.date}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      update: { ...formState.update, date: e.target.value },
                    })
                  }
                  placeholder="e.g., 30 October 2026"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Bulletin Title
                </label>
                <input
                  type="text"
                  required
                  value={formState.update.title}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      update: { ...formState.update, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Notice Body Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.update.text}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      update: { ...formState.update, text: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pin-update"
                  checked={formState.update.isPinned || false}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      update: { ...formState.update, isPinned: e.target.checked },
                    })
                  }
                  className="rounded-xs text-[#1F3D33] focus:ring-[#1F3D33]"
                />
                <label htmlFor="pin-update" className="text-xs text-[#2B2B2B]">
                  Pin this bulletin to the top of the updates feed
                </label>
              </div>
            </>
          )}

          {/* GALLERY ADD */}
          {formState.type === 'gallery_add' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delegates in Lok Sabha Chamber"
                  value={formState.title || ''}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Deliberating amendments to the draft communiqué"
                  value={formState.caption || ''}
                  onChange={(e) => setFormState({ ...formState, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Category Tag (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chamber, Chair, Debate"
                  value={formState.category || ''}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Image Source
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Paste image web URL"
                    value={formState.imageUrl || ''}
                    onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                  />
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F3D33]/10 hover:bg-[#1F3D33]/20 text-[#1F3D33] text-xs font-medium rounded-xs cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Or Upload Photo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'imageUrl')}
                      />
                    </label>
                    {formState.imageUrl && (
                      <span className="text-xs text-emerald-700">Photo attached ✓</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CONTACT ITEM */}
          {formState.type === 'contact_item' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Officer Role
                </label>
                <input
                  type="text"
                  required
                  value={formState.contact.role}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, role: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Scope of Inquiries
                </label>
                <input
                  type="text"
                  required
                  value={formState.contact.scope}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, scope: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Officer Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.contact.personName}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, personName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.contact.email}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="text"
                  value={formState.contact.phone || ''}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* CONTACT HEADER */}
          {formState.type === 'contact_header' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Official Secretariat Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.officialEmail}
                  onChange={(e) => setFormState({ ...formState, officialEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3D33] uppercase mb-1">
                  Campus / Venue Address
                </label>
                <textarea
                  rows={2}
                  value={formState.schoolAddress}
                  onChange={(e) => setFormState({ ...formState, schoolAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B]"
                />
              </div>
            </>
          )}

          {/* Submit Actions */}
          <div className="pt-6 border-t border-[#E5E0D8] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#E5E0D8] text-xs font-medium text-[#6B6B6B] hover:text-[#1F3D33] rounded-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save &amp; Publish Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
