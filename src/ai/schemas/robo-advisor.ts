
/**
 * @fileOverview Zod schemas for the Robo-Advisor AI flow.
 */
import { z } from 'zod';

export const RoboAdvisorInputSchema = z.object({
    age: z.number().min(18).max(100).describe("The user's current age."),
    annualIncome: z.number().min(0).describe("The user's annual income."),
    investmentHorizon: z.number().min(1).max(50).describe("The number of years the user plans to invest for."),
    riskTolerance: z.enum(['Low', 'Medium', 'High']).describe("The user's tolerance for investment risk.")
});
export type RoboAdvisorInput = z.infer<typeof RoboAdvisorInputSchema>;

export const RoboAdvisorOutputSchema = z.object({
    assetAllocation: z.object({
        stocks: z.number().describe("Percentage allocation to stocks/equities."),
        bonds: z.number().describe("Percentage allocation to bonds/fixed income."),
        cash: z.number().describe("Percentage allocation to cash or cash equivalents."),
    }).describe("The recommended asset allocation based on the user's profile."),
    recommendedETFs: z.array(z.object({
        ticker: z.string().describe("The ETF ticker symbol."),
        name: z.string().describe("The full name of the ETF."),
        allocation: z.number().describe("The percentage of the 'stocks' portion to be allocated to this ETF."),
        rationale: z.string().describe("Brief rationale for recommending this ETF.")
    })).describe("A list of specific, low-cost ETFs to implement the stock allocation."),
    summary: z.string().describe("A professional, encouraging summary of the investment plan, formatted in Markdown."),
    projectedGrowth: z.string().describe("A paragraph describing the potential long-term growth of this portfolio, assuming historical market returns. Avoid promising specific returns.")
});
export type RoboAdvisorOutput = z.infer<typeof RoboAdvisorOutputSchema>;
