/**
 * @fileOverview Search logic for the Philosophy Companion.
 * Flattens the nested subject data into a searchable list of entries.
 */

import { subjectRegistry } from '@/data/registry';

export interface SearchResult {
  subjectCode: string;
  subjectName: string;
  unitTitle: string;
  question: string;
  answer: string;
}

/**
 * Searches across all registered subjects, units, and questions.
 * @param query The search string provided by the user.
 * @returns An array of matching SearchResult objects.
 */
export function searchQuestions(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  const results: SearchResult[] = [];

  // Iterate through each subject in the registry
  Object.values(subjectRegistry).forEach((subject) => {
    // Check if the subject name itself matches (though usually we want question-level results)
    const subjectMatches = subject.name.toLowerCase().includes(normalizedQuery);

    subject.units.forEach((unit) => {
      unit.questions.forEach((q) => {
        const questionMatches = q.question.toLowerCase().includes(normalizedQuery);
        const answerMatches = q.answer.toLowerCase().includes(normalizedQuery);
        const unitMatches = unit.title.toLowerCase().includes(normalizedQuery);

        if (subjectMatches || unitMatches || questionMatches || answerMatches) {
          results.push({
            subjectCode: subject.code,
            subjectName: subject.name,
            unitTitle: unit.title,
            question: q.question,
            answer: q.answer,
          });
        }
      });
    });
  });

  return results;
}
