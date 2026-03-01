/**
 * @fileOverview Optimized search logic for the Philosophy Companion.
 * Uses a cached flattened index for high-performance offline lookup.
 */

import { subjectRegistry } from '@/data/registry';

export interface SearchResult {
  subjectCode: string;
  subjectName: string;
  unitTitle: string;
  question: string;
  answer: string;
}

let cachedFlattenedQuestions: SearchResult[] | null = null;

/**
 * Flattens the nested subject registry into a searchable flat array.
 * Results are cached to avoid redundant processing.
 */
function getFlattenedQuestions(): SearchResult[] {
  if (cachedFlattenedQuestions) return cachedFlattenedQuestions;

  const flattened: SearchResult[] = [];

  Object.values(subjectRegistry).forEach((subject) => {
    subject.units.forEach((unit) => {
      unit.questions.forEach((q) => {
        flattened.push({
          subjectCode: subject.code,
          subjectName: subject.name,
          unitTitle: unit.title,
          question: q.question,
          answer: q.answer,
        });
      });
    });
  });

  cachedFlattenedQuestions = flattened;
  return flattened;
}

/**
 * Searches across all registered subjects, units, and questions.
 * Performance optimized for real-time live search.
 */
export function searchQuestions(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  const data = getFlattenedQuestions();

  return data.filter((item) => {
    return (
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery) ||
      item.subjectName.toLowerCase().includes(normalizedQuery) ||
      item.unitTitle.toLowerCase().includes(normalizedQuery) ||
      item.subjectCode.toLowerCase().includes(normalizedQuery)
    );
  });
}
