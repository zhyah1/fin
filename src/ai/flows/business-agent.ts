
'use server';
/**
 * @fileOverview An AI agent that automates various business processes.
 *
 * - runAgent - A function that executes a business task based on context.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { BusinessAgentInputSchema, BusinessAgentOutputSchema, type BusinessAgentInput, type BusinessAgentOutput } from '../schemas/business-agent';

export async function runAgent(input: BusinessAgentInput): Promise<BusinessAgentOutput> {

  const agentPrompt = ai.definePrompt({
    name: 'businessAgentPrompt',
    input: { schema: BusinessAgentInputSchema },
    output: { schema: BusinessAgentOutputSchema },
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are a highly capable AI Business Process Agent. You can perform tasks related to sales, customer service, data analysis, and reporting.

**Business Context:**
{{{businessContext}}}

**User's Request:**
{{{request}}}

Based on the context and request, generate a professional and actionable response. For example, if asked to write a sales email, draft the email. If asked for a report, summarize the data. If asked to handle a customer query, provide a helpful response.
`,
  });

  const agentFlow = ai.defineFlow(
    {
      name: 'agentFlow',
      inputSchema: BusinessAgentInputSchema,
      outputSchema: BusinessAgentOutputSchema,
    },
    async (input) => {
      const { output } = await agentPrompt(input);
      if (!output) {
        throw new Error("The agent failed to generate a response.");
      }
      return output;
    }
  );

  return agentFlow(input);
}
