
'use server';
/**
 * @fileOverview AI chat flow with web search capabilities.
 *
 * - chat - A function that handles the chat process.
 */

import { ai } from '@/ai/genkit';
import { type ChatInput, type ChatOutput, ChatInputSchema, ChatOutputSchema } from '@/ai/schemas/chat';
import { z } from 'zod';


export async function chat(input: ChatInput): Promise<ChatOutput> {
  const searchTheWeb = ai.defineTool(
    {
      name: 'searchTheWeb',
      description: 'Searches the web for the given query.',
      inputSchema: z.object({
        query: z.string().describe('The search query.'),
      }),
      outputSchema: z.string().describe('The search results in a stringified JSON format.'),
    },
    async (input) => {
      // In a real application, you would implement a web search here.
      // For now, we'll return some mock data.
      console.log(`Searching the web for: ${input.query}`);
      if (input.query.toLowerCase().includes('tesla stock')) {
          return JSON.stringify({
              result: "Tesla (TSLA) is currently trading at around $180. Recent news indicates a push towards autonomous driving technology, but also increased competition from other EV manufacturers."
          });
      }
      return JSON.stringify({ result: 'No specific information found. General market sentiment is mixed.' });
    }
  );

  const chatPrompt = ai.definePrompt({
      name: 'chatPrompt',
      input: { schema: ChatInputSchema },
      output: { schema: ChatOutputSchema },
      tools: [searchTheWeb],
      prompt: `You are a friendly and helpful financial assistant for the FinLight app.
Your goal is to provide insightful and accurate information about financial markets, stocks, and investment strategies.

About FinLight:
FinLight is a powerful platform that provides AI-powered tools for financial analysis and investment. Our main products include an AI Portfolio Analyst, Market Sentiment AI, a Robo-Advisor, Predictive Market Trend analysis, Fraud Detection, and AI-Powered Credit Scoring. We connect users with top brokers and a vibrant community of traders.

Use the tools available to you to find real-time information to answer the user's question.
If the user asks about FinLight, use the information provided above.
If you don't know the answer, say that you don't know.

User's message: {{{message}}}
`,
  });

  const chatFlow = ai.defineFlow(
    {
      name: 'chatFlow',
      inputSchema: ChatInputSchema,
      outputSchema: ChatOutputSchema,
    },
    async (input) => {
      const { output } = await chatPrompt(input);
      if (!output) {
          return { response: "I'm sorry, I couldn't generate a response." };
      }
      return { response: output.response };
    }
  );

  return chatFlow(input);
}
