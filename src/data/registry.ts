import { Subject } from '@/types/philosophy';
import { subject_241701 } from './subjects/241701';

/**
 * Subject Registry
 * Central mapping of subject codes to their corresponding data objects.
 * As Phase 3 continues, developers will add more subject imports here.
 */
export const subjectRegistry: Record<string, Subject> = {
  "241701": subject_241701,
  // Placeholder keys for UI consistency during development
  "241703": { code: "241703", name: "Epistemology", units: [] },
  "241705": { code: "241705", name: "Ethics", units: [] },
  "241707": { code: "241707", name: "Logic", units: [] },
  "241709": { code: "241709", name: "Aesthetics", units: [] },
  "241711": { code: "241711", name: "Political Philosophy", units: [] },
  "241713": { code: "241713", name: "Philosophy of Mind", units: [] },
  "241715": { code: "241715", name: "Philosophy of Science", units: [] },
  "241717": { code: "241717", name: "Existentialism", units: [] },
};
