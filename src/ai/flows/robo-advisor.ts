
'use server';
/**
 * @fileOverview A Robo-Advisor AI agent.
 *
 * - generateAdvice - A function that creates a personalized investment plan.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { RoboAdvisorInputSchema, RoboAdvisorOutputSchema, type RoboAdvisorInput, type RoboAdvisorOutput } from '../schemas/robo-advisor';

export async function generateAdvice(input: RoboAdvisorInput): Promise<RoboAdvisorOutput> {

  const advicePrompt = ai.definePrompt({
    name: 'roboAdvisorPrompt',
    input: { schema: RoboAdvisorInputSchema },
    output: { schema: RoboAdvisorOutputSchema },
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are a certified financial planner and Robo-Advisor. Your goal is to provide a personalized, actionable, and easy-to-understand investment plan based on the user's profile.

**User Profile:**
- Age: {{{age}}}
- Annual Income: {{{annualIncome}}}
- Investment Horizon: {{{investmentHorizon}}} years
- Risk Tolerance: {{{riskTolerance}}}

**Your Task:**
1.  **Determine Asset Allocation:** Based on the user's profile, determine the optimal asset allocation between stocks, bonds, and cash. Younger users with a long horizon and high risk tolerance should have more stocks. Older users or those with low risk tolerance should have more bonds and cash.
2.  **Recommend Specific ETFs:** Suggest 3-5 specific, low-cost, and broadly diversified ETFs for the "stocks" portion of the portfolio. For each ETF, provide the ticker, full name, the percentage of the stock allocation it should represent, and a brief rationale. Examples: VTI (Total Stock Market), VOO (S&P 500), QQQ (Nasdaq 100), VXUS (International Stocks).
3.  **Write a Summary:** Provide a concise and encouraging summary of the proposed investment strategy. Explain *why* this plan is suitable for the user. Use Markdown for formatting.
4.  **Describe Projected Growth:** Write a paragraph about the potential for long-term growth. Emphasize the power of compounding and consistent investing. DO NOT promise specific returns; instead, refer to historical market averages (e.g., "historically, diversified stock portfolios have seen average annual returns of...").

**Example Rationale:** "Provides exposure to the entire U.S. stock market, offering maximum diversification at a very low cost."

Generate a complete response in the required structured format.`,
  });

  const adviceFlow = ai.defineFlow(
    {
      name: 'adviceFlow',
      inputSchema: RoboAdvisorInputSchema,
      outputSchema: RoboAdvisorOutputSchema,
    },
    async (input) => {
      const { output } = await advicePrompt(input);
      if (!output) {
        throw new Error("Failed to generate advice. The model returned no output.");
      }
      return output;
    }
  );

  return adviceFlow(input);
}
