/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppData,
  PageId,
  TeamMember,
  ScheduleSlot,
  ResourceSection,
  UpdateItem,
  GalleryItem,
  RoleContact,
} from './types';
import {
  loadStoredAppData,
  saveStoredAppData,
  resetStoredAppData,
  ADMIN_AUTH_KEY,
} from './utils/logic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminEditModal, EditModalTarget } from './components/AdminEditModal';
import { PublishModal } from './components/PublishModal';
import { pushDataToGitHub, getSavedGitHubConfig } from './utils/githubSync';
import { CheckCircle2, AlertCircle, ExternalLink, X as CloseIcon } from 'lucide-react';

import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { AgendasView } from './components/views/AgendasView';
import { ScheduleView } from './components/views/ScheduleView';
import { TeamView } from './components/views/TeamView';
import { ResourcesView } from './components/views/ResourcesView';
import { UpdatesView } from './components/views/UpdatesView';
import { GalleryView } from './components/views/GalleryView';
import { ContactView } from './components/views/ContactView';

export default function App() {
  const VALID_PAGES: PageId[] = [
    'home',
    'about',
    'agendas',
    'schedule',
    'team',
    'resources',
    'updates',
    'gallery',
    'contact',
  ];

  const getInitialPage = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageId;
    if (pageParam && VALID_PAGES.includes(pageParam)) {
      return pageParam;
    }
    // Check hash (e.g. #/about or #about)
    const cleanHash = window.location.hash.replace(/^#\/?/, '').split('?')[0] as PageId;
    if (cleanHash && VALID_PAGES.includes(cleanHash)) {
      return cleanHash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Sync active page to URL hash so page refreshes and direct links work cleanly on GitHub Pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
      const targetHash = currentPage === 'home' ? '' : `#${currentPage}`;
      if (currentHash !== currentPage && !(currentPage === 'home' && !currentHash)) {
        window.history.replaceState(null, '', targetHash || window.location.pathname + window.location.search);
      }
    }
  }, [currentPage]);

  // Listen to browser navigation (back/forward and hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const [data, setData] = useState<AppData>(() => loadStoredAppData());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    }
    return false;
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<EditModalTarget | null>(null);
  const [quickPushing, setQuickPushing] = useState(false);
  const [quickPushBanner, setQuickPushBanner] = useState<{
    type: 'success' | 'error';
    message: string;
    url?: string;
  } | null>(null);

  // Sync data updates to localStorage
  const updateData = (newData: AppData) => {
    setData(newData);
    saveStoredAppData(newData);
  };

  // 1-Click Push directly into GitHub repository (triggers Netlify auto-deploy)
  const handleQuickPushToGitHub = async () => {
    setQuickPushing(true);
    setQuickPushBanner(null);
    const cfg = getSavedGitHubConfig();
    const res = await pushDataToGitHub(data, {
      token: cfg.token,
      owner: cfg.owner,
      repo: cfg.repo,
      branch: cfg.branch,
    });
    setQuickPushing(false);

    if (res.success) {
      setQuickPushBanner({
        type: 'success',
        message: `Pushed commit ${res.commitSha} to GitHub! Netlify is auto-deploying to all visitors right now.`,
        url: res.commitUrl,
      });
      setTimeout(() => setQuickPushBanner(null), 15000);
    } else {
      setQuickPushBanner({
        type: 'error',
        message: res.error || 'Failed to push to GitHub.',
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  };

  const handleResetDefaults = () => {
    const defaults = resetStoredAppData();
    setData(defaults);
  };

  // Quick edit dispatchers
  const handleOpenPageEditor = () => {
    switch (currentPage) {
      case 'home':
        setEditTarget({ type: 'home_hero', data: data.home });
        break;
      case 'about':
        setEditTarget({
          type: 'about_overview',
          heading: data.about.heading,
          introText: data.about.introText,
          corePrinciples: data.about.corePrinciples,
        });
        break;
      case 'agendas':
        setEditTarget({
          type: 'agenda_chamber',
          chamber: 'lokSabha',
          data: data.agendas.lokSabha,
        });
        break;
      case 'schedule':
        setEditTarget({
          type: 'schedule_header',
          headerTime: data.schedule.headerTime,
          dateDisplay: data.schedule.dateDisplay,
          venueNote: data.schedule.venueNote,
        });
        break;
      case 'contact':
        setEditTarget({
          type: 'contact_header',
          officialEmail: data.contact.officialEmail,
          schoolAddress: data.contact.schoolAddress,
        });
        break;
      default:
        // For list views, guide them to click individual items
        alert(`Click on any item in the ${currentPage} section to edit it, or use the Add button.`);
        break;
    }
  };

  const handleSaveModalTarget = (target: EditModalTarget) => {
    const copy = JSON.parse(JSON.stringify(data)) as AppData;

    switch (target.type) {
      case 'site_branding':
        copy.branding = target.data;
        break;
      case 'home_hero':
        copy.home = target.data;
        break;
      case 'home_ticker':
        copy.home.newsTicker = target.data;
        break;
      case 'home_chamber_box':
        if (target.chamber === 'lokSabha') {
          copy.home.lokSabhaBox = target.data;
        } else {
          copy.home.aippmBox = target.data;
        }
        break;
      case 'about_overview':
        copy.about.heading = target.heading;
        copy.about.introText = target.introText;
        copy.about.corePrinciples = target.corePrinciples;
        break;
      case 'about_principles':
        copy.about.corePrinciples = target.principles;
        break;
      case 'about_chair':
        copy.about.addressingChair = target.addressingChair;
        break;
      case 'about_what_to_bring':
        copy.about.whatToBring = target.whatToBring;
        break;
      case 'about_glossary':
        copy.about.glossary = target.glossary;
        break;
      case 'agenda_chamber':
        if (target.chamber === 'lokSabha') {
          copy.agendas.lokSabha = target.data;
        } else {
          copy.agendas.aippm = target.data;
        }
        break;
      case 'schedule_slot': {
        const slots =
          target.chamber === 'lokSabha' ? copy.schedule.lokSabhaSlots : copy.schedule.aippmSlots;
        const index = slots.findIndex((s) => s.id === target.slot.id);
        if (index !== -1) {
          slots[index] = target.slot;
        }
        break;
      }
      case 'schedule_header':
        copy.schedule.headerTime = target.headerTime;
        copy.schedule.dateDisplay = target.dateDisplay;
        copy.schedule.venueNote = target.venueNote;
        break;
      case 'team_member': {
        if (target.isNew) {
          copy.team.push(target.member);
        } else {
          const index = copy.team.findIndex((m) => m.id === target.member.id);
          if (index !== -1) {
            copy.team[index] = target.member;
          }
        }
        break;
      }
      case 'resource_section': {
        const index = copy.resources.sections.findIndex((s) => s.id === target.section.id);
        if (index !== -1) {
          copy.resources.sections[index] = target.section;
        }
        break;
      }
      case 'update_item': {
        if (target.isNew) {
          copy.updates.unshift(target.update);
        } else {
          const index = copy.updates.findIndex((u) => u.id === target.update.id);
          if (index !== -1) {
            copy.updates[index] = target.update;
          }
        }
        break;
      }
      case 'gallery_add': {
        const item = target as any;
        const newItem: GalleryItem = {
          id: `gal-${Date.now()}`,
          title: item.title || 'Parliament Session Glimpse',
          caption: item.caption || '',
          imageUrl: item.imageUrl || '',
          category: item.category || 'Chamber',
        };
        copy.gallery.unshift(newItem);
        break;
      }
      case 'contact_item': {
        const index = copy.contact.roleContacts.findIndex((c) => c.id === target.contact.id);
        if (index !== -1) {
          copy.contact.roleContacts[index] = target.contact;
        }
        break;
      }
      case 'contact_header':
        copy.contact.officialEmail = target.officialEmail;
        copy.contact.schoolAddress = target.schoolAddress;
        break;
    }

    updateData(copy);
  };

  // Delete handlers for team, updates, gallery
  const handleDeleteTeamMember = (id: string) => {
    const copy = { ...data, team: data.team.filter((m) => m.id !== id) };
    updateData(copy);
  };

  const handleDeleteUpdate = (id: string) => {
    const copy = { ...data, updates: data.updates.filter((u) => u.id !== id) };
    updateData(copy);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const copy = { ...data, gallery: data.gallery.filter((g) => g.id !== id) };
    updateData(copy);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2B2B] flex flex-col font-sans selection:bg-[#B08D57]/20 selection:text-[#1F3D33]">
      {/* Sticky Top Nav */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isAdmin={isAdmin}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
        branding={data.branding}
      />

      {/* Admin Action Bar when Authenticated */}
      {isAdmin && (
        <>
          <AdminBar
            currentPage={currentPage}
            onOpenPageEditor={handleOpenPageEditor}
            onEditBranding={() => setEditTarget({ type: 'site_branding', data: data.branding })}
            onOpenPublish={() => setPublishModalOpen(true)}
            onQuickPushToGitHub={handleQuickPushToGitHub}
            quickPushLoading={quickPushing}
            onResetDefaults={handleResetDefaults}
            onLogout={handleLogout}
          />

          {quickPushBanner && (
            <div
              className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
                quickPushBanner.type === 'success'
                  ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                  : 'bg-red-900 text-red-100 border-red-700'
              }`}
            >
              <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {quickPushBanner.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                  )}
                  <span>{quickPushBanner.message}</span>
                  {quickPushBanner.url && (
                    <a
                      href={quickPushBanner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold text-emerald-200 hover:text-white inline-flex items-center gap-0.5 ml-1"
                    >
                      View on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setQuickPushBanner(null)}
                  className="p-1 text-white/70 hover:text-white rounded cursor-pointer"
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentPage === 'home' && (
          <HomeView
            data={data.home}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditSection={(sectionKey) => {
              if (sectionKey === 'home.newsTicker') {
                setEditTarget({ type: 'home_ticker', data: data.home.newsTicker });
              } else if (sectionKey === 'home.lokSabhaBox') {
                setEditTarget({
                  type: 'home_chamber_box',
                  chamber: 'lokSabha',
                  data: data.home.lokSabhaBox,
                });
              } else if (sectionKey === 'home.aippmBox') {
                setEditTarget({
                  type: 'home_chamber_box',
                  chamber: 'aippm',
                  data: data.home.aippmBox,
                });
              } else {
                setEditTarget({ type: 'home_hero', data: data.home });
              }
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            data={data.about}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditSection={(sectionKey) => {
              if (sectionKey === 'about.principles') {
                setEditTarget({
                  type: 'about_principles',
                  principles: data.about.corePrinciples,
                });
              } else if (sectionKey === 'about.chair') {
                setEditTarget({
                  type: 'about_chair',
                  addressingChair: data.about.addressingChair,
                });
              } else if (sectionKey === 'about.whatToBring') {
                setEditTarget({
                  type: 'about_what_to_bring',
                  whatToBring: data.about.whatToBring,
                });
              } else if (sectionKey === 'about.glossary') {
                setEditTarget({
                  type: 'about_glossary',
                  glossary: data.about.glossary,
                });
              } else {
                setEditTarget({
                  type: 'about_overview',
                  heading: data.about.heading,
                  introText: data.about.introText,
                  corePrinciples: data.about.corePrinciples,
                });
              }
            }}
          />
        )}

        {currentPage === 'agendas' && (
          <AgendasView
            data={data.agendas}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditSection={(chamberKey) => {
              const chamber = chamberKey.includes('aippm') ? 'aippm' : 'lokSabha';
              setEditTarget({
                type: 'agenda_chamber',
                chamber,
                data: data.agendas[chamber],
              });
            }}
          />
        )}

        {currentPage === 'schedule' && (
          <ScheduleView
            data={data.schedule}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditSlot={(chamber, slotId) => {
              const slots =
                chamber === 'lokSabha' ? data.schedule.lokSabhaSlots : data.schedule.aippmSlots;
              const slot = slots.find((s) => s.id === slotId);
              if (slot) {
                setEditTarget({ type: 'schedule_slot', chamber, slot });
              }
            }}
            onEditHeader={() => {
              setEditTarget({
                type: 'schedule_header',
                headerTime: data.schedule.headerTime,
                dateDisplay: data.schedule.dateDisplay,
                venueNote: data.schedule.venueNote,
              });
            }}
          />
        )}

        {currentPage === 'team' && (
          <TeamView
            members={data.team}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditMember={(member) => setEditTarget({ type: 'team_member', member })}
            onAddMember={() => {
              const newMember: TeamMember = {
                id: `member-${Date.now()}`,
                name: '',
                role: '',
                description: '',
                imageUrl: '',
                isCore: false,
              };
              setEditTarget({ type: 'team_member', member: newMember, isNew: true });
            }}
            onDeleteMember={handleDeleteTeamMember}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesView
            data={data.resources}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditSection={(section) => setEditTarget({ type: 'resource_section', section })}
          />
        )}

        {currentPage === 'updates' && (
          <UpdatesView
            updates={data.updates}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onAddUpdate={() => {
              const newUpdate: UpdateItem = {
                id: `up-${Date.now()}`,
                date: new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
                title: '',
                text: '',
                isPinned: false,
              };
              setEditTarget({ type: 'update_item', update: newUpdate, isNew: true });
            }}
            onEditUpdate={(update) => setEditTarget({ type: 'update_item', update })}
            onDeleteUpdate={handleDeleteUpdate}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryView
            items={data.gallery}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onAddImage={() => setEditTarget({ type: 'gallery_add' })}
            onDeleteImage={handleDeleteGalleryItem}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            data={data.contact}
            isAdmin={isAdmin}
            onNavigate={setCurrentPage}
            onEditContact={(contact) => setEditTarget({ type: 'contact_item', contact })}
            onEditHeader={() =>
              setEditTarget({
                type: 'contact_header',
                officialEmail: data.contact.officialEmail,
                schoolAddress: data.contact.schoolAddress,
              })
            }
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        branding={data.branding}
        isAdmin={isAdmin}
        onOpenLogin={() => setLoginModalOpen(true)}
        onEditBranding={() => setEditTarget({ type: 'site_branding', data: data.branding })}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Admin Content Editor Modal */}
      <AdminEditModal
        target={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSaveModalTarget}
      />

      {/* Publish & Export for Netlify / Everyone */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        data={data}
        onImportData={(imported) => updateData(imported)}
      />
    </div>
  );
}
