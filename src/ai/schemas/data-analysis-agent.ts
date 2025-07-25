
/**
 * @fileOverview Zod schemas for the Data Analysis Agent flow.
 */

import { z } from 'zod';

export const DataAnalysisAgentInputSchema = z.object({
  dataContext: z.string().describe('The data to be analyzed, provided in a string format (e.g., CSV, JSON, or natural language).'),
  analysisRequest: z.string().describe('The specific analysis or question the user has about the data.'),
});
export type DataAnalysisAgentInput = z.infer<typeof DataAnalysisAgentInputSchema>;

export const DataAnalysisAgentOutputSchema = z.object({
  analysis: z.string().describe('The generated analysis or answer, formatted in Markdown.'),
});
export type DataAnalysisAgentOutput = z.infer<typeof DataAnalysisAgentOutputSchema>;
