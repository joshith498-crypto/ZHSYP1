/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DEFAULT_APP_DATA } from '../data/defaultData';
import { AppData, PageId, UpdateItem } from '../types';

export const ADMIN_USERNAME = 'xyz';
export const ADMIN_PASSWORD = 'b1234';
export const STORAGE_KEY = 'zypac_app_state_v2';
export const ADMIN_AUTH_KEY = 'zypac_admin_session_v1';

export const PAGE_ORDER: PageId[] = [
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

export const PAGE_TITLES: Record<PageId, string> = {
  home: 'Home',
  about: 'About',
  agendas: 'Agendas',
  schedule: 'Schedule',
  team: 'Team',
  resources: 'Resources',
  updates: 'Updates',
  gallery: 'Gallery',
  contact: 'Contact',
};

/**
 * Verify admin credentials strictly matching requirements:
 * Username: xyz, Password: b1234
 */
export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (!user || !pass) return false;
  return user.trim() === ADMIN_USERNAME && pass === ADMIN_PASSWORD;
}

/**
 * Given the current page, returns the next page in the defined sequence:
 * Home → About → Agendas → Schedule → Team → Resources → Updates → Gallery → Contact → Home
 */
export function getNextPage(currentPage: PageId): PageId {
  const currentIndex = PAGE_ORDER.indexOf(currentPage);
  if (currentIndex === -1 || currentIndex === PAGE_ORDER.length - 1) {
    return PAGE_ORDER[0];
  }
  return PAGE_ORDER[currentIndex + 1];
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

/**
 * Calculates remaining time until target event timestamp
 */
export function calculateCountdown(targetDateStr: string, customNow?: Date): CountdownResult {
  const target = new Date(targetDateStr).getTime();
  const now = customNow ? customNow.getTime() : Date.now();
  const diffMs = target - now;

  if (diffMs <= 0 || isNaN(diffMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPast: false,
  };
}

/**
 * Sorts updates so newest items appear first
 */
export function sortUpdatesNewestFirst(updates: UpdateItem[]): UpdateItem[] {
  return [...updates].sort((a, b) => {
    // Pinned updates take priority, then compare date
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

/**
 * Safe load from localStorage with fallback to DEFAULT_APP_DATA
 */
export function loadStoredAppData(): AppData {
  if (typeof window === 'undefined') {
    return DEFAULT_APP_DATA;
  }
  // Check if an embedded or preloaded app data exists in the page (for published deployments)
  const embedded = (window as unknown as { __INITIAL_ZYPAC_DATA__?: AppData }).__INITIAL_ZYPAC_DATA__;
  const baseData = embedded && typeof embedded === 'object' && embedded.home ? embedded : DEFAULT_APP_DATA;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return baseData;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.home || !parsed.schedule) {
      return baseData;
    }
    // Ensure branding exists
    if (!parsed.branding) {
      parsed.branding = baseData.branding;
    }
    return parsed as AppData;
  } catch {
    return baseData;
  }
}

/**
 * Safe save to localStorage
 */
export function saveStoredAppData(data: AppData): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save ZYPAC data to localStorage:', err);
    return false;
  }
}

/**
 * Reset localStorage to pristine default data
 */
export function resetStoredAppData(): AppData {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return DEFAULT_APP_DATA;
}
