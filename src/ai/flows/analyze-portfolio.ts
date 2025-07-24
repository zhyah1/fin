
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

  const AnalyzePortfolioOutputSchema = z.object({
    analysis: z.string().describe('The AI-generated analysis of the portfolio.'),
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
    output: { schema: AnalyzePortfolioOutputSchema, format: 'json' },
    tools: [getStockInfo],
    prompt: `You are an expert financial analyst. A user has provided a list of stock tickers in their portfolio.
Provide a brief analysis of the portfolio.
For each stock, use the available tools to get its information.
Based on the stocks provided, identify potential risks and suggest potential opportunities for diversification or growth.
Format the analysis content in Markdown.

Your final output must be a JSON object with a single key "analysis" containing your markdown-formatted response.

User's stocks: {{{stocks}}}
`,
  });

  const analysisFlow = ai.defineFlow(
    {
      name: 'analysisFlow',
      inputSchema: AnalyzePortfolioInputSchema,
      outputSchema: AnalyzePortfolioOutputSchema,
    },
    async (input) => {
      const { output } = await analysisPrompt(input);
      if (!output) {
        return { analysis: "I'm sorry, I couldn't generate an analysis for your portfolio." };
      }
      return output;
    }
  );

  return analysisFlow(input);
}
