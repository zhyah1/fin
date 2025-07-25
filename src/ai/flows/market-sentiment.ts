
'use server';
/**
 * @fileOverview A market sentiment analysis AI agent using DuckDuckGo search (free, no API key).
 *
 * - analyzeMarketSentiment - A function that handles the sentiment analysis process.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import type { MarketSentimentInput, MarketSentimentOutput } from '../schemas/market-sentiment';
import { MarketSentimentInputSchema, MarketSentimentOutputSchema } from '../schemas/market-sentiment';

// DuckDuckGo search function (free, no API key required)
async function searchDuckDuckGo(query: string): Promise<string[]> {
  try {
    // DuckDuckGo Instant Answer API (free)
    const searchQuery = encodeURIComponent(`${query} financial news market stock`);
    
    // First try the instant answer API
    const instantResponse = await fetch(`https://api.duckduckgo.com/?q=${searchQuery}&format=json&no_html=1&skip_disambig=1`);
    
    if (instantResponse.ok) {
      const instantData = await instantResponse.json();
      const headlines: string[] = [];
      
      // Extract from related topics
      if (instantData.RelatedTopics && instantData.RelatedTopics.length > 0) {
        instantData.RelatedTopics.forEach((topic: any) => {
          if (topic.Text) {
            headlines.push(topic.Text);
          }
        });
      }
      
      // Extract from abstract if available
      if (instantData.Abstract) {
        headlines.push(instantData.Abstract);
      }
      
      if (headlines.length > 0) {
        return headlines.slice(0, 10); // Limit to 10 headlines
      }
    }
    
    // Fallback: Try to scrape search results (be careful with rate limiting)
    const searchUrl = `https://html.duckduckgo.com/html/?q=${searchQuery}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`DuckDuckGo search failed: ${response.status}`);
    }

    const html = await response.text();
    const headlines: string[] = [];
    
    // Simple regex to extract titles from search results
    // This is a basic implementation - in production, consider using a proper HTML parser
    const titleRegex = /<a[^>]*class="result__a"[^>]*>([^<]+)<\/a>/gi;
    let match;
    
    while ((match = titleRegex.exec(html)) !== null && headlines.length < 10) {
      const title = match[1].trim();
      if (title && title.length > 10) { // Filter out very short titles
        headlines.push(title);
      }
    }
    
    // Also try to extract from snippet text
    const snippetRegex = /<a[^>]*class="result__snippet"[^>]*>([^<]+)<\/a>/gi;
    while ((match = snippetRegex.exec(html)) !== null && headlines.length < 15) {
      const snippet = match[1].trim();
      if (snippet && snippet.length > 20 && snippet.length < 200) {
        headlines.push(snippet);
      }
    }

    return headlines.length > 0 ? headlines : [`Limited news results found for "${query}". Consider using more specific search terms.`];
    
  } catch (error) {
    console.error('DuckDuckGo search failed:', error);
    
    // Final fallback - use general market context
    return [
      `Unable to fetch current news for "${query}" due to search limitations.`,
      `Consider checking major financial news sources directly for ${query} updates.`,
      `Market sentiment analysis limited without current news data.`
    ];
  }
}

// Alternative: Use a simple news aggregation approach
async function getFinancialNewsHeadlines(query: string): Promise<string[]> {
  try {
    // Try multiple free sources
    const sources = [
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' stock news')}&format=json&no_html=1`,
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' financial news')}&format=json&no_html=1`,
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' market analysis')}&format=json&no_html=1`
    ];

    const allHeadlines: string[] = [];

    for (const sourceUrl of sources) {
      try {
        const response = await fetch(sourceUrl);
        if (response.ok) {
          const data = await response.json();
          
          if (data.RelatedTopics) {
            data.RelatedTopics.forEach((topic: any) => {
              if (topic.Text && topic.Text.length > 20) {
                allHeadlines.push(topic.Text);
              }
            });
          }
          
          if (data.Abstract && data.Abstract.length > 20) {
            allHeadlines.push(data.Abstract);
          }
        }
      } catch (sourceError) {
        console.log(`Source failed: ${sourceUrl}`, sourceError);
      }
    }

    // Remove duplicates and limit results
    const uniqueHeadlines = Array.from(new Set(allHeadlines));
    return uniqueHeadlines.slice(0, 8);
    
  } catch (error) {
    console.error('News aggregation failed:', error);
    return [`News aggregation unavailable for "${query}"`];
  }
}

export async function analyzeMarketSentiment(input: MarketSentimentInput): Promise<MarketSentimentOutput> {

  const searchTheWebForSentiment = ai.defineTool(
    {
      name: 'searchTheWebForSentiment',
      description: 'Gets recent news headlines for a given financial topic or ticker using DuckDuckGo search (free).',
      inputSchema: z.object({
        query: z.string().describe('The financial topic or ticker to search for.'),
      }),
      outputSchema: z.object({
        headlines: z.array(z.string()).describe('A list of recent news headlines from DuckDuckGo search.'),
      }),
    },
    async ({ query }) => {
      console.log(`Searching DuckDuckGo for sentiment on: ${query}`);
      
      // Try primary search method
      let headlines = await searchDuckDuckGo(query);
      
      // If primary method doesn't yield good results, try alternative
      if (headlines.length === 1 && headlines[0].includes('Limited news results')) {
        console.log('Trying alternative news aggregation method...');
        const alternativeHeadlines = await getFinancialNewsHeadlines(query);
        if (alternativeHeadlines.length > 0 && !alternativeHeadlines[0].includes('unavailable')) {
          headlines = alternativeHeadlines;
        }
      }
      
      return { headlines };
    }
  );

  const sentimentAnalysisPrompt = ai.definePrompt({
    name: 'sentimentAnalysisPrompt',
    input: { schema: MarketSentimentInputSchema },
    output: { 
      schema: MarketSentimentOutputSchema,
      format: 'json'
    },
    tools: [searchTheWebForSentiment],
    model: googleAI.model('gemini-1.5-flash-latest'),
    config: {
      temperature: 0.2, // Low temperature for consistent analysis
      maxOutputTokens: 1200,
    },
    prompt: `You are an expert financial analyst specializing in market sentiment analysis using available web information.

**Your Process:**
1. **ALWAYS** use the searchTheWebForSentiment tool to get available information about the user's query
2. Analyze whatever information is retrieved, even if limited
3. Be transparent about data limitations in your analysis
4. Provide the most accurate sentiment assessment possible with available data

**Important Notes:**
- Work with whatever data the search provides
- If news is limited, focus on general market context and acknowledge limitations
- Be honest about confidence levels in your analysis
- Consider both direct mentions and related market factors

**Sentiment Scoring Guidelines:**
- -1.0 to -0.7: Very negative (major concerns, significant declines)
- -0.6 to -0.3: Negative (concerning trends, bearish signals)
- -0.2 to 0.2: Neutral (mixed signals, limited data, or stable conditions)
- 0.3 to 0.6: Positive (favorable trends, bullish indicators)
- 0.7 to 1.0: Very positive (excellent performance, major breakthroughs)

**Response Requirements:**
Respond with ONLY a valid JSON object:
{
  "sentimentScore": <number between -1 and 1>,
  "summary": "<detailed markdown analysis explaining your reasoning and any data limitations>",
  "keyHeadlines": ["<all retrieved information>"]
}

**Analysis Guidelines:**
- Base analysis on retrieved information
- Acknowledge any limitations in data availability
- Explain your reasoning clearly
- Use markdown formatting for readability
- Include confidence level in your assessment

User's query: {{{query}}}

Begin by using the search tool to gather available information.`,
  });

  const sentimentAnalysisFlow = ai.defineFlow(
    {
      name: 'sentimentAnalysisFlow',
      inputSchema: MarketSentimentInputSchema,
      outputSchema: MarketSentimentOutputSchema,
    },
    async (input) => {
      try {
        const result = await sentimentAnalysisPrompt(input);
        
        if (!result.output) {
          throw new Error("Model returned null output");
        }

        const validatedOutput = MarketSentimentOutputSchema.parse(result.output);
        
        // Ensure sentiment score is within bounds
        validatedOutput.sentimentScore = Math.max(-1, Math.min(1, validatedOutput.sentimentScore));
        
        return validatedOutput;
        
      } catch (error) {
        console.error("Primary sentiment analysis failed:", error);
        
        // Fallback: Direct search and basic analysis
        try {
          const headlines = await searchDuckDuckGo(input.query);
          
          // Use Gemini for basic sentiment analysis
          const fallbackPrompt = `Analyze market sentiment for "${input.query}" based on this available information:

${headlines.join('\n')}

Provide a JSON response with:
- sentimentScore: number from -1 to 1
- summary: markdown analysis explaining your assessment and noting any limitations
- keyHeadlines: array of all provided information

Be honest about confidence levels and data limitations. Focus on providing the best analysis possible with available data.`;
          
          const fallbackAnalysis = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            prompt: fallbackPrompt,
            config: {
              temperature: 0.2,
              maxOutputTokens: 800,
            }
          });

          if (fallbackAnalysis.text()) {
            try {
              // Clean up the response text to extract JSON
              let responseText = fallbackAnalysis.text().trim();
              
              // Remove any markdown code blocks if present
              responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
              
              const parsed = JSON.parse(responseText);
              return MarketSentimentOutputSchema.parse(parsed);
            } catch (parseError) {
              console.error("Failed to parse fallback JSON:", parseError);
            }
          }

        } catch (fallbackError) {
          console.error("Fallback analysis failed:", fallbackError);
        }

        // Ultimate fallback with honest limitation disclosure
        return {
          sentimentScore: 0,
          summary: `## Sentiment Analysis Unavailable

**Query:** ${input.query}

**Status:** Technical limitations prevented comprehensive analysis.

**Recommendation:** 
- Try using more specific search terms (e.g., company name + "stock" or "earnings")
- Check major financial news sources directly
- Consider market conditions may be stable if no major news is circulating

**Confidence:** Low due to data access limitations`,
          keyHeadlines: ["Analysis temporarily limited due to search constraints"]
        };
      }
    }
  );

  return sentimentAnalysisFlow(input);
}
