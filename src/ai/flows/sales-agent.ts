
'use server';
/**
 * @fileOverview An AI agent that specializes in sales tasks.
 *
 * - runSalesAgent - A function that executes a sales task based on context.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { SalesAgentInputSchema, SalesAgentOutputSchema, type SalesAgentInput, type SalesAgentOutput } from '../schemas/sales-agent';

export async function runSalesAgent(input: SalesAgentInput): Promise<SalesAgentOutput> {

  const salesAgentPrompt = ai.definePrompt({
    name: 'salesAgentPrompt',
    input: { schema: SalesAgentInputSchema },
    output: { schema: SalesAgentOutputSchema },
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are an expert AI Sales Agent. You are highly skilled at drafting compelling emails, creating effective sales strategies, and generating leads.

**Sales Context:**
{{{salesContext}}}

**Your Task:**
{{{task}}}

Based on the provided context and task, generate a professional, persuasive, and actionable response. If asked for an email, write the full email including subject and body. If asked for a strategy, provide clear, actionable steps.
`,
  });

  const agentFlow = ai.defineFlow(
    {
      name: 'salesAgentFlow',
      inputSchema: SalesAgentInputSchema,
      outputSchema: SalesAgentOutputSchema,
    },
    async (input) => {
      const { output } = await salesAgentPrompt(input);
      if (!output) {
        throw new Error("The sales agent failed to generate a response.");
      }
      return output;
    }
  );

  return agentFlow(input);
}
