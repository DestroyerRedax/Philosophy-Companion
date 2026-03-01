/**
 * @fileOverview Core data models for the Philosophy Companion application.
 * These interfaces ensure strict typing across the data and UI layers.
 */

export interface Question {
  id?: string;
  question: string;
  answer: string;
}

export interface Unit {
  title: string;
  questions: Question[];
}

export interface Subject {
  code: string;
  name: string;
  units: Unit[];
}
