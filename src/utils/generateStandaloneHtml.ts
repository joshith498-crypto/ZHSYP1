/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState } from '../types';

export function generateStandaloneHtml(state: AppState): string {
  const jsonState = JSON.stringify(state).replace(/<\/script>/g, '<\\/script>');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(state.branding.eventName)} | ${escapeHtml(state.branding.schoolName)}</title>
  <meta name="description" content="Official website for ${escapeHtml(state.branding.eventName)} - ${escapeHtml(state.home.heroTagline)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            ivory: '#FAF8F5',
            forest: '#1F3D33',
            brass: '#B08D57',
            charcoal: '#2B2B2B',
            secondary: '#6B6B6B',
            beige: '#E5E0D8',
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #FAF8F5; color: #2B2B2B; font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; }
    h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Cormorant Garamond', Georgia, serif; }
    .card-subtle { background-color: #FAF8F5; border: 1px solid #E5E0D8; box-shadow: 0 4px 16px rgba(31, 61, 51, 0.05); }
    @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
    .ticker-scroll { display: flex; width: max-content; animation: marquee 25s linear infinite; }
    .ticker-scroll:hover { animation-play-state: paused; }
  </style>
</head>
<body class="bg-ivory text-charcoal min-h-screen flex flex-col">

  <!-- Admin Bar -->
  <div id="adminBar" class="hidden bg-[#1F3D33] text-white border-b border-[#B08D57]/30 px-4 py-2.5 text-xs">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 rounded-full bg-[#B08D57] animate-ping"></span>
        <span>Admin Active: <strong>xyz</strong> · Live Edit Mode</span>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="logoutAdmin()" class="px-2.5 py-1 text-white/80 hover:text-white border border-white/20 rounded">Logout</button>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5E0D8]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <div class="flex items-center space-x-3 cursor-pointer" onclick="showPage('home')">
        <div class="w-11 h-11 rounded-sm bg-[#1F3D33] text-[#FAF8F5] flex items-center justify-center font-heading text-2xl font-bold border border-[#B08D57]/40">
          ${escapeHtml(state.branding.schoolName.charAt(0) || 'Z')}
        </div>
        <div class="flex flex-col">
          <span class="font-heading text-2xl sm:text-3xl font-semibold text-[#1F3D33] leading-none">${escapeHtml(state.branding.eventName)}</span>
          <span class="text-xs uppercase tracking-widest text-[#6B6B6B] font-medium mt-1">${escapeHtml(state.branding.eventSubtext)}</span>
        </div>
      </div>

      <nav class="hidden lg:flex items-center space-x-1" id="navLinks">
        <button onclick="showPage('home')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#1F3D33] font-semibold border-b-2 border-[#1F3D33]" data-page="home">Home</button>
        <button onclick="showPage('about')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="about">About</button>
        <button onclick="showPage('agendas')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="agendas">Agendas</button>
        <button onclick="showPage('schedule')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="schedule">Schedule</button>
        <button onclick="showPage('team')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="team">Team</button>
        <button onclick="showPage('resources')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="resources">Resources</button>
        <button onclick="showPage('updates')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="updates">Updates</button>
        <button onclick="showPage('gallery')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="gallery">Gallery</button>
        <button onclick="showPage('contact')" class="nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]" data-page="contact">Contact</button>
      </nav>

      <div class="flex items-center space-x-3">
        <button onclick="openLoginModal()" id="adminLoginBtn" class="text-xs font-medium text-[#6B6B6B] hover:text-[#1F3D33] px-3 py-1.5 border border-[#E5E0D8] rounded-sm hover:border-[#B08D57]">
          Admin Access
        </button>
      </div>
    </div>
  </header>

  <!-- Content Container -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10" id="mainContent">
    <!-- HOME -->
    <section id="view-home" class="page-view space-y-16">
      <div class="border-y border-[#E5E0D8] py-2.5 overflow-hidden">
        <div class="flex items-center space-x-3 text-sm">
          <span class="px-2 py-0.5 bg-[#1F3D33] text-white text-xs uppercase font-bold rounded-xs shrink-0">Gazette Bulletin</span>
          <span class="text-[#2B2B2B]">${escapeHtml(state.home.tickerText)}</span>
        </div>
      </div>

      <div class="text-center pt-6">
        <div class="inline-block px-3.5 py-1 rounded-sm border border-[#E5E0D8] text-xs font-medium uppercase tracking-widest text-[#1F3D33] mb-6">
          14 November · 9:00 AM – 2:00 PM
        </div>
        <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-[#1F3D33] tracking-tight max-w-4xl mx-auto leading-tight mb-4">
          ${escapeHtml(state.home.heroHeading)}
        </h1>
        <div class="text-xl sm:text-2xl font-serif text-[#B08D57] italic mb-6">
          ${escapeHtml(state.home.heroTagline)}
        </div>
        <p class="max-w-2xl mx-auto text-base sm:text-lg text-[#6B6B6B] leading-relaxed mb-10">
          &quot;${escapeHtml(state.home.visionLine)}&quot;
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-y border-[#E5E0D8] py-8 my-8">
          <div>
            <div class="font-heading text-4xl font-bold text-[#1F3D33]">${escapeHtml(state.home.statDelegates)}</div>
            <div class="text-xs uppercase tracking-widest text-[#6B6B6B] mt-1">Student Representatives</div>
          </div>
          <div>
            <div class="font-heading text-4xl font-bold text-[#1F3D33]">${escapeHtml(state.home.statChambers)}</div>
            <div class="text-xs uppercase tracking-widest text-[#6B6B6B] mt-1">Lok Sabha & AIPPM</div>
          </div>
          <div>
            <div class="font-heading text-4xl font-bold text-[#1F3D33]">${escapeHtml(state.home.statSessions)}</div>
            <div class="text-xs uppercase tracking-widest text-[#6B6B6B] mt-1">Structured Parliamentary Flow</div>
          </div>
        </div>

        <!-- 2 Huge Boxes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
          <div class="card-subtle p-8 rounded-sm flex flex-col justify-between hover:border-[#1F3D33] transition-colors">
            <div>
              <span class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[#1F3D33]/10 text-[#1F3D33] rounded-xs">Legislative Chamber</span>
              <h3 class="font-heading text-4xl font-bold text-[#1F3D33] mt-3 mb-2">${escapeHtml(state.home.box1Title)}</h3>
              <p class="text-xs uppercase tracking-wider text-[#6B6B6B] mb-6">House of the People · Parliamentary Simulation</p>
              <div class="p-4 bg-[#FAF8F5] border-l-2 border-[#1F3D33] mb-6">
                <span class="block text-xs font-bold uppercase text-[#1F3D33] mb-1">Official Agenda</span>
                <p class="text-sm text-[#2B2B2B] leading-relaxed">${escapeHtml(state.home.box1Agenda)}</p>
              </div>
            </div>
            <button onclick="showPage('agendas')" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1F3D33] text-white text-sm font-medium rounded-sm hover:bg-[#162c25]">
              ${escapeHtml(state.home.box1ButtonText)}
            </button>
          </div>

          <div class="card-subtle p-8 rounded-sm flex flex-col justify-between hover:border-[#B08D57] transition-colors">
            <div>
              <span class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[#B08D57]/15 text-[#8b6932] rounded-xs">All-Party Consultation</span>
              <h3 class="font-heading text-4xl font-bold text-[#1F3D33] mt-3 mb-2">${escapeHtml(state.home.box2Title)}</h3>
              <p class="text-xs uppercase tracking-wider text-[#6B6B6B] mb-6">All India Political Parties Meet</p>
              <div class="p-4 bg-[#FAF8F5] border-l-2 border-[#B08D57] mb-6">
                <span class="block text-xs font-bold uppercase text-[#8b6932] mb-1">Official Agenda</span>
                <p class="text-sm text-[#2B2B2B] leading-relaxed">${escapeHtml(state.home.box2Agenda)}</p>
              </div>
            </div>
            <button onclick="showPage('agendas')" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1F3D33] text-white text-sm font-medium rounded-sm hover:bg-[#162c25]">
              ${escapeHtml(state.home.box2ButtonText)}
            </button>
          </div>
        </div>

        <div class="mt-16 pt-8 border-t border-[#E5E0D8] flex justify-end">
          <button onclick="showPage('about')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: About →</button>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="view-about" class="page-view hidden space-y-12 max-w-4xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-4">${escapeHtml(state.about.heading)}</h1>
        <p class="text-lg text-[#2B2B2B] italic font-serif max-w-3xl mx-auto">&quot;${escapeHtml(state.about.text)}&quot;</p>
      </div>

      <div class="card-subtle p-8 rounded-sm">
        <h2 class="font-heading text-2xl font-bold text-[#1F3D33] text-center mb-6">Core Principles</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          ${state.about.corePrinciples.map(p => `<div class="p-4 border border-[#E5E0D8] rounded"><h3 class="font-bold text-[#1F3D33]">${escapeHtml(p)}</h3></div>`).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card-subtle p-6 rounded-sm">
          <h3 class="font-heading text-xl font-bold text-[#1F3D33] mb-3">How to Address the Chair</h3>
          <p class="text-sm mb-2">Lok Sabha: <strong class="text-[#1F3D33]">&quot;${escapeHtml(state.about.addressLokSabha)}&quot;</strong></p>
          <p class="text-sm mb-4">AIPPM: <strong class="text-[#8b6932]">&quot;${escapeHtml(state.about.addressAippm)}&quot;</strong></p>
        </div>
        <div class="card-subtle p-6 rounded-sm">
          <h3 class="font-heading text-xl font-bold text-[#1F3D33] mb-3">What to Bring</h3>
          <p class="text-sm text-[#2B2B2B]">${escapeHtml(state.about.whatToBring)}</p>
        </div>
      </div>

      <div class="card-subtle p-6 rounded-sm">
        <h3 class="font-heading text-2xl font-bold text-[#1F3D33] mb-4">Parliamentary Glossary</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          ${state.about.glossary.map(g => `<div class="p-3 border border-[#E5E0D8] rounded"><strong>${escapeHtml(g.term)}:</strong> ${escapeHtml(g.definition)}</div>`).join('')}
        </div>
      </div>

      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('agendas')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Agendas →</button>
      </div>
    </section>

    <!-- AGENDAS -->
    <section id="view-agendas" class="page-view hidden space-y-12 max-w-5xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Chamber Agendas</h1>
        <p class="text-sm text-[#6B6B6B]">Outcome Document: <strong>${escapeHtml(state.agendas.outcomeDocumentType)}</strong></p>
      </div>
      <div class="space-y-8">
        <div class="card-subtle p-8 rounded-sm">
          <h2 class="font-heading text-3xl font-bold text-[#1F3D33] mb-3">Lok Sabha</h2>
          <p class="text-base text-[#2B2B2B] leading-relaxed mb-6">${escapeHtml(state.agendas.lokSabhaAgenda)}</p>
          <h4 class="text-xs font-bold uppercase tracking-wider text-[#1F3D33] mb-2">Session Flow:</h4>
          <ol class="list-decimal pl-5 space-y-1 text-sm text-[#6B6B6B]">
            ${state.agendas.lokSabhaFlow.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
          </ol>
        </div>

        <div class="card-subtle p-8 rounded-sm">
          <h2 class="font-heading text-3xl font-bold text-[#1F3D33] mb-3">AIPPM</h2>
          <p class="text-base text-[#2B2B2B] leading-relaxed mb-6">${escapeHtml(state.agendas.aippmAgenda)}</p>
          <h4 class="text-xs font-bold uppercase tracking-wider text-[#1F3D33] mb-2">Session Flow:</h4>
          <ol class="list-decimal pl-5 space-y-1 text-sm text-[#6B6B6B]">
            ${state.agendas.aippmFlow.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
          </ol>
        </div>
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('schedule')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Schedule →</button>
      </div>
    </section>

    <!-- SCHEDULE -->
    <section id="view-schedule" class="page-view hidden space-y-12 max-w-5xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Official Schedule</h1>
        <p class="text-lg font-serif text-[#B08D57] italic">${escapeHtml(state.schedule.header)}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card-subtle p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold text-[#1F3D33] mb-4">Lok Sabha</h2>
          <div class="space-y-3">
            ${state.schedule.lokSabhaSlots.map(s => `
              <div class="p-3 border border-[#E5E0D8] rounded flex justify-between items-center">
                <span class="font-medium">${escapeHtml(s.label)}</span>
                <span class="text-sm text-[#6B6B6B]">${escapeHtml(s.time || 'Time TBD')}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card-subtle p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold text-[#1F3D33] mb-4">AIPPM</h2>
          <div class="space-y-3">
            ${state.schedule.aippmSlots.map(s => `
              <div class="p-3 border border-[#E5E0D8] rounded flex justify-between items-center">
                <span class="font-medium">${escapeHtml(s.label)}</span>
                <span class="text-sm text-[#6B6B6B]">${escapeHtml(s.time || 'Time TBD')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('team')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Team →</button>
      </div>
    </section>

    <!-- TEAM -->
    <section id="view-team" class="page-view hidden space-y-12 max-w-6xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Organizing Secretariat & Executive Board</h1>
        <p class="text-sm text-[#6B6B6B]">ZHS Youth Parliament for Action and Change</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${state.team.map(m => `
          <div class="card-subtle p-5 rounded-sm flex items-start space-x-4">
            <div class="w-16 h-16 rounded-sm bg-[#1F3D33] text-white flex items-center justify-center font-heading text-xl font-bold shrink-0">
              ${escapeHtml(m.name ? m.name.charAt(0) : m.role.charAt(0))}
            </div>
            <div>
              <h3 class="font-heading text-lg font-bold text-[#1F3D33] leading-snug">${escapeHtml(m.role)}</h3>
              <p class="text-sm font-medium text-[#B08D57]">${escapeHtml(m.name || 'To Be Announced')}</p>
              <p class="text-xs text-[#6B6B6B] mt-1">${escapeHtml(m.description || '')}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('resources')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Resources →</button>
      </div>
    </section>

    <!-- RESOURCES -->
    <section id="view-resources" class="page-view hidden space-y-12 max-w-5xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Delegate Resources</h1>
        <p class="text-sm text-[#6B6B6B]">Official briefing documents and parliamentary guides</p>
      </div>
      <div class="space-y-6">
        ${state.resources.map(r => `
          <div class="card-subtle p-6 rounded-sm">
            <h3 class="font-heading text-2xl font-bold text-[#1F3D33] mb-2">${escapeHtml(r.title)}</h3>
            <p class="text-sm text-[#2B2B2B] leading-relaxed whitespace-pre-line">${escapeHtml(r.content)}</p>
          </div>
        `).join('')}
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('updates')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Updates →</button>
      </div>
    </section>

    <!-- UPDATES -->
    <section id="view-updates" class="page-view hidden space-y-12 max-w-4xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Official Bulletins & Updates</h1>
        <p class="text-sm text-[#6B6B6B]">Chronological parliamentary notices</p>
      </div>
      <div class="space-y-6">
        ${state.updates.map(u => `
          <div class="card-subtle p-6 rounded-sm">
            <div class="text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-1">${escapeHtml(u.date)}</div>
            <h3 class="font-heading text-2xl font-bold text-[#1F3D33] mb-2">${escapeHtml(u.title)}</h3>
            <p class="text-sm text-[#2B2B2B]">${escapeHtml(u.content)}</p>
          </div>
        `).join('')}
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('gallery')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Gallery →</button>
      </div>
    </section>

    <!-- GALLERY -->
    <section id="view-gallery" class="page-view hidden space-y-12 max-w-5xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Session Gallery</h1>
        <p class="text-sm text-[#6B6B6B]">Photography from parliamentary proceedings</p>
      </div>
      <div class="card-subtle p-12 text-center rounded-sm">
        <p class="text-base text-[#6B6B6B]">Photographs will be uploaded by the Media Secretariat during the session on 14 November.</p>
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('contact')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Next: Contact →</button>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="view-contact" class="page-view hidden space-y-12 max-w-5xl mx-auto">
      <div class="text-center">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] mb-2">Contact Secretariat</h1>
        <p class="text-sm text-[#6B6B6B]">Official correspondence and role-wise contacts</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h2 class="font-heading text-2xl font-bold text-[#1F3D33]">Role-Wise Contacts</h2>
          ${state.contact.roleContacts.map(c => `
            <div class="card-subtle p-4 rounded-sm">
              <h3 class="font-bold text-[#1F3D33] text-sm">${escapeHtml(c.role)}</h3>
              <p class="text-xs text-[#6B6B6B] mb-1">${escapeHtml(c.responsibility)}</p>
              <p class="text-xs text-[#2B2B2B]"><strong>${escapeHtml(c.name)}</strong> · ${escapeHtml(c.email)}</p>
            </div>
          `).join('')}
        </div>
        <div class="card-subtle p-6 rounded-sm">
          <h2 class="font-heading text-2xl font-bold text-[#1F3D33] mb-4">Official Inquiries</h2>
          <p class="text-sm text-[#6B6B6B] mb-2">Email: <strong class="text-[#1F3D33]">${escapeHtml(state.contact.officialEmail)}</strong></p>
          <p class="text-sm text-[#6B6B6B]">Venue: <strong class="text-[#1F3D33]">${escapeHtml(state.contact.venue)}</strong></p>
        </div>
      </div>
      <div class="pt-8 border-t border-[#E5E0D8] flex justify-end">
        <button onclick="showPage('home')" class="font-heading text-lg font-medium text-[#1F3D33] hover:text-[#B08D57]">Back to Home ⟲</button>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-[#FAF8F5] border-t border-[#E5E0D8] mt-auto py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
      <div class="font-heading text-xl font-bold text-[#1F3D33]">${escapeHtml(state.branding.schoolName)}</div>
      <div class="text-xs uppercase tracking-widest text-[#6B6B6B]">${escapeHtml(state.branding.eventName)} · 14 November · 9:00 AM – 2:00 PM</div>
      <div class="text-xs text-[#6B6B6B]">Official Contact: <a href="mailto:${escapeHtml(state.contact.officialEmail)}" class="underline text-[#1F3D33]">${escapeHtml(state.contact.officialEmail)}</a></div>
    </div>
  </footer>

  <!-- Admin Login Modal -->
  <div id="loginModal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-[#FAF8F5] border border-[#E5E0D8] rounded-sm p-6 max-w-sm w-full space-y-4 shadow-xl">
      <h3 class="font-heading text-2xl font-bold text-[#1F3D33]">Admin Login</h3>
      <div>
        <label class="block text-xs font-semibold text-[#6B6B6B] mb-1">Username</label>
        <input type="text" id="adminUser" class="w-full px-3 py-2 border border-[#E5E0D8] rounded text-sm bg-white" placeholder="xyz">
      </div>
      <div>
        <label class="block text-xs font-semibold text-[#6B6B6B] mb-1">Password</label>
        <input type="password" id="adminPass" class="w-full px-3 py-2 border border-[#E5E0D8] rounded text-sm bg-white" placeholder="••••">
      </div>
      <div id="loginError" class="hidden text-xs text-red-600 font-semibold">Invalid credentials. Use xyz / b1234</div>
      <div class="flex justify-end space-x-2 pt-2">
        <button onclick="closeLoginModal()" class="px-3 py-1.5 text-xs border border-[#E5E0D8] rounded">Cancel</button>
        <button onclick="attemptLogin()" class="px-4 py-1.5 text-xs bg-[#1F3D33] text-white rounded font-semibold">Login</button>
      </div>
    </div>
  </div>

  <script>
    function showPage(pageId) {
      document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
      const activeEl = document.getElementById('view-' + pageId);
      if (activeEl) activeEl.classList.remove('hidden');

      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.page === pageId) {
          btn.className = 'nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#1F3D33] font-semibold border-b-2 border-[#1F3D33]';
        } else {
          btn.className = 'nav-btn px-3 py-1.5 text-sm font-medium rounded-sm text-[#6B6B6B] hover:text-[#1F3D33]';
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openLoginModal() {
      document.getElementById('loginModal').classList.remove('hidden');
    }
    function closeLoginModal() {
      document.getElementById('loginModal').classList.add('hidden');
      document.getElementById('loginError').classList.add('hidden');
    }
    function attemptLogin() {
      const u = document.getElementById('adminUser').value;
      const p = document.getElementById('adminPass').value;
      if (u === 'xyz' && p === 'b1234') {
        document.getElementById('adminBar').classList.remove('hidden');
        document.getElementById('adminLoginBtn').innerText = 'Admin Active';
        closeLoginModal();
      } else {
        document.getElementById('loginError').classList.remove('hidden');
      }
    }
    function logoutAdmin() {
      document.getElementById('adminBar').classList.add('hidden');
      document.getElementById('adminLoginBtn').innerText = 'Admin Access';
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
