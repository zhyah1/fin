
'use server';
/**
 * @fileOverview A portfolio analysis AI agent.
 *
 * - analyzePortfolio - A function that handles the portfolio analysis process.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define the output schema and type here, but do not export them.
const PortfolioAnalysisOutputSchema = z.object({
    portfolioAllocation: z.array(z.object({
        ticker: z.string().describe("Stock ticker symbol."),
        companyName: z.string().describe("The name of the company."),
        price: z.number().describe("The current price of the stock."),
        percentage: z.number().describe("The percentage of this stock in the portfolio."),
    })).describe("The allocation of the portfolio across different stocks."),
    riskAnalysis: z.string().describe("A detailed, professional-grade analysis of the portfolio's key risks, including concentration risk, market risk, and any stock-specific risks. Provide in Markdown format."),
    diversificationOpportunities: z.string().describe("Actionable, specific suggestions for diversification. Recommend particular sectors or asset classes and explain the rationale. Provide in Markdown format."),
    summary: z.string().describe("A concise, executive-level summary of the portfolio's health, strengths, and weaknesses, in Markdown format.")
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
        'MSFT': { companyName: 'Microsoft Corporation', price: 430.00 },
        'AMZN': { companyName: 'Amazon.com, Inc.', price: 185.00 },
        'NVDA': { companyName: 'NVIDIA Corporation', price: 920.00 },
        'JPM': { companyName: 'JPMorgan Chase & Co.', price: 200.00 },
        'V': { companyName: 'Visa Inc.', price: 275.00 },
        'DIS': { companyName: 'The Walt Disney Company', price: 105.00 },
        'PFE': { companyName: 'Pfizer Inc.', price: 28.00 },
      };
      return mockData[ticker.toUpperCase()] || { companyName: `Unknown Ticker: ${ticker}`, price: 0 };
    }
  );

  const analysisPrompt = ai.definePrompt({
    name: 'portfolioAnalysisPrompt',
    input: { schema: AnalyzePortfolioInputSchema },
    output: { schema: PortfolioAnalysisOutputSchema },
    tools: [getStockInfo],
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are a Senior Portfolio Analyst at a top-tier investment firm, equivalent to Bloomberg or Goldman Sachs. Your analysis must be sharp, insightful, and professional.
A user has provided a list of stock tickers in their portfolio. The user's portfolio is equally weighted across all provided stocks.

Your task is to conduct a Bloomberg-level analysis:
1.  For each stock ticker provided, use the \`getStockInfo\` tool to fetch its company name and current price.
2.  Calculate the percentage allocation for each stock assuming an equal weighting.
3.  Populate the 'portfolioAllocation' array with the ticker, companyName, price, and percentage for each stock.
4.  Write an executive 'summary' of the portfolio. This should be a concise overview of its key characteristics and overall health.
5.  Conduct a thorough 'riskAnalysis'. Go beyond the obvious. Analyze concentration risk (by sector and in individual names), sensitivity to macroeconomic factors (like interest rates or inflation), and any relevant company-specific risks.
6.  Provide highly specific and actionable 'diversificationOpportunities'. Do not just say "diversify". Suggest specific sectors, industries, or even alternative asset classes (like bonds or commodities) that would counterbalance the current portfolio's risks. Justify each suggestion with clear reasoning.

The final output must be in a structured format. Ensure all financial commentary is formatted in clear, professional Markdown.

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
        throw new Error("Analysis failed to generate. The model returned no output.");
      }
      return output;
    }
  );

  return analysisFlow(input);
}
