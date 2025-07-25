
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { analyzeMarketSentiment } from '@/ai/flows/market-sentiment';
import type { MarketSentimentOutput } from '@/ai/schemas/market-sentiment';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SentimentGauge = ({ score }: { score: number }) => {
    const percentage = (score + 1) / 2 * 100;
    const color = score > 0.2 ? 'text-green-400' : score < -0.2 ? 'text-red-400' : 'text-yellow-400';
    const Icon = score > 0.2 ? TrendingUp : score < -0.2 ? TrendingDown : Minus;
    const label = score > 0.5 ? 'Very Positive' : score > 0.2 ? 'Positive' : score < -0.5 ? 'Very Negative' : score < -0.2 ? 'Negative' : 'Neutral';

    return (
        <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold ${color} flex items-center gap-4`}>
                <Icon className="h-16 w-16" />
                <span>{label}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 mt-6">
                <div 
                    className={`h-4 rounded-full transition-all duration-500 ${score > 0.2 ? 'bg-green-500' : score < -0.2 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                    style={{ width: `${percentage}%`}}
                />
            </div>
            <div className="text-lg mt-3 font-semibold text-gray-200">Sentiment Score: {score.toFixed(2)}</div>
        </div>
    );
};

export default function MarketSentimentPage() {
  const [query, setQuery] = useState('TSLA');
  const [analysis, setAnalysis] = useState<MarketSentimentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) {
        setError("Please enter a topic to analyze.");
        return;
    }
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const result = await analyzeMarketSentiment({ query });
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`An error occurred while analyzing market sentiment: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
        <header className="relative z-50 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FL</div>
                <div className="text-xl font-semibold text-white">FinLight</div>
            </Link>
            <Button asChild variant="outline" className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            </div>
      </header>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Market Sentiment AI</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Enter a stock ticker, sector, or topic to gauge the market's mood.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., TSLA, AI Stocks, US Housing Market"
                        className="bg-slate-800/60 border-cyan-400/30 text-base flex-grow"
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                    />
                    <Button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg px-8"
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Analyze'}
                    </Button>
                </div>
            </CardContent>
          </Card>
          
          {error && (
             <Alert variant="destructive" className="mt-8 bg-red-900/30 border-red-500/50 text-red-300">
                <AlertTitle className="text-red-400">Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {analysis && (
            <div className="mt-8 space-y-8">
              <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Sentiment Analysis for "{query}"</CardTitle>
                </CardHeader>
                <CardContent>
                  <SentimentGauge score={analysis.sentimentScore} />
                </CardContent>
              </Card>
              
               <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Sentiment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-gray-300">
                      <ReactMarkdown>{analysis.summary}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
              
               <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Key Headlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {analysis.keyHeadlines.map((headline, index) => (
                        <li key={index}>{headline}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
