
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { analyzePortfolio, type PortfolioAnalysisOutput } from '@/ai/flows/analyze-portfolio';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

export default function PortfolioAnalystPage() {
  const [stocks, setStocks] = useState('AAPL, GOOGL, TSLA, MSFT, AMZN, NVDA');
  const [analysis, setAnalysis] = useState<PortfolioAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const result = await analyzePortfolio({ stocks });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setError('An error occurred while analyzing the portfolio.');
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
              <CardTitle className="text-3xl text-center">AI Portfolio Analyst</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Enter your stock tickers (comma-separated) to get an AI-powered analysis and visualization.
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
          
          {error && (
             <Card className="mt-8 bg-red-900/30 border-red-500/50 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-400">Analysis Failed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{error}</p>
                </CardContent>
              </Card>
          )}

          {analysis && (
            <div className="mt-8 space-y-8">
              <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Portfolio Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[400px]">
                      <ChartContainer config={{}} className="w-full h-full">
                          <PieChart>
                              <ChartTooltip content={<ChartTooltipContent nameKey="ticker" hideLabel />} />
                              <Pie
                                  data={analysis.portfolioAllocation}
                                  dataKey="percentage"
                                  nameKey="ticker"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={150}
                                  labelLine={false}
                                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                      const RADIAN = Math.PI / 180;
                                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                      return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                          {`${analysis.portfolioAllocation[index].ticker} (${(percent * 100).toFixed(0)}%)`}
                                        </text>
                                      );
                                  }}
                              >
                                  {analysis.portfolioAllocation.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                              </Pie>
                          </PieChart>
                      </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                    <CardHeader>
                      <CardTitle className="text-2xl">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-invert max-w-none text-gray-300">
                          <ReactMarkdown>{analysis.summary}</ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                    <CardHeader>
                      <CardTitle className="text-2xl">Risk Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-invert max-w-none text-gray-300">
                          <ReactMarkdown>{analysis.riskAnalysis}</ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>
              </div>

               <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Diversification Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-gray-300">
                      <ReactMarkdown>{analysis.diversificationOpportunities}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
