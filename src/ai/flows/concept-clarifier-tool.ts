'use server';
/**
 * @fileOverview A Genkit flow for clarifying philosophical terms and concepts.
 *
 * - clarifyConcept - A function that takes a philosophical concept and returns a concise explanation.
 * - ClarifyConceptInput - The input type for the clarifyConcept function.
 * - ClarifyConceptOutput - The return type for the clarifyConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClarifyConceptInputSchema = z.object({
  concept: z.string().describe('The philosophical term or concept to clarify.'),
});
export type ClarifyConceptInput = z.infer<typeof ClarifyConceptInputSchema>;

const ClarifyConceptOutputSchema = z.object({
  explanation: z.string().describe('A concise and clear explanation of the concept.'),
});
export type ClarifyConceptOutput = z.infer<typeof ClarifyConceptOutputSchema>;

export async function clarifyConcept(
  input: ClarifyConceptInput
): Promise<ClarifyConceptOutput> {
  return clarifyConceptFlow(input);
}

const clarifyConceptPrompt = ai.definePrompt({
  name: 'clarifyConceptPrompt',
  input: {schema: ClarifyConceptInputSchema},
  output: {schema: ClarifyConceptOutputSchema},
  prompt: `You are an expert in philosophy, providing concise and clear explanations.

Explain the following philosophical term or concept in a concise and clear manner, focusing on its core meaning and significance:

Concept: {{{concept}}}`,
});

const clarifyConceptFlow = ai.defineFlow(
  {
    name: 'clarifyConceptFlow',
    inputSchema: ClarifyConceptInputSchema,
    outputSchema: ClarifyConceptOutputSchema,
  },
  async input => {
    const {output} = await clarifyConceptPrompt(input);
    return output!;
  }
);
