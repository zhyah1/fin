
/**
 * @fileOverview Zod schemas for the Customer Service Agent flow.
 */

import { z } from 'zod';

export const CustomerServiceAgentInputSchema = z.object({
  ticketContext: z.string().describe('Detailed context about the customer ticket, including history and relevant knowledge base articles.'),
  customerQuery: z.string().describe('The latest message or query from the customer.'),
});
export type CustomerServiceAgentInput = z.infer<typeof CustomerServiceAgentInputSchema>;

export const CustomerServiceAgentOutputSchema = z.object({
  response: z.string().describe('The generated response from the AI customer service agent, formatted in Markdown.'),
});
export type CustomerServiceAgentOutput = z.infer<typeof CustomerServiceAgentOutputSchema>;
