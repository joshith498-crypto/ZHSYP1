/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyAdminCredentials,
  getNextPage,
  calculateCountdown,
  sortUpdatesNewestFirst,
  PAGE_ORDER,
} from './logic';
import { UpdateItem } from '../types';

test('verifyAdminCredentials accepts Zhs and Zhs@2026 strictly', () => {
  assert.equal(verifyAdminCredentials('Zhs', 'Zhs@2026'), true);
  assert.equal(verifyAdminCredentials(' Zhs ', 'Zhs@2026'), true); // trimmed
  assert.equal(verifyAdminCredentials('admin', 'Zhs@2026'), false);
  assert.equal(verifyAdminCredentials('Zhs', 'wrongpass'), false);
  assert.equal(verifyAdminCredentials('', ''), false);
});

test('getNextPage cycles seamlessly through all 9 pages without dead ends', () => {
  assert.equal(getNextPage('home'), 'about');
  assert.equal(getNextPage('about'), 'agendas');
  assert.equal(getNextPage('agendas'), 'schedule');
  assert.equal(getNextPage('schedule'), 'team');
  assert.equal(getNextPage('team'), 'resources');
  assert.equal(getNextPage('resources'), 'updates');
  assert.equal(getNextPage('updates'), 'gallery');
  assert.equal(getNextPage('gallery'), 'contact');
  assert.equal(getNextPage('contact'), 'home'); // loops back cleanly
});

test('calculateCountdown accurately breaks down future dates', () => {
  const target = new Date('2026-11-14T09:00:00Z');
  const now = new Date('2026-11-13T09:00:00Z'); // exactly 1 day earlier
  const result = calculateCountdown(target.toISOString(), now);

  assert.equal(result.isPast, false);
  assert.equal(result.days, 1);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('calculateCountdown marks past dates as isPast: true', () => {
  const target = new Date('2026-11-14T09:00:00Z');
  const pastTime = new Date('2026-11-15T09:00:00Z');
  const result = calculateCountdown(target.toISOString(), pastTime);

  assert.equal(result.isPast, true);
  assert.equal(result.days, 0);
  assert.equal(result.totalSeconds, 0);
});

test('sortUpdatesNewestFirst prioritizes pinned items and latest dates', () => {
  const sampleUpdates: UpdateItem[] = [
    { id: '1', date: '2026-10-01', title: 'Older update', text: 'Old' },
    { id: '2', date: '2026-10-25', title: 'Newer update', text: 'New' },
    { id: '3', date: '2026-09-15', title: 'Pinned old', text: 'Pinned', isPinned: true },
  ];

  const sorted = sortUpdatesNewestFirst(sampleUpdates);
  assert.equal(sorted[0].id, '3'); // pinned first
  assert.equal(sorted[1].id, '2'); // newer date next
  assert.equal(sorted[2].id, '1'); // older date last
});
