/**
 * @fileOverview Zod schemas for the Business Process Agent flow.
 */

import { z } from 'zod';

export const BusinessAgentInputSchema = z.object({
  businessContext: z.string().describe('A detailed description of the business, including its products, services, and target market.'),
  request: z.string().describe('The specific task for the AI agent to perform.'),
});
export type BusinessAgentInput = z.infer<typeof BusinessAgentInputSchema>;

export const BusinessAgentOutputSchema = z.object({
  response: z.string().describe('The generated response from the AI agent.'),
});
export type BusinessAgentOutput = z.infer<typeof BusinessAgentOutputSchema>;
