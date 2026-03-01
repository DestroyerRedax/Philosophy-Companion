/**
 * @fileOverview Storage service for Bookmarks and Last Read functionality.
 * Uses localStorage for offline-first persistence.
 */

import { SearchResult } from './search-service';

const BOOKMARKS_KEY = 'phil_companion_bookmarks';
const LAST_READ_KEY = 'phil_companion_last_read';

export function getBookmarks(): SearchResult[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(BOOKMARKS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleBookmark(item: SearchResult): boolean {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex((b) => b.question === item.question);
  
  let isAdded = false;
  if (index >= 0) {
    bookmarks.splice(index, 1);
    isAdded = false;
  } else {
    bookmarks.push(item);
    isAdded = true;
  }
  
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  return isAdded;
}

export function isBookmarked(question: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some((b) => b.question === question);
}

export function setLastRead(item: SearchResult) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_READ_KEY, JSON.stringify(item));
}

export function getLastRead(): SearchResult | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(LAST_READ_KEY);
  return stored ? JSON.parse(stored) : null;
}
