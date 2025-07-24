
/**
 * @fileOverview Zod schemas for the Market Sentiment AI flow.
 */

import { z } from 'zod';

export const MarketSentimentInputSchema = z.object({
  query: z.string().describe('The financial topic or ticker to analyze.'),
});
export type MarketSentimentInput = z.infer<typeof MarketSentimentInputSchema>;


export const MarketSentimentOutputSchema = z.object({
    sentimentScore: z.number().min(-1).max(1).describe("A sentiment score from -1.0 (very negative) to 1.0 (very positive)."),
    summary: z.string().describe("A concise summary explaining the key drivers of the sentiment, in Markdown format."),
    keyHeadlines: z.array(z.string()).describe("A list of the key headlines that influenced the sentiment analysis.")
});
export type MarketSentimentOutput = z.infer<typeof MarketSentimentOutputSchema>;
