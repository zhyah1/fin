
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { analyzePortfolio } from '@/ai/flows/analyze-portfolio';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function PortfolioAnalystPage() {
  const [stocks, setStocks] = useState('AAPL, GOOGL, TSLA');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis('');
    try {
      const result = await analyzePortfolio({ stocks });
      setAnalysis(result.analysis);
    } catch (error) {
      console.error(error);
      setAnalysis('An error occurred while analyzing the portfolio.');
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
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center">AI Portfolio Analyst</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Enter your stock tickers (comma-separated) to get an AI-powered analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                value={stocks}
                onChange={(e) => setStocks(e.target.value)}
                placeholder="e.g., AAPL, MSFT, GOOGL"
                className="bg-slate-800/60 border-cyan-400/30 min-h-[100px] text-base"
              />
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
              >
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Analyze Portfolio'}
              </Button>
            </CardContent>
          </Card>

          {analysis && (
            <Card className="mt-8 bg-slate-900/50 border-cyan-400/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
