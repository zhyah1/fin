/**
 * @fileOverview Zod schemas for the AI chat flow.
 *
 * - ChatInputSchema - The Zod schema for the chat input.
 * - ChatInput - The TypeScript type for the chat input.
 * - ChatOutputSchema - The Zod schema for the chat output.
 * - ChatOutput - The TypeScript type for the chat output.
 */

import { z } from 'zod';

export const ChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
