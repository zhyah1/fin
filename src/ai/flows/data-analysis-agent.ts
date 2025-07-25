
'use server';
/**
 * @fileOverview An AI agent that specializes in data analysis tasks.
 *
 * - runDataAnalysisAgent - A function that executes a data analysis task based on context.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { DataAnalysisAgentInputSchema, DataAnalysisAgentOutputSchema, type DataAnalysisAgentInput, type DataAnalysisAgentOutput } from '../schemas/data-analysis-agent';

export async function runDataAnalysisAgent(input: DataAnalysisAgentInput): Promise<DataAnalysisAgentOutput> {

  const dataAnalysisAgentPrompt = ai.definePrompt({
    name: 'dataAnalysisAgentPrompt',
    input: { schema: DataAnalysisAgentInputSchema },
    output: { schema: DataAnalysisAgentOutputSchema },
    model: googleAI.model('gemini-1.5-flash-latest'),
    prompt: `You are an expert Data Analyst AI. Your task is to analyze the provided data based on the user's request and provide a clear, insightful, and well-structured response.

**Data Context:**
The user has provided the following data:
---
{{{dataContext}}}
---

**User's Analysis Request:**
"{{{analysisRequest}}}"

**Your Task:**
1.  **Understand the Data:** Carefully examine the structure and content of the provided data.
2.  **Analyze and Interpret:** Perform the requested analysis. This could involve calculations, identifying trends, summarizing key points, finding correlations, or answering specific questions.
3.  **Formulate a Response:**
    *   Start with a clear, concise answer to the user's request.
    *   Provide supporting evidence and key findings from your analysis.
    *   Use Markdown formatting (like tables, lists, and bold text) to present the information in a highly readable and organized manner.
    *   If the request is ambiguous or the data is insufficient, state your assumptions or what additional information would be needed.
`,
  });

  const agentFlow = ai.defineFlow(
    {
      name: 'dataAnalysisAgentFlow',
      inputSchema: DataAnalysisAgentInputSchema,
      outputSchema: DataAnalysisAgentOutputSchema,
    },
    async (input) => {
      const { output } = await dataAnalysisAgentPrompt(input);
      if (!output) {
        throw new Error("The data analysis agent failed to generate a response.");
      }
      return output;
    }
  );

  return agentFlow(input);
}
