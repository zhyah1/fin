
'use server';
/**
 * @fileOverview A market sentiment analysis AI agent.
 *
 * - analyzeMarketSentiment - A function that handles the sentiment analysis process.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import type { MarketSentimentInput, MarketSentimentOutput } from '../schemas/market-sentiment';
import { MarketSentimentInputSchema, MarketSentimentOutputSchema } from '../schemas/market-sentiment';

export async function analyzeMarketSentiment(input: MarketSentimentInput): Promise<MarketSentimentOutput> {

  const searchTheWebForSentiment = ai.defineTool(
    {
      name: 'searchTheWebForSentiment',
      description: 'Gets recent news headlines for a given financial topic or ticker.',
      inputSchema: z.object({
        query: z.string().describe('The financial topic or ticker to search for.'),
      }),
      outputSchema: z.object({
        headlines: z.array(z.string()).describe('A list of recent news headlines.'),
      }),
    },
    async ({ query }) => {
      // Mock data for demonstration
      console.log(`Searching web for sentiment on: ${query}`);
      const mockHeadlines: { [key: string]: string[] } = {
        'TSLA': [
            "Tesla's new AI chip hailed as a 'game-changer' for autonomous driving.",
            "Analysts raise concerns over Tesla's slowing sales in Q3.",
            "Elon Musk announces ambitious new factory plans in Europe.",
            "Tesla faces increased competition from legacy automakers.",
            "Positive early reviews for the new Tesla Model 3 refresh."
        ],
        'AAPL': [
            "Apple reports record-breaking iPhone sales, beating analyst expectations.",
            "EU regulators launch another antitrust probe into Apple's App Store policies.",
            "Vision Pro headset sees strong initial demand but faces supply constraints.",
            "Analysts optimistic about Apple's long-term growth in services.",
            "Warren Buffett trims Berkshire's stake in Apple."
        ],
        'US HOUSING MARKET': [
            "Fed interest rate hikes continue to cool down the housing market.",
            "Home prices see first nationwide decline in over a decade.",
            "Housing affordability hits all-time low, sidelining first-time buyers.",
            "Rental market remains strong amid high mortgage rates.",
            "Builder confidence ticks up slightly on hopes of future rate cuts."
        ]
      };
      const queryKey = query.toUpperCase();
      const headlines = mockHeadlines[queryKey] || [`No specific news found for "${query}". Market sentiment appears neutral.`];
      return { headlines };
    }
  );

  const sentimentAnalysisPrompt = ai.definePrompt({
    name: 'sentimentAnalysisPrompt',
    input: { schema: MarketSentimentInputSchema },
    output: { 
      schema: MarketSentimentOutputSchema,
      format: 'json' // Explicitly request JSON format
    },
    tools: [searchTheWebForSentiment],
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are an expert financial analyst specializing in market sentiment.
A user has provided a query about a financial topic or stock ticker.

Your task is to:
1. Use the \`searchTheWebForSentiment\` tool to fetch recent news headlines related to the user's query.
2. Analyze the provided headlines to determine the overall market sentiment.
3. Provide a \`sentimentScore\` from -1.0 (very negative) to 1.0 (very positive). A score around 0 indicates neutral sentiment.
4. Write a concise \`summary\` explaining the key drivers of this sentiment, citing the news.
5. Return the original \`keyHeadlines\` you based your analysis on.

IMPORTANT: You must respond with a valid JSON object that matches this exact structure:
{
  "sentimentScore": <number between -1 and 1>,
  "summary": "<string with markdown formatting>",
  "keyHeadlines": ["<headline1>", "<headline2>", ...]
}

User's query: {{{query}}}
`,
  });

  const sentimentAnalysisFlow = ai.defineFlow(
    {
      name: 'sentimentAnalysisFlow',
      inputSchema: MarketSentimentInputSchema,
      outputSchema: MarketSentimentOutputSchema,
    },
    async (input) => {
      try {
        const { output } = await sentimentAnalysisPrompt(input);
        
        if (!output) {
          console.warn("Model returned null output, providing fallback response");
          // Fallback response when model fails
          return {
            sentimentScore: 0,
            summary: "Unable to analyze sentiment due to insufficient data or model error.",
            keyHeadlines: ["No headlines available"]
          };
        }

        // Validate the output structure
        const validatedOutput = MarketSentimentOutputSchema.parse(output);
        return validatedOutput;
        
      } catch (error) {
        console.error("Sentiment analysis error:", error);
        
        // Graceful fallback mechanism if the primary flow fails
        let headlines: string[] = [`No specific news found for "${input.query}". Market sentiment appears neutral.`];
        try {
            const searchResult = await searchTheWebForSentiment(input);
            headlines = searchResult.headlines;
        } catch (searchError) {
            console.error("Fallback search also failed:", searchError);
        }

        // Simple keyword-based sentiment calculation as a last resort
        let sentimentScore = 0;
        const positiveWords = ['positive', 'strong', 'growth', 'beating', 'optimistic', 'game-changer', 'record-breaking', 'hail', 'ambitious'];
        const negativeWords = ['concerns', 'slowing', 'decline', 'cooling', 'probe', 'constraints', 'competition', 'affordability', 'fears'];

        headlines.forEach(headline => {
            const lowerHeadline = headline.toLowerCase();
            positiveWords.forEach(word => {
                if (lowerHeadline.includes(word)) sentimentScore += 0.2;
            });
            negativeWords.forEach(word => {
                if (lowerHeadline.includes(word)) sentimentScore -= 0.2;
            });
        });
        
        sentimentScore = Math.max(-1, Math.min(1, sentimentScore)); // Clamp between -1 and 1
        
        const sentimentDescription = sentimentScore > 0.1 ? 'cautiously optimistic' : sentimentScore < -0.1 ? 'cautiously pessimistic' : 'neutral';
        
        return {
            sentimentScore,
            summary: `A fallback analysis based on keyword matching suggests a **${sentimentDescription}** sentiment for **${input.query}**. This is a simplified assessment due to a primary model error.`,
            keyHeadlines: headlines
        };
      }
    }
  );

  return sentimentAnalysisFlow(input);
}
