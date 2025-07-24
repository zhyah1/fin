
'use server';
/**
 * @fileOverview A portfolio analysis AI agent.
 *
 * - analyzePortfolio - A function that handles the portfolio analysis process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function analyzePortfolio(input: { stocks: string; }): Promise<{ analysis: string; }> {
  const AnalyzePortfolioInputSchema = z.object({
    stocks: z.string().describe('A comma-separated list of stock tickers.'),
  });

  const getStockInfo = ai.defineTool(
    {
      name: 'getStockInfo',
      description: 'Gets basic information for a stock ticker, like company name and current price.',
      inputSchema: z.object({
        ticker: z.string().describe('The stock ticker symbol.'),
      }),
      outputSchema: z.object({
        companyName: z.string(),
        price: z.number(),
      }),
    },
    async ({ ticker }) => {
      // Mock data for demonstration
      const mockData: { [key: string]: { companyName: string; price: number } } = {
        'AAPL': { companyName: 'Apple Inc.', price: 175.00 },
        'GOOGL': { companyName: 'Alphabet Inc.', price: 140.00 },
        'TSLA': { companyName: 'Tesla, Inc.', price: 180.00 },
        'MSFT': { companyName: 'Microsoft Corporation', price: 370.00 },
      };
      return mockData[ticker.toUpperCase()] || { companyName: `Unknown Ticker: ${ticker}`, price: 0 };
    }
  );

  const analysisPrompt = ai.definePrompt({
    name: 'portfolioAnalysisPrompt',
    input: { schema: AnalyzePortfolioInputSchema },
    tools: [getStockInfo],
    prompt: `You are an expert financial analyst. A user has provided a list of stock tickers in their portfolio.
Provide a brief analysis of the portfolio.
For each stock, use the available tools to get its information.
Based on the stocks provided, identify potential risks and suggest potential opportunities for diversification or growth.
Format the entire analysis as a single Markdown block.

User's stocks: {{{stocks}}}
`,
  });

  const analysisFlow = ai.defineFlow(
    {
      name: 'analysisFlow',
      inputSchema: AnalyzePortfolioInputSchema,
      outputSchema: z.string(),
    },
    async (input) => {
      const { text } = await analysisPrompt(input);
      return text;
    }
  );

  const analysisResult = await analysisFlow(input);
  return { analysis: analysisResult };
}
