
'use server';
/**
 * @fileOverview A portfolio analysis AI agent.
 *
 * - analyzePortfolio - A function that handles the portfolio analysis process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the output schema and type here, but do not export them.
const PortfolioAnalysisOutputSchema = z.object({
    portfolioAllocation: z.array(z.object({
        ticker: z.string().describe("Stock ticker symbol."),
        companyName: z.string().describe("The name of the company."),
        price: z.number().describe("The current price of the stock."),
        percentage: z.number().describe("The percentage of this stock in the portfolio."),
    })).describe("The allocation of the portfolio across different stocks."),
    riskAnalysis: z.string().describe("AI-generated analysis of the portfolio's risks, in Markdown format."),
    diversificationOpportunities: z.string().describe("AI-generated suggestions for diversification, in Markdown format."),
    summary: z.string().describe("A general summary of the portfolio analysis, in Markdown format.")
});

export type PortfolioAnalysisOutput = z.infer<typeof PortfolioAnalysisOutputSchema>;

export async function analyzePortfolio(input: { stocks: string; }): Promise<PortfolioAnalysisOutput> {

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
        'AMZN': { companyName: 'Amazon.com, Inc.', price: 185.00 },
        'NVDA': { companyName: 'NVIDIA Corporation', price: 920.00 },
      };
      return mockData[ticker.toUpperCase()] || { companyName: `Unknown Ticker: ${ticker}`, price: 0 };
    }
  );

  const analysisPrompt = ai.definePrompt({
    name: 'portfolioAnalysisPrompt',
    input: { schema: AnalyzePortfolioInputSchema },
    output: { schema: PortfolioAnalysisOutputSchema },
    tools: [getStockInfo],
    prompt: `You are an expert financial analyst. A user has provided a list of stock tickers in their portfolio.
The user's portfolio is equally weighted across all provided stocks.

Your task is to:
1. For each stock ticker provided, use the getStockInfo tool to fetch its company name and current price.
2. Calculate the percentage allocation for each stock (assuming equal weighting).
3. Populate the 'portfolioAllocation' array with the ticker, companyName, price, and percentage for each stock.
4. Provide a brief 'summary' of the portfolio's overall health.
5. Identify potential risks in the 'riskAnalysis' section.
6. Suggest potential opportunities for diversification or growth in the 'diversificationOpportunities' section.

User's stocks: {{{stocks}}}
`,
  });

  const analysisFlow = ai.defineFlow(
    {
      name: 'analysisFlow',
      inputSchema: AnalyzePortfolioInputSchema,
      outputSchema: PortfolioAnalysisOutputSchema,
    },
    async (input) => {
      const { output } = await analysisPrompt(input);
      if (!output) {
        throw new Error("Analysis failed to generate.");
      }
      return output;
    }
  );

  return analysisFlow(input);
}
