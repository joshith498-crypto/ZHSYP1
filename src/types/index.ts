/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'about'
  | 'agendas'
  | 'schedule'
  | 'team'
  | 'resources'
  | 'updates'
  | 'gallery'
  | 'contact';

export interface ChamberBox {
  title: string;
  subtitle: string;
  agendaText: string;
  themeBadge: string;
}

export interface HomeData {
  heroHeading: string;
  heroTagline: string;
  eventDate: string; // ISO date string e.g. "2026-11-14T09:00:00"
  eventTimeDisplay: string;
  stats: {
    stat1: string;
    label1: string;
    stat2: string;
    label2: string;
    stat3: string;
    label3: string;
  };
  visionLine: string;
  newsTicker: string;
  lokSabhaBox: ChamberBox;
  aippmBox: ChamberBox;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface AboutData {
  heading: string;
  introText: string;
  corePrinciples: string[];
  glossary: GlossaryItem[];
  addressingChair: {
    lokSabha: string;
    aippm: string;
    guideline: string;
  };
  whatToBring: string[];
}

export interface AgendaSessionFlow {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ChamberAgenda {
  chamberName: string;
  fullTitle: string;
  agendaText: string;
  backgroundContext: string;
  sessionFlow: AgendaSessionFlow[];
  documentDeliverable: string;
}

export interface AgendasData {
  lokSabha: ChamberAgenda;
  aippm: ChamberAgenda;
}

export interface ScheduleSlot {
  id: string;
  sessionLabel: string; // "Session 1", "Session 2", etc.
  timeRange: string; // e.g., "09:00 AM – 10:15 AM" or empty
  activityTitle: string;
  notes: string;
}

export interface ScheduleData {
  headerTime: string; // "9:00 AM – 2:00 PM"
  dateDisplay: string;
  venueNote: string;
  lokSabhaSlots: ScheduleSlot[];
  aippmSlots: ScheduleSlot[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  isCore?: boolean;
}

export interface ResourceSection {
  id: string;
  title: string;
  description: string;
  details: string;
  downloadLabel?: string;
  fileUrl?: string;
}

export interface ResourcesData {
  sections: ResourceSection[];
}

export interface UpdateItem {
  id: string;
  date: string;
  title: string;
  text: string;
  isPinned?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category?: string;
}

export interface RoleContact {
  id: string;
  role: string;
  scope: string;
  personName: string;
  email: string;
  phone?: string;
}

export interface ContactData {
  officialEmail: string;
  generalSecretaryName: string;
  schoolAddress: string;
  roleContacts: RoleContact[];
}

export interface SiteBranding {
  schoolName: string; // "ZHS"
  eventName: string; // "ZYPAC"
  eventSubtext: string; // "ZHS · 14 November"
  footerSchoolTitle: string; // "ZHS Youth Parliament"
  footerDescription: string;
  copyrightNotice: string;
  officialEmail: string;
  schoolAddress: string;
}

export interface AppData {
  branding: SiteBranding;
  home: HomeData;
  about: AboutData;
  agendas: AgendasData;
  schedule: ScheduleData;
  team: TeamMember[];
  resources: ResourcesData;
  updates: UpdateItem[];
  gallery: GalleryItem[];
  contact: ContactData;
}
