
'use server';
/**
 * @fileOverview An AI agent that specializes in customer service tasks.
 *
 * - runCustomerServiceAgent - A function that executes a customer service task based on context.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { CustomerServiceAgentInputSchema, CustomerServiceAgentOutputSchema, type CustomerServiceAgentInput, type CustomerServiceAgentOutput } from '../schemas/customer-service-agent';

export async function runCustomerServiceAgent(input: CustomerServiceAgentInput): Promise<CustomerServiceAgentOutput> {

  const customerServiceAgentPrompt = ai.definePrompt({
    name: 'customerServiceAgentPrompt',
    input: { schema: CustomerServiceAgentInputSchema },
    output: { schema: CustomerServiceAgentOutputSchema },
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are an expert AI Customer Service Agent for FinLight. You are empathetic, knowledgeable, and efficient.

**Your Goal:** Resolve customer issues quickly and accurately. Use the provided context to inform your response.

**Customer Service Context & Knowledge Base:**
{{{ticketContext}}}

**Customer's Current Message:**
{{{customerQuery}}}

**Your Task:**
1.  **Analyze Sentiment:** Read the customer's message and gauge their sentiment (e.g., frustrated, confused, neutral).
2.  **Consult Context:** Review the ticket history and knowledge base provided.
3.  **Formulate a Response:**
    *   Acknowledge the customer's issue and show empathy.
    *   If the answer is in the knowledge base, provide the solution clearly.
    *   If the issue is new or requires human intervention, explain the next steps clearly. State that you will escalate the ticket to a human agent who will get back to them.
    *   Maintain a helpful and professional tone.
    *   Format your response using Markdown for readability.
`,
  });

  const agentFlow = ai.defineFlow(
    {
      name: 'customerServiceAgentFlow',
      inputSchema: CustomerServiceAgentInputSchema,
      outputSchema: CustomerServiceAgentOutputSchema,
    },
    async (input) => {
      const { output } = await customerServiceAgentPrompt(input);
      if (!output) {
        throw new Error("The customer service agent failed to generate a response.");
      }
      return output;
    }
  );

  return agentFlow(input);
}
