
/**
 * @fileOverview Zod schemas for the Sales Agent flow.
 */

import { z } from 'zod';

export const SalesAgentInputSchema = z.object({
  salesContext: z.string().describe('A detailed description of the product, target audience, pricing, and unique selling proposition.'),
  task: z.string().describe('The specific sales-related task for the AI agent to perform (e.g., draft an email, create a strategy).'),
});
export type SalesAgentInput = z.infer<typeof SalesAgentInputSchema>;

export const SalesAgentOutputSchema = z.object({
  response: z.string().describe('The generated response from the AI sales agent, formatted in Markdown.'),
});
export type SalesAgentOutput = z.infer<typeof SalesAgentOutputSchema>;
